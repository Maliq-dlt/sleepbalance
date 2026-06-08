import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ActivePage } from "../../types";
import { AnimatePresence, motion } from "motion/react";

interface LayoutProps {
  children: ReactNode;
  activeTab: ActivePage;
  onTabChange: (tab: ActivePage) => void;
  onLogout: () => void;
  userName: string;
}

export const DashboardLayout = ({ children, activeTab, onTabChange, onLogout, userName }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden text-on-surface bg-surface font-sans transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        onLogout={onLogout} 
        onNewEntry={() => onTabChange("dashboard-input")} 
      />
      
      <main className="flex-1 lg:ml-64 h-full overflow-y-auto p-4 md:p-8 bg-surface-container-lowest dark:bg-surface">
        <div className="max-w-7xl mx-auto">
          <Header userName={userName} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
