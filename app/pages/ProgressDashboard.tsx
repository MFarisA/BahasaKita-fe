"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Trophy, Flame, Star, Users } from "lucide-react";
import * as LucideIcons from "lucide-react";
import {
  achievementsData,
  leaderboardData,
  streakDataDefault,
  languageProficiencyDefault,
} from "../data/progressDashboardData";
import { Achievement, LeaderboardEntry, StreakData } from "../types/progress";
import NavbarHome from "../components/common/NavbarHome";
import { notificationsData } from "../data/notificationsData";

interface ProgressDashboardProps {
  achievements?: Achievement[];
  leaderboard?: LeaderboardEntry[];
  streakData?: StreakData;
  totalXp?: number;
  completedLessons?: number;
  totalLessons?: number;
  languageProficiency?: {
    language: string;
    level: string;
    progress: number;
  }[];
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  achievements = achievementsData,
  leaderboard = leaderboardData,
  streakData = streakDataDefault,
  totalXp = 2450,
  completedLessons = 32,
  totalLessons = 120,
  languageProficiency = languageProficiencyDefault,
}) => {
  const [activeMenu, setActiveMenu] = useState("My Progress");
  const notifications = notificationsData;

  return (
    <div className="min-h-screen bg-[url('/images/union.svg')] bg-indigo-200 bg-cover bg-center bg-no-repeat bg-fixed p-4 md:p-8">
      <NavbarHome activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="w-full max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-900">
          Progres Belajar Anda
        </h1>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-indigo-900">
                Total XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500 mr-2" />
                <span className="text-3xl font-bold text-indigo-900">
                  {totalXp}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-indigo-900">
                Pelajaran Selesai
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-3xl font-bold mr-2 text-indigo-900">
                    {completedLessons}
                  </span>
                  <span className="text-muted-foreground text-indigo-900">
                    / {totalLessons}
                  </span>
                </div>
                <Progress
                  value={(completedLessons / totalLessons) * 100}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-indigo-900">
                Streak Saat Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Flame className="h-8 w-8 text-orange-500 mr-2" />
                <span className="text-3xl font-bold text-indigo-900">
                  {streakData.currentStreak} hari
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-indigo-900">
                Terpanjang: {streakData.longestStreak} hari
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
            <TabsTrigger value="leaderboard">Papan Peringkat</TabsTrigger>
            <TabsTrigger value="proficiency">Kemahiran</TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon =
                  (LucideIcons[
                    achievement.icon as keyof typeof LucideIcons
                  ] as React.ComponentType<unknown>) || LucideIcons.Award;
                const iconColor =
                  achievement.icon === "Award"
                    ? "text-green-500"
                    : achievement.icon === "Star"
                    ? "text-yellow-500"
                    : achievement.icon === "Flame"
                    ? "text-orange-500"
                    : achievement.icon === "Trophy"
                    ? "text-purple-500"
                    : achievement.icon === "Clock"
                    ? "text-blue-500"
                    : achievement.icon === "Target"
                    ? "text-red-500"
                    : "";
                return (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card
                      className={`${
                        achievement.earned ? "border-primary" : "opacity-70"
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="p-2 rounded-full bg-muted">
                            <Icon />
                          </div>
                          {achievement.earned && (
                            <Badge
                              variant="outline"
                              className="bg-primary/10 text-indigo-900 border-indigo-900"
                            >
                              Diraih
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-md mt-2 text-indigo-900">
                          {achievement.title}
                        </CardTitle>
                        <CardDescription className="text-indigo-900">
                          {achievement.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {achievement.earned ? (
                          <p className="text-xs text-muted-foreground text-indigo-900">
                            Diraih pada {achievement.date}
                          </p>
                        ) : (
                          <div className="flex flex-col">
                            <div className="flex justify-between text-xs mb-1 text-indigo-900">
                              <span>Progres</span>
                              <span>
                                {achievement.progress}/
                                {achievement.id === "3"
                                  ? "7"
                                  : achievement.id === "4"
                                  ? "100"
                                  : achievement.id === "5"
                                  ? "5"
                                  : "10"}
                              </span>
                            </div>
                            <Progress
                              value={
                                achievement.progress
                                  ? achievement.id === "3"
                                    ? (achievement.progress / 7) * 100
                                    : achievement.id === "4"
                                    ? achievement.progress
                                    : achievement.id === "5"
                                    ? (achievement.progress / 5) * 100
                                    : (achievement.progress / 10) * 100
                                  : 0
                              }
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-900">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  Papan Peringkat Mingguan
                </CardTitle>
                <CardDescription className="text-indigo-900">
                  Lihat bagaimana perbandingan Anda dengan pembelajar lain minggu ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        entry.name === "You" || entry.name === "Anda" ? "bg-indigo-900/20" : "bg-blue/50"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-8 text-center font-bold mr-3 text-indigo-900">
                          {entry.rank}
                        </div>
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={entry.avatar} alt={entry.name} />
                          <AvatarFallback>
                            {entry.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-indigo-900">
                            {entry.name === "You" ? "Anda" : entry.name}
                          </p>
                          {(entry.name === "You" || entry.name === "Anda") && (
                            <p className="text-xs text-muted-foreground text-indigo-900">
                              Pertahankan!
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-bold text-indigo-900">
                          {entry.points}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center mt-4">
                    <div className="flex items-center text-sm text-muted-foreground text-indigo-900">
                      <Users className="h-4 w-4 mr-1" />
                      <span>1.245 pembelajar minggu ini</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Proficiency Tab */}
          <TabsContent value="proficiency">
            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-900">
                  Kemahiran Bahasa
                </CardTitle>
                <CardDescription className="text-muted-foreground text-indigo-900">
                  Tingkat kemampuan Anda di setiap bahasa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {languageProficiency.map((lang, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-indigo-900">
                          {lang.language}
                        </h4>
                        <p className="text-sm text-muted-foreground text-indigo-900">
                          {lang.level}
                        </p>
                      </div>
                      <Badge
                        variant={lang.progress > 50 ? "default" : "outline"}
                        className="text-indigo-900 border-indigo-900"
                      >
                        {lang.progress}%
                      </Badge>
                    </div>
                    <Progress value={lang.progress} />
                    {index < languageProficiency.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Streak Calendar */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-900">
                  <Flame className="h-5 w-5 text-orange-500 mr-2" />
                  Streak Belajar Anda
                </CardTitle>
                <CardDescription className="text-indigo-900">
                  7 hari aktivitas terakhir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-indigo-900 font-semibold">
                  {streakData.lastWeek.map((day, index) => {
                    const dayNames = ["M", "S", "S", "R", "K", "J", "S"];
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                            day
                              ? "bg-orange-500 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {day ? <Flame className="h-4 w-4" /> : null}
                        </div>
                        <span className="text-xs">{dayNames[index]}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-between items-center text-indigo-900">
                  <div>
                    <p className="text-sm font-medium">Streak saat ini</p>
                    <p className="text-2xl font-bold">
                      {streakData.currentStreak} hari
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-right">
                      Streak terpanjang
                    </p>
                    <p className="text-2xl font-bold text-right">
                      {streakData.longestStreak} hari
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgressDashboard;