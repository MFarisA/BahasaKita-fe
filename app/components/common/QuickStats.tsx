import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Award, Calendar } from "lucide-react";

interface QuickStatsProps {
  streakDays: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({ streakDays }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Daily Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" className="w-full bg-slate-400">
          Continue Learning
        </Button>
      </CardFooter>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Current Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-2">
          <Calendar className="h-5 w-5 text-yellow-500" />
          <span className="text-3xl font-bold">{streakDays} days</span>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-muted-foreground w-full">
          Keep learning daily to maintain your streak!
        </p>
      </CardFooter>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-2">
          <Badge className="bg-blue-800 hover:bg-blue-900 text-white">
            <Award className="h-4 w-4 mr-1" /> 5 Badges
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full text-white">
          View All
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export default QuickStats;
