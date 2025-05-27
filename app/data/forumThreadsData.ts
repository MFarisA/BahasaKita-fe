// src/data/forumThreadsData.ts

export interface ForumThread {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  replies: number;
  likes: number;
  lastActivity: string;
  preview: string;
}

export const forumThreadsData: ForumThread[] = [
  {
    id: "1",
    title: "Tips for mastering Spanish verb conjugations?",
    author: {
      name: "LanguageLover",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=language"
    },
    tags: ["Spanish", "Grammar", "Verbs"],
    replies: 24,
    likes: 18,
    lastActivity: "2 hours ago",
    preview: "I've been struggling with irregular verbs in Spanish. Does anyone have any memory tricks or resources that helped them?"
  },
  {
    id: "2",
    title: "French pronunciation resources for beginners",
    author: {
      name: "ParisianDreamer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=paris"
    },
    tags: ["French", "Pronunciation", "Beginner"],
    replies: 15,
    likes: 32,
    lastActivity: "1 day ago",
    preview: "Looking for good YouTube channels or apps that focus specifically on French pronunciation for absolute beginners."
  },
  {
    id: "3",
    title: "Japanese kanji study group - join us!",
    author: {
      name: "TokyoExplorer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tokyo"
    },
    tags: ["Japanese", "Kanji", "Study Group"],
    replies: 42,
    likes: 56,
    lastActivity: "3 hours ago",
    preview: "We're forming a weekly study group to practice kanji recognition and writing. All levels welcome! We meet on Zoom every Thursday."
  },
  {
    id: "4",
    title: "German articles - der, die, das - help!",
    author: {
      name: "BerlinBeginner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=berlin"
    },
    tags: ["German", "Grammar", "Articles"],
    replies: 19,
    likes: 24,
    lastActivity: "5 hours ago",
    preview: "I can never remember which article to use with German nouns. Are there any patterns or tricks to make this easier?"
  },
  {
    id: "5",
    title: "Best podcasts for intermediate Italian learners",
    author: {
      name: "RomanHoliday",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rome"
    },
    tags: ["Italian", "Podcasts", "Intermediate"],
    replies: 28,
    likes: 41,
    lastActivity: "2 days ago",
    preview: "I'm looking for Italian podcasts that aren't too fast but also not too basic. Any recommendations?"
  },
];
