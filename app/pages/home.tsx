"use client";

import React, { useState } from "react";
import { notificationsData } from "../data/notificationsData";
import LessonView from "./LessonView";
import NavbarHome from "../components/common/NavbarHome";

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
  const [activeMenu, setActiveMenu] = useState("Lessons");

  return (
    <div className="min-h-screen bg-[url('/images/union.svg')] bg-indigo-200 bg-cover bg-center bg-no-repeat bg-fixed p-4 md:p-8">
      {/* Header */}
      <NavbarHome activeMenu={activeMenu} setActiveMenu={setActiveMenu} notifications={notifications} />

      {/* Main Content */}
      <main>
        <LessonView lessonId="default-lesson-id" />
      </main>
    </div>
  );
};

export default Home;
