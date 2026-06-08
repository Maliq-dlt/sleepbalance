import { useState, useEffect } from "react";
import { ActivePage, AppTheme } from "./types";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import { Sun, Moon } from "lucide-react";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem("sleep_balance_theme");
    return (saved as AppTheme) || "light";
  });

  const [activeTab, setActiveTab] = useState<ActivePage>("landing");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("sleep_balance_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-surface text-on-surface transition-colors duration-500 selection:bg-primary/20">
        
        <div className="fixed bottom-8 right-8 z-[100] flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-4 rounded-2xl bg-primary-container text-white dark:text-on-primary-container hover:bg-primary hover:shadow-2xl transition-all cursor-pointer shadow-xl flex items-center justify-center border border-white/20 dark:border-white/10 backdrop-blur-md"
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 fill-white" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "landing" ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage 
                onNavigate={(targetPage) => {
                  if (targetPage.startsWith('dashboard')) {
                    setActiveTab(targetPage as ActivePage);
                  } else {
                    setActiveTab('dashboard-overview');
                  }
                }}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Dashboard 
                activeTab={activeTab}
                onTabChange={(newTab) => setActiveTab(newTab)}
                onLogout={() => setActiveTab("landing")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}
