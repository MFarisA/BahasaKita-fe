import React from "react";
import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { BookOpen, ChevronRight } from "lucide-react";
import { CourseCardProps } from "./CourseCard";
import Image from "next/image";

const ModernCourseCard: React.FC<CourseCardProps> = ({
  id,
  language,
  description,
  completionPercentage,
  totalLessons,
  completedLessons,
  imageUrl,
  difficulty,
  isPopular,
  onClick,
}) => {
  const difficultyColor = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-blue-100 text-blue-800",
    advanced: "bg-purple-100 text-purple-800",
  };
  return (
    <div className="relative group">
      <Card className="pt-8 pb-4 px-4 rounded-3xl border-2 border-transparent group-hover:border-gray-300 shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-blue-50 to-yellow-50 scale-100 group-hover:scale-105">
        <div className="flex flex-col items-center">
          <Image
            src={imageUrl}
            alt={language}
            className="rounded-xl w-24 h-24 object-cover mb-2 border-4 border-white shadow-md"
          />
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-extrabold text-blue-700">{language}</h3>
            {isPopular && (
              <Badge className="bg-yellow-400 text-yellow-800 px-2 py-1 text-xs">
                Popular
              </Badge>
            )}
          </div>
          <Badge
            variant="outline"
            className={
              difficultyColor[difficulty] + " text-xs px-2 py-1 rounded-full"
            }
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          <p className="text-center text-gray-500 text-sm mt-2 mb-3 line-clamp-2">
            {description}
          </p>
          <div className="w-full flex flex-col items-center mb-2">
            <Progress
              value={completionPercentage}
              className="h-3 rounded-full bg-gray-200"
            />
            <span className="text-xs font-semibold text-blue-700 mt-1">
              {completionPercentage}% complete
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <BookOpen className="h-4 w-4" />
            <span>
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          <Button
            className="w-full mt-2 bg-gray-800 text-white font-bold shadow group-hover:from-blue-900 group-hover:to-blue-500"
            onClick={() => onClick && onClick(id)}
          >
            Continue <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Card>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-blue-300 rounded-full blur-sm opacity-60 group-hover:opacity-90 transition" />
    </div>
  );
};

export default ModernCourseCard;
