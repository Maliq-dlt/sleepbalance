export type AppTheme = 'light' | 'dark';

export type ActivePage = 'landing' | 'dashboard-overview' | 'dashboard-input' | 'dashboard-analytics' | 'dashboard-tips' | 'dashboard-settings';

export type StressLevel = 'low' | 'medium' | 'high';
export type SleepQuality = 'poor' | 'fair' | 'good';

export interface SleepEntry {
  id: string;
  dayLabel: string;
  sleepHours: number;
  screenHours: number;
  stressLevel: StressLevel;
  sleepQuality: SleepQuality;
}

export interface ScreenTimeCategory {
  name: string;
  percentage: number;
  color: string;
}

export interface RecommendationTip {
  id: string;
  title: string;
  description: string;
  iconName: string;
  colorType: 'primary' | 'secondary' | 'tertiary' | 'error';
}
