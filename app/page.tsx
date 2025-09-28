"use client";

import dynamic from "next/dynamic";
import ProgressDashboard from "./pages/ProgressDashboard";
import LevelView from "./pages/LevelView";
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Import all components
const LandingPage = dynamic(() => import("./pages/LandingPage"));
const Home = dynamic(() => import("./pages/home"));
const Login = dynamic(() => import("./pages/Login"));
const Register = dynamic(() => import("./pages/Register"));
const ProfileSettings = dynamic(() => import("./pages/ProfileSettings"));
const AIFeatures = dynamic(() => import("./pages/AIFeatures"));
const CultureContent = dynamic(() => import("./pages/CultureContent"));
const LessonView = dynamic(() => import("./pages/LessonView"));
const Landingv2 = dynamic(() => import("./pages/Landingv2"));
const ExerciseComponent = dynamic(() => import("./pages/ExerciseComponent"));

// Main router component
export default function Router({
  searchParams,
}: {
  searchParams?: { route?: string; lessonId?: string; unitId?: string; level?: string };
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  const route = searchParams?.route || "";
  const lessonId = searchParams?.lessonId;
  const unitId = searchParams?.unitId;
  const level = searchParams?.level;

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle authentication redirects
  useEffect(() => {
    if (!isLoading && isAuthenticated && (route === "" || route === "login" || route === "register")) {
      router.push('/?route=home');
    }
  }, [isAuthenticated, isLoading, route, router]);

  // Route mapping
  switch (route) {
    case "":
      // If authenticated, redirect will happen in useEffect
      return isAuthenticated ? <Home /> : <Landingv2 />;
    case "landing":
      return <LandingPage />;
    case "home":
      return <Home />;
    case "login":
      // If authenticated, redirect will happen in useEffect
      return isAuthenticated ? null : <Login />;
    case "register":
      // If authenticated, redirect will happen in useEffect
      return isAuthenticated ? null : <Register />;
    case "profile-settings":
      return <ProfileSettings />;
    case "ai-features":
      return <AIFeatures />;
    case "culture-content":
      return <CultureContent />;
     case "progress-dashboard":
      return <ProgressDashboard />;
    case "exercise":
      return <ExerciseComponent />;
    case "lesson":
      if (!lessonId) {
        return <div>Lesson ID is required</div>;
      }
      return <LessonView lessonId={lessonId} />;
    case "levelview":
      if (!lessonId || !level) {
        return <div>Lesson ID dan level diperlukan</div>;
      }
      return <LevelView lessonId={lessonId} unitId={unitId} level={parseInt(level, 10)} />;
    default:
      return <LandingPage />;
  }
}
