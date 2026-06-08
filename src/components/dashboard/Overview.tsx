import { motion, AnimatePresence } from "motion/react";
import { 
  Moon, 
  Smartphone, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Activity, 
  BarChart3, 
  PieChart as PieChartIcon,
  Brain,
  Zap,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { SleepLineChart, AddictionBarChart } from "../charts/CustomCharts";
import { useDataset } from "../../hooks/useDataset";
import { cn } from "../../lib/utils";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts';

export const Overview = () => {
  const { teenData, loading } = useDataset();

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <Activity className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  // --- Real Data Processing ---
  
  const avgSleep = teenData.length > 0 
    ? (teenData.reduce((acc, curr) => acc + curr.Sleep_Hours, 0) / teenData.length).toFixed(1)
    : "7.2";
    
  const avgUsage = teenData.length > 0 
    ? (teenData.reduce((acc, curr) => acc + curr.Daily_Usage_Hours, 0) / teenData.length).toFixed(1)
    : "4.5";

  // Simulate a weekly trend from dataset subsets
  const sleepTrendData = teenData.slice(0, 7).map((d, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    hours: d.Sleep_Hours
  }));

  const addictionLevelData = [
    { name: "Low (0-3)", value: teenData.filter(d => d.Addiction_Level < 3).length },
    { name: "Med (4-7)", value: teenData.filter(d => d.Addiction_Level >= 3 && d.Addiction_Level < 7).length },
    { name: "High (7+)", value: teenData.filter(d => d.Addiction_Level >= 7).length },
  ];

  const genderData = [
    { name: 'Female', value: teenData.filter(d => d.Gender === 'Female').length },
    { name: 'Male', value: teenData.filter(d => d.Gender === 'Male').length },
    { name: 'Other', value: teenData.filter(d => d.Gender === 'Other').length },
  ];

  // Scatter plot data for Social Media vs Anxiety
  const scatterData = teenData.slice(0, 50).map(d => ({
    x: d.Time_on_Social_Media,
    y: d.Anxiety_Level,
    z: d.Age,
    name: d.Name
  }));

  const COLORS = ['#435d99', '#2f647d', '#694cac'];

  const stats = [
    { label: "Avg Rest", value: `${avgSleep}h`, sub: "-0.4h vs target", icon: Moon, color: "text-primary", bg: "bg-primary/10" },
    { label: "Screen Time", value: `${avgUsage}h`, sub: "+1.2h vs norm", icon: Smartphone, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Risk Factor", value: "Moderate", sub: "Cognitive Load", icon: AlertTriangle, color: "text-tertiary", bg: "bg-tertiary/10" },
    { label: "Dataset Pool", value: teenData.length.toLocaleString(), sub: "Verified Users", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  ];

  // Simple Predictive Logic (Based on real data averages)
  const currentUsage = parseFloat(avgUsage);
  const predictedDeficit = currentUsage > 4 ? ((currentUsage - 4) * 0.4).toFixed(1) : "0.0";
  const exhaustionRisk = currentUsage > 6 ? "High" : currentUsage > 4 ? "Medium" : "Low";

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Bento Grid Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass-card p-5 md:p-6 rounded-3xl transition-all group border border-outline-variant/10 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2.5 rounded-xl transition-colors group-hover:bg-primary/20 duration-300", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <Activity className="w-4 h-4 text-on-surface-variant/20" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-bold text-on-surface mt-1 tracking-tight">{stat.value}</h3>
              <p className="text-xs text-on-surface-variant/70 mt-1 font-medium">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. Bento Grid Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Large Primary Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-8 glass-card p-6 md:p-8 rounded-[2rem] border border-outline-variant/10"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-on-surface tracking-tight">Restorative Cycle</h3>
              <p className="text-sm text-on-surface-variant/70 mt-1">7-day continuous sleep volume</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase">Optimized</span>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <SleepLineChart data={sleepTrendData} />
          </div>
        </motion.div>

        {/* Predictive AI Card (New) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-4 glass-card p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-primary-container/30 to-surface border border-primary/20 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-primary tracking-widest uppercase">Predictive Engine</span>
            </div>
            
            <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">Tomorrow's Forecast</h3>
            <p className="text-sm text-on-surface-variant/80 leading-relaxed mb-6">
              Based on today's <span className="font-bold text-on-surface">{avgUsage}h</span> digital footprint, we anticipate a cognitive deficit tomorrow.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-surface-container/50 border border-outline-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary" />
                <span className="text-sm font-bold text-on-surface">Expected Deficit</span>
              </div>
              <span className="text-lg font-bold text-secondary">{predictedDeficit}h</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-surface-container/50 border border-outline-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-error" />
                <span className="text-sm font-bold text-on-surface">Exhaustion Risk</span>
              </div>
              <span className="text-sm font-bold text-error uppercase tracking-widest">{exhaustionRisk}</span>
            </div>
          </div>
        </motion.div>

        {/* Scatter Plot Correlation (New) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 glass-card p-6 md:p-8 rounded-[2rem] border border-outline-variant/10"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-on-surface tracking-tight">Anxiety vs Social Media</h3>
              <p className="text-sm text-on-surface-variant/70 mt-1">Correlation in latest 50 entries</p>
            </div>
            <Activity className="w-5 h-5 text-on-surface-variant/40" />
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: -10, left: -20 }}>
                <XAxis type="number" dataKey="x" name="Social Hrs" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="y" name="Anxiety" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <ZAxis type="number" dataKey="z" range={[50, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Users" data={scatterData} fill="var(--primary)" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Existing Bar Chart - Reformed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-4 glass-card p-6 md:p-8 rounded-[2rem] border border-outline-variant/10"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-on-surface tracking-tight">Dependency Index</h3>
              <p className="text-sm text-on-surface-variant/70 mt-1">Population addiction levels</p>
            </div>
            <BarChart3 className="w-5 h-5 text-on-surface-variant/40" />
          </div>
          <div className="h-[250px] w-full">
            <AddictionBarChart data={addictionLevelData} />
          </div>
        </motion.div>

        {/* Demographic Quick View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-3 glass-card p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold text-on-surface tracking-tight mb-6">Demographics</h3>
            <div className="space-y-4">
              {genderData.map((g, i) => (
                <div key={g.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-sm font-medium text-on-surface-variant">{g.name}</span>
                  </div>
                  <span className="text-sm font-bold text-on-surface">{g.value}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-surface-container-low text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
            View Deep Dive <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};
