import { User, Bell, Search, Menu } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center py-4 px-2 mb-6">
      <div className="flex flex-col">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-bold text-primary tracking-tight"
        >
          Welcome back, {userName}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-on-surface-variant/80 mt-1"
        >
          Here's what's happening with your sleep and wellness today.
        </motion.p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full border border-outline-variant/10 focus-within:border-primary/30 transition-all">
          <Search className="w-4 h-4 text-on-surface-variant/60" />
          <input 
            type="text" 
            placeholder="Search data..." 
            className="bg-transparent border-none outline-none text-sm w-40"
          />
        </div>

        <button className="p-2.5 rounded-full bg-surface-container-low border border-outline-variant/10 hover:bg-surface-container transition-all relative">
          <Bell className="w-5 h-5 text-on-surface-variant" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white dark:border-surface"></span>
        </button>

        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full cursor-pointer bg-primary-container/20 flex items-center justify-center border border-primary-container/30 hover:shadow-md transition-all text-primary">
          <User className="w-5 h-5 md:w-6 h-6" />
        </div>
      </div>
    </header>
  );
};
