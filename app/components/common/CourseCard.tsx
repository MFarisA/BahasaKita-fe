import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { BookOpen, ChevronRight } from "lucide-react";
import { CourseProps } from "../../types/course";

export interface CourseCardProps extends CourseProps {
  onClick?: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
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
    <Card className="overflow-hidden transition-all hover:shadow-lg bg-white h-full flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80"
          }
          alt={`${language} course`}
          className="w-full h-full object-cover"
        />
        {isPopular && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
            Popular
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{language}</CardTitle>
          <Badge variant="outline" className={difficultyColor[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>
              {completedLessons}/{totalLessons} lessons completed
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onClick && onClick(id)}>
          Continue Learning
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
