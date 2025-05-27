import { Achievement, LeaderboardEntry, StreakData } from "../types/progress";
// import { Trophy, Flame, Award, Star, Clock, Target } from "lucide-react";

export const achievementsData: Achievement[] = [
  {
    id: "1",
    title: "First Lesson",
    description: "Complete your first lesson",
    icon: "Award",
    earned: true,
    date: "2023-05-15",
  },
  {
    id: "2",
    title: "Perfect Score",
    description: "Get 100% on an exercise",
    icon: "Star",
    earned: true,
    date: "2023-05-18",
  },
  {
    id: "3",
    title: "Week Warrior",
    description: "Complete lessons 7 days in a row",
    icon: "Flame",
    earned: false,
    progress: 5,
  },
  {
    id: "4",
    title: "Language Master",
    description: "Complete all lessons in a language course",
    icon: "Trophy",
    earned: false,
    progress: 65,
  },
  {
    id: "5",
    title: "Quick Learner",
    description: "Complete 5 lessons in one day",
    icon: "Clock",
    earned: false,
    progress: 3,
  },
  {
    id: "6",
    title: "Goal Setter",
    description: "Reach your daily goal for 10 days",
    icon: "Target",
    earned: false,
    progress: 7,
  },
];

export const leaderboardData: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Sarah L.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    points: 1250,
    rank: 1,
  },
  {
    id: "2",
    name: "Miguel R.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel",
    points: 1180,
    rank: 2,
  },
  {
    id: "3",
    name: "You",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    points: 950,
    rank: 3,
  },
  {
    id: "4",
    name: "Aisha K.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    points: 920,
    rank: 4,
  },
  {
    id: "5",
    name: "Liam P.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    points: 890,
    rank: 5,
  },
];

export const streakDataDefault: StreakData = {
  currentStreak: 5,
  longestStreak: 14,
  lastWeek: [1, 1, 1, 1, 1, 0, 0],
};

export const languageProficiencyDefault = [
  { language: "Spanish", level: "Intermediate", progress: 65 },
  { language: "French", level: "Beginner", progress: 25 },
  { language: "Japanese", level: "Novice", progress: 10 },
];
