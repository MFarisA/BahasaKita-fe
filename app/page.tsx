import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

// Import all components
const LandingPage = dynamic(() => import("./pages/LandingPage"));
const Home = dynamic(() => import("./pages/home"));
const Login = dynamic(() => import("./pages/Login"));
const Register = dynamic(() => import("./pages/Register"));
const ProfileSettings = dynamic(() => import("./pages/ProfileSettings"));
const AIFeatures = dynamic(() => import("./pages/AIFeatures"));
const CultureContent = dynamic(() => import("./pages/CultureContent"));
const CommunityForum = dynamic(() => import("./pages/CommunityForum"));
const LessonView = dynamic(() => import("./pages/LessonView"));

// Main router component
export default async function Router({
  searchParams,
}: {
  searchParams: Promise<{ route?: string; lessonId?: string; unitId?: string }>;
}) {
  const params = await searchParams;
  const route = params.route || "landing";
  const lessonId = params.lessonId;
  const unitId = params.unitId;

  // Route mapping
  switch (route) {
    case "":
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
    case "community-forum":
      return <CommunityForum />;
    case "lesson":
      if (!lessonId) {
        return <div>Lesson ID is required</div>;
      }
      return <LessonView lessonId={lessonId} unitId={unitId} />;
    default:
      return <LandingPage />;
  }
}
