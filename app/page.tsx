import dynamic from "next/dynamic";
import ProgressDashboard from "./pages/ProgressDashboard";
import LevelView from "./pages/LevelView";

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
export default async function Router({
  searchParams,
}: {
  searchParams: Promise<{ route?: string; lessonId?: string; unitId?: string; level?: string }>;
}) {
  const params = await searchParams;
  const route = params.route || "";
  const lessonId = params.lessonId;
  const unitId = params.unitId;
  const level = params.level;

  // Route mapping
  switch (route) {
    case "":
      return <Landingv2 />;
    case "landing":
      return <LandingPage />;
    case "home":
      return <Home />;
    case "login":
      return <Login />;
    case "register":
      return <Register />;
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
