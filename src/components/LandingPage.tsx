/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Moon, 
  Smartphone, 
  Activity, 
  FileText, 
  Sparkles, 
  ShieldAlert, 
  User, 
  Bell, 
  Settings, 
  Brain,
  ChevronRight,
  ArrowRight,
  Globe,
  Mail,
  MessageSquare
} from "lucide-react";
import { ActivePage, AppTheme } from "../types";
import { cn } from "../lib/utils";

interface LandingPageProps {
  onNavigate: (page: ActivePage) => void;
  theme: AppTheme;
  toggleTheme: () => void;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage({ onNavigate, theme, toggleTheme }: LandingPageProps) {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-primary/20">
      {/* TopNavBar */}
      <nav className="fixed top-0 z-[100] w-full bg-white/70 dark:bg-surface/70 backdrop-blur-2xl border-b border-outline-variant/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <div className="p-2 rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Moon className="text-white w-6 h-6 fill-white" />
            </div>
            <span className="font-bold text-xl text-primary tracking-tight">
              SleepBalance <span className="text-on-surface-variant font-medium">AI</span>
            </span>
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-8">
            {['Solution', 'Research', 'Company', 'Careers'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('dashboard-overview')}
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-primary hover:bg-primary/5 px-4 py-2 rounded-full transition-all"
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigate('dashboard-overview')}
              className="bg-primary text-white font-bold text-sm py-2.5 px-6 rounded-full hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="relative z-10"
            >
              <motion.div 
                variants={fadeIn}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Industry Leading Precision</span>
              </motion.div>

              <motion.h1 
                variants={fadeIn}
                className="text-5xl md:text-7xl font-bold text-on-surface leading-[1.1] tracking-tight mb-8"
              >
                Restore your <br />
                <span className="text-gradient">circadian balance</span> <br />
                with Intelligence.
              </motion.h1>

              <motion.p 
                variants={fadeIn}
                className="text-lg md:text-xl text-on-surface-variant/80 mb-10 leading-relaxed max-w-xl"
              >
                SleepBalance AI leverages advanced cognitive modeling to predict sleep deficits and optimize your digital wellness, ensuring peak performance for modern professionals.
              </motion.p>

              <motion.div 
                variants={fadeIn}
                className="flex flex-wrap gap-4"
              >
                <button 
                  onClick={() => onNavigate('dashboard-input')}
                  className="bg-primary text-white font-bold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2"
                >
                  Analyze My Sleep <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onNavigate('dashboard-overview')}
                  className="bg-surface-container-low text-on-surface font-bold py-4 px-8 rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-all"
                >
                  Explore Dashboard
                </button>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="mt-12 flex items-center gap-6"
              >
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-surface flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-primary text-white border-2 border-surface flex items-center justify-center text-[10px] font-bold">
                    +10k
                  </div>
                </div>
                <div className="h-10 w-px bg-outline-variant/20"></div>
                <div className="text-sm font-semibold text-on-surface-variant">
                  Trusted by researchers <br /> at <span className="text-primary">Maranatha Global</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative z-10 glass-card p-4 rounded-[3rem] shadow-2xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1511293391911-c7491795200f?q=80&w=2070&auto=format&fit=crop" 
                  alt="Sleep Lab" 
                  className="w-full h-full object-cover rounded-[2.5rem] group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-10 right-10 glass-card px-6 py-4 rounded-2xl shadow-2xl border-white/20"
                >
                  <Activity className="w-6 h-6 text-primary mb-2" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">REM Efficiency</p>
                  <p className="text-2xl font-bold text-primary">94.2%</p>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute bottom-10 left-10 glass-card px-6 py-4 rounded-2xl shadow-2xl border-white/20"
                >
                  <Smartphone className="w-6 h-6 text-secondary mb-2" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Screen Latency</p>
                  <p className="text-2xl font-bold text-secondary">-1.5h</p>
                </motion.div>
              </div>
              
              <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* Partners/Stats Section */}
        <section className="py-24 bg-surface-container-lowest border-y border-outline-variant/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {['Microsoft', 'Google Health', 'Tesla', 'NASA', 'Apple'].map(name => (
                <span key={name} className="text-2xl font-bold tracking-tighter text-on-surface-variant">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Contributors Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              Backed by Global Experts
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-on-surface-variant/80 max-w-2xl mx-auto mb-16"
            >
              Our research team consists of 30+ leading contributors in sleep science, data engineering, and cognitive psychology.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[...Array(12)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-high mb-3 overflow-hidden border border-outline-variant/10">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="contributor" />
                  </div>
                  <p className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Expert {i+1}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-16 flex justify-center items-center gap-8 text-on-surface-variant/40"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-on-surface">30+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Contributors</span>
              </div>
              <div className="w-px h-10 bg-outline-variant/20"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-on-surface">15k+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Commits</span>
              </div>
              <div className="w-px h-10 bg-outline-variant/20"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-on-surface">99%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Accuracy</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-surface-container-low/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <h2 className="text-4xl font-bold mb-6 tracking-tight">The Science of <br /><span className="text-primary">Performance.</span></h2>
                <p className="text-on-surface-variant/80 mb-8 leading-relaxed">
                  We translate complex circadian data into actionable insights for high-performance individuals.
                </p>
                <button className="flex items-center gap-2 text-primary font-bold group">
                  Read our Whitepaper <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                {[
                  { title: "Cognitive Modeling", desc: "Advanced AI models that learn your unique sleep-stress relationship.", icon: Brain },
                  { title: "Deficit Prediction", desc: "Know your exhaustion level before it impacts your work performance.", icon: Activity },
                  { title: "Privacy First", desc: "Your data is encrypted end-to-end with enterprise-grade security.", icon: ShieldAlert },
                  { title: "Adaptive Tips", desc: "Smart recommendations that evolve as your lifestyle patterns change.", icon: Sparkles }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-8 rounded-3xl hover:shadow-2xl hover:shadow-primary/5 transition-all"
                  >
                    <item.icon className="w-8 h-8 text-primary mb-6" />
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-on-surface-variant/70 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-primary p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                  Ready to optimize <br /> your rest?
                </h2>
                <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-12">
                  Join thousands of professionals who have reclaimed their focus and energy with SleepBalance AI.
                </p>
                <button 
                  onClick={() => onNavigate('dashboard-overview')}
                  className="bg-white text-primary font-bold py-5 px-12 rounded-2xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  Start Your Free Analysis
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary">
                <Moon className="text-white w-5 h-5 fill-white" />
              </div>
              <span className="font-bold text-xl text-primary tracking-tight">
                SleepBalance <span className="text-on-surface-variant font-medium">AI</span>
              </span>
            </div>
            <p className="text-on-surface-variant/70 max-w-xs mb-8">
              Precision sleep science for the digital age. Built with passion at Maranatha Global.
            </p>
            <div className="flex gap-4">
              <Globe className="w-5 h-5 text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
              <MessageSquare className="w-5 h-5 text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-widest text-[10px]">Product</h4>
            <ul className="space-y-4">
              {['Features', 'Analytics', 'Enterprise', 'Security'].map(item => (
                <li key={item}><a href="#" className="text-sm text-on-surface-variant/70 hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-widest text-[10px]">Company</h4>
            <ul className="space-y-4">
              {['About', 'Careers', 'Research', 'Contact'].map(item => (
                <li key={item}><a href="#" className="text-sm text-on-surface-variant/70 hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-outline-variant/5 pt-12">
          <p className="text-xs text-on-surface-variant/50">
            © 2026 SleepBalance AI. All rights reserved. Registered trademark of Maranatha Global.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-bold text-on-surface-variant/50 hover:text-primary uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-[10px] font-bold text-on-surface-variant/50 hover:text-primary uppercase tracking-widest">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
