"use client";

import React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import CourseSelection from "./CourseSelection";
import ProgressDashboard from "./ProgressDashboard";
import NotificationsMenu from "../components/common/NotificationsMenu";
import SettingsMenu from "../components/common/SettingsMenu";
import QuickStats from "../components/common/QuickStats";
import AIFeaturesCard from "../components/common/AIFeaturesCard";
import { notificationsData } from "../data/notificationsData";

interface HomeProps {
  username?: string;
  streakDays?: number;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    read: boolean;
    type: "achievement" | "reminder" | "system";
  }>;
}

const Home: React.FC<HomeProps> = ({
  username = "Language Learner",
  streakDays = 7,
  notifications = notificationsData,
}) => {
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-50 p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-indigo-900 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=learner"
              alt={username}
            />
            <AvatarFallback>
              {username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{streakDays} day streak</span>
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NotificationsMenu notifications={notifications} />
          <SettingsMenu />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="courses">Language Courses</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-8">
            {/* Quick Stats */}
            <QuickStats streakDays={streakDays} />

            {/* Course Selection */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">Continue Learning</h2>
              <CourseSelection />
            </div>

            {/* AI Features */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-black">AI Learning Tools</h2>
              </div>
              <AIFeaturesCard />
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <ProgressDashboard />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2023 Language Learning Gamification Platform</p>
      </footer>
    </div>
  );
};

export default Home;
