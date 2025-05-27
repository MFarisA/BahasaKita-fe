export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // string, bukan React.ReactNode
  earned: boolean;
  progress?: number;
  date?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastWeek: number[];
}
