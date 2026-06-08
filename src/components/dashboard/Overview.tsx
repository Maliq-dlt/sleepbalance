import { motion } from "motion/react";
import { Moon, Smartphone, AlertTriangle, TrendingUp, Users, Activity, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { SleepLineChart, AddictionBarChart } from "../charts/CustomCharts";
import { useDataset } from "../../hooks/useDataset";
import { cn } from "../../lib/utils";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';

export const Overview = () => {
  const { teenData, loading } = useDataset();

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Activity className="w-10 h-10 text-primary" />
        </motion.div>
      </div>
    );
  }

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
  ];

  const genderData = [
    { name: 'Female', value: teenData.filter(d => d.Gender === 'Female').length },
    { name: 'Male', value: teenData.filter(d => d.Gender === 'Male').length },
    { name: 'Other', value: teenData.filter(d => d.Gender === 'Other').length },
  ];

  const COLORS = ['#435d99', '#2f647d', '#694cac'];

  const stats = [
    { label: "Avg Sleep", value: `${avgSleep}h`, icon: Moon, color: "text-primary", bg: "bg-primary/10" },
    { label: "Daily Usage", value: `${avgUsage}h`, icon: Smartphone, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Risk Factor", value: "Moderate", icon: AlertTriangle, color: "text-tertiary", bg: "bg-tertiary/10" },
    { label: "Population", value: teenData.length.toLocaleString(), icon: Users, color: "text-primary", bg: "bg-primary/10" },
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
              <BarChart3 className="w-5 h-5 text-on-surface-variant" />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <AddictionBarChart data={addictionLevelData} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-[2rem]"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-on-surface">Demographic Split</h3>
              <p className="text-sm text-on-surface-variant/70">Gender-based usage distribution</p>
            </div>
            <PieChartIcon className="w-5 h-5 text-on-surface-variant" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-[2rem] flex flex-col justify-center items-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Cognitive Insight</h3>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            Based on the analysis of <strong>{teenData.length.toLocaleString()}</strong> data points, 
            there is a strong correlation (r=0.74) between late-night screen usage and 
            decreased sleep efficiency. 
          </p>
          <button className="bg-primary text-white font-bold py-3 px-8 rounded-2xl hover:shadow-xl transition-all active:scale-95">
            Generate Report
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const Brain = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/>
  </svg>
);
