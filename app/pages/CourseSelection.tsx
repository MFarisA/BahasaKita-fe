"use client";

import React from "react";
import { Globe } from "lucide-react";
import { coursesData } from "../data/coursesData";
import { CourseProps } from "../types/course";
import ModernCourseCard from "../components/common/ModernCourseCard";
import { useRouter } from "next/navigation";

interface CourseSelectionProps {
  courses?: CourseProps[];
  title?: string;
  description?: string;
  onCourseSelect?: (courseId: string) => void;
}

const ModernCourseGrid: React.FC<{
  courses: CourseProps[];
  onCourseClick: (id: string) => void;
}> = ({ courses, onCourseClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {courses.map((course) => (
      <ModernCourseCard key={course.id} {...course} onClick={onCourseClick} />
    ))}
  </div>
);

const CourseSelection: React.FC<CourseSelectionProps> = ({
  courses = coursesData,
  title = "Available Language Courses",
  description = "Choose a language to start or continue your learning journey",
  onCourseSelect,
}) => {
  const router = useRouter();
  const handleCourseClick = (courseId: string) => {
    if (onCourseSelect) {
      onCourseSelect(courseId);
    } else {
      router.push(`/lesson?lessonId=${courseId}`);
    }
  };

  return (
    <div className="w-full bg-white/50 py-8 rounded-xl shadow-md backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Globe className="h-6 w-6 mr-2 text-[#1a237e]" />
          <h2 className="text-2xl font-bold text-[#1a237e]">{title}</h2>
        </div>
        <p className="text-[#42506a] mb-8">{description}</p>
        <ModernCourseGrid courses={courses} onCourseClick={handleCourseClick} />
      </div>
    </div>
  );
};

export default CourseSelection;
