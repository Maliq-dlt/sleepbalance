import { useState } from "react";
import { ActivePage } from "../types";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Overview } from "./dashboard/Overview";
import { motion } from "motion/react";

interface DashboardProps {
  activeTab: ActivePage;
  onTabChange: (tab: ActivePage) => void;
  onLogout: () => void;
}

export default function Dashboard({ activeTab, onTabChange, onLogout }: DashboardProps) {
  const [userName] = useState("Maliq");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard-overview":
        return <Overview />;
      case "dashboard-input":
        return (
          <div className="glass-card p-10 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">Input Data Section</h3>
            <p className="text-on-surface-variant">This section is being professionalized. Stay tuned.</p>
          </div>
        );
      case "dashboard-analytics":
        return (
          <div className="glass-card p-10 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">AI Analytics Section</h3>
            <p className="text-on-surface-variant">Deep cognitive analysis coming soon.</p>
          </div>
        );
      case "dashboard-tips":
        return (
          <div className="glass-card p-10 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">Personalized Tips</h3>
            <p className="text-on-surface-variant">Smart wellness recommendations based on your data.</p>
          </div>
        );
      default:
        return <Overview />;
    }
  };

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      onTabChange={onTabChange} 
      onLogout={onLogout} 
      userName={userName}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
