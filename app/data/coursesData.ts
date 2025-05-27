// src/data/coursesData.ts
import { CourseProps } from "../types/course";

export const coursesData: CourseProps[] = [
  {
    id: "1",
    language: "Jawa",
    description:
      "Sinau basa Jawa nganggo pelajaran interaktif lan wawasan budaya. Cocok kanggo pamula!",
    completionPercentage: 65,
    totalLessons: 30,
    completedLessons: 19,
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    difficulty: "beginner",
    isPopular: true,
  },
  {
    id: "2",
    language: "Sunda",
    description:
      "Ku kursus ieu, anjeun tiasa ngawasaan basa Sunda ti mimiti kecap, gramatika, jeung cara nyarita.",
    completionPercentage: 32,
    totalLessons: 40,
    completedLessons: 13,
    imageUrl:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&q=80",
    difficulty: "intermediate",
  },
  {
    id: "3",
    language: "Minang",
    description:
      "Eksplorasi basa Minang dan sistem tulisannya melalui pelajaran interaktif nan menarik.",
    completionPercentage: 10,
    totalLessons: 50,
    completedLessons: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80",
    difficulty: "advanced",
  },
  {
    id: "4",
    language: "Gorontalo",
    description:
      "Belajar basa Gorontalo secara sistematis dengan pendekatan struktur gramatika dan kosa kata.",
    completionPercentage: 45,
    totalLessons: 35,
    completedLessons: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80",
    difficulty: "intermediate",
    isPopular: true,
  },
  {
    id: "5",
    language: "Kalimantan",
    description:
      "Mulai perjalanan belajar basa Kalimantan dengan kursus ramah pemula dan pengenalan aksara.",
    completionPercentage: 5,
    totalLessons: 60,
    completedLessons: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    difficulty: "advanced",
  },
  {
    id: "6",
    language: "Papua",
    description:
      "Belajar basa Papua lewat percakapan, catatan budaya, dan kosa kata praktis.",
    completionPercentage: 78,
    totalLessons: 25,
    completedLessons: 19,
    imageUrl:
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&q=80",
    difficulty: "beginner",
  },
];
