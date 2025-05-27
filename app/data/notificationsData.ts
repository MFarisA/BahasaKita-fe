// src/data/notificationsData.ts

export const notificationsData: Array<{
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: "achievement" | "reminder" | "system";
}> = [
  {
    id: "1",
    title: "Daily Streak!",
    message: "You've maintained a 7-day streak!",
    read: false,
    type: "achievement",
  },
  {
    id: "2",
    title: "New Spanish Lesson",
    message: "New content available in your Spanish course",
    read: false,
    type: "system",
  },
  {
    id: "3",
    title: "Study Reminder",
    message: "Time to practice your French!",
    read: true,
    type: "reminder",
  },
];
