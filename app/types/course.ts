export interface CourseProps {
  id: string;
  language: string;
  description: string;
  completionPercentage: number;
  totalLessons: number;
  completedLessons: number;
  imageUrl: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isPopular?: boolean;
}
