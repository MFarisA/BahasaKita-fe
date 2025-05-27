export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  language: string;
}

export interface ProfileSettingsData {
  difficulty: string;
  dailyGoal: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  twoFactorAuth: boolean;
  reminderTime: string;
}

export const interfaceLanguages = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "japanese", label: "Japanese" },
];

export const difficultyLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const dailyGoals = [
  { value: "5", label: "5 minutes" },
  { value: "10", label: "10 minutes" },
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "60 minutes" },
];

export const reminderTimes = [
  { value: "8", label: "8:00 AM" },
  { value: "12", label: "12:00 PM" },
  { value: "18", label: "6:00 PM" },
  { value: "20", label: "8:00 PM" },
  { value: "22", label: "10:00 PM" },
];
