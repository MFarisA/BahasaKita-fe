export const features = [
  {
    icon: "Award",
    title: "Gamified Learning",
    description:
      "Earn points, badges, and climb leaderboards as you master new language skills through interactive exercises.",
    iconClass: "bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4",
    iconColor: "text-indigo-600",
  },
  {
    icon: "Sparkles",
    title: "AI-Powered Learning",
    description:
      "Get personalized learning experiences with our AI tools that adapt to your learning style and pace.",
    iconClass: "bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4",
    iconColor: "text-purple-600",
  },
  {
    icon: "Globe",
    title: "Cultural Immersion",
    description:
      "Explore local stories, proverbs, and cultural insights that bring language learning to life.",
    iconClass: "bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4",
    iconColor: "text-blue-600",
  },
];

export const extraFeatures = [
  {
    value: "cultural",
    title: "Discover Local Culture",
    description: "Immerse yourself in authentic cultural experiences with our curated collection of:",
    items: [
      "Traditional stories and folklore",
      "Local proverbs and sayings",
      "Cultural trivia and fun facts",
    ],
    buttonText: "Explore Cultural Content",
    buttonLink: "/culture-content",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
    icon: "BookOpen",
  },
  {
    value: "community",
    title: "Join Our Community",
    description: "Connect with fellow language learners from around the world:",
    items: [
      "Participate in discussion threads",
      "Share your learning journey",
      "Get help from native speakers",
    ],
    buttonText: "Join Community",
    buttonLink: "/community-forum",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
    icon: "MessageSquare",
  },
];

export const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

export const featuresList = [
  "Gamified Learning",
  "AI-Powered Tools",
  "Cultural Content",
  "Community Forum",
];
