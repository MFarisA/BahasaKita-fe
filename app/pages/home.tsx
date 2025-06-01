"use client";

import React, { useState } from "react";
import LessonView from "./LessonView";
import NavbarHome from "../components/common/NavbarHome";

const Home: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("Lessons");

  return (
    <div className="min-h-screen bg-[url('/images/union.svg')] bg-indigo-200 bg-cover bg-center bg-no-repeat bg-fixed p-4 md:p-8">
      {/* Header */}
      <NavbarHome activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      {/* Main Content */}
      <main>
        {/* Hapus NavbarHome dari LessonView agar tidak double */}
        <LessonView lessonId="1" hideNavbar={true} />
      </main>
    </div>
  );
};

export default Home;
