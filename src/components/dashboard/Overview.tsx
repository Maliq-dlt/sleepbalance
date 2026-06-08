import { motion } from "motion/react";
import { Moon, Smartphone, AlertTriangle, TrendingUp, Users, Activity } from "lucide-react";
import { SleepLineChart, AddictionBarChart } from "../charts/CustomCharts";
import { useDataset } from "../../hooks/useDataset";
import { cn } from "../../lib/utils";

export const Overview = () => {
  const { teenData, loading } = useDataset();

  // Simple aggregation for demonstration
  const avgSleep = teenData.length > 0 
    ? (teenData.reduce((acc, curr) => acc + curr.Sleep_Hours, 0) / teenData.length).toFixed(1)
    : "7.2";
    
  const avgUsage = teenData.length > 0 
    ? (teenData.reduce((acc, curr) => acc + curr.Daily_Usage_Hours, 0) / teenData.length).toFixed(1)
    : "4.5";

  const sleepTrendData = teenData.slice(0, 7).map((d, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    hours: d.Sleep_Hours
  }));

  const addictionLevelData = [
    { name: "Low", value: teenData.filter(d => d.Addiction_Level < 3).length },
    { name: "Medium", value: teenData.filter(d => d.Addiction_Level >= 3 && d.Addiction_Level < 7).length },
    { name: "High", value: teenData.filter(d => d.Addiction_Level >= 7).length },
  ].slice(0, 10); // Limit for better visual

  const stats = [
    { label: "Avg Sleep", value: `${avgSleep}h`, icon: Moon, color: "text-primary", bg: "bg-primary/10" },
    { label: "Daily Usage", value: `${avgUsage}h`, icon: Smartphone, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Risk Factor", value: "Moderate", icon: AlertTriangle, color: "text-tertiary", bg: "bg-tertiary/10" },
    { label: "Active Users", value: "1,284", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl hover:shadow-xl hover:shadow-primary/5 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-2xl transition-colors group-hover:scale-110 duration-300", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <Activity className="w-4 h-4 text-on-surface-variant/30" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-bold text-on-surface mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-[2rem]"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-on-surface">Sleep Pattern</h3>
              <p className="text-sm text-on-surface-variant/70">Weekly restorative cycle analysis</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase">+12.5%</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <SleepLineChart data={sleepTrendData} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-[2rem]"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-on-surface">Addiction Distribution</h3>
              <p className="text-sm text-on-surface-variant/70">Population digital dependency levels</p>
            </div>
            <div className="p-2 rounded-xl bg-surface-container-low border border-outline-variant/10">
              <Activity className="w-5 h-5 text-on-surface-variant" />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <AddictionBarChart data={addictionLevelData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
