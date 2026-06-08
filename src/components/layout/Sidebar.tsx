import { 
  BarChart2, 
  Calendar, 
  Sparkles, 
  Lightbulb, 
  Settings, 
  Plus, 
  HelpCircle, 
  LogOut, 
  Moon
} from "lucide-react";
import { ActivePage } from "../../types";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

interface SidebarProps {
  activeTab: ActivePage;
  onTabChange: (tab: ActivePage) => void;
  onLogout: () => void;
  onNewEntry: () => void;
}

const navItems = [
  { id: "dashboard-overview", label: "Overview", icon: BarChart2 },
  { id: "dashboard-input", label: "Input Data", icon: Calendar },
  { id: "dashboard-analytics", label: "Analytics", icon: Sparkles },
  { id: "dashboard-tips", label: "Personal Tips", icon: Lightbulb },
  { id: "dashboard-settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeTab, onTabChange, onLogout, onNewEntry }: SidebarProps) => {
  return (
    <nav className="hidden lg:flex flex-col p-6 h-full w-64 fixed left-0 top-0 bg-white/80 dark:bg-surface-container/60 backdrop-blur-xl border-r border-outline-variant/10 shadow-sm z-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 px-2 flex items-center gap-3"
      >
        <div className="p-2 rounded-xl bg-primary shadow-lg shadow-primary/20">
          <Moon className="w-6 h-6 text-white fill-white" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-primary dark:text-primary-fixed tracking-tight">SleepBalance</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/60">AI Wellness</p>
        </div>
      </motion.div>

      <div className="flex-grow space-y-1.5">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onTabChange(item.id as ActivePage)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[14px] transition-all duration-200 cursor-pointer relative group",
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/10"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-on-surface-variant group-hover:text-primary transition-colors")} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-outline-variant/10 space-y-4">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewEntry}
          className="w-full bg-primary-container text-on-primary-container py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>New Entry</span>
        </motion.button>
        
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-on-surface rounded-xl font-medium text-xs transition-all cursor-pointer">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error rounded-xl font-medium text-xs transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
