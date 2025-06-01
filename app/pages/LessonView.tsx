"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Award,
} from "lucide-react";
import Link from "next/link";
import NavbarHome from "../components/common/NavbarHome";

const LessonView = ({
  hideNavbar,
}: {
  lessonId: string;
  hideNavbar?: boolean;
}) => {
  const [activeMenu, setActiveMenu] = useState("Lesson");

  const lessons = [
    { id: 1, title: "Greeting 1", completed: true, current: false },
    { id: 2, title: "Greeting 2", completed: true, current: false },
    { id: 3, title: "Greeting 3", completed: true, current: false },
    { id: 4, title: "Good Friend", completed: true, current: false },
    { id: 5, title: "Boy", completed: true, current: false },
    {
      id: 6,
      title: "CHECKPOINT 1",
      completed: true,
      current: false,
      isCheckpoint: true,
    },
    { id: 7, title: "Greeting 4", completed: false, current: true },
    { id: 8, title: "Greeting 5", completed: false, current: false },
    { id: 9, title: "Open", completed: false, current: false },
    { id: 10, title: "Atom", completed: false, current: false },
    { id: 11, title: "Animals", completed: false, current: false },
    { id: 12, title: "Judgment 1", completed: false, current: false },
    {
      id: 13,
      title: "CHECKPOINT 2",
      completed: false,
      current: false,
      isCheckpoint: true,
    },
    { id: 14, title: "Friends 1", completed: false, current: false },
    { id: 15, title: "Fun", completed: false, current: false },
    { id: 16, title: "Family", completed: false, current: false },
    { id: 17, title: "Animals 2", completed: false, current: false },
    { id: 18, title: "Advertising", completed: false, current: false },
    { id: 19, title: "Sports", completed: false, current: false },
    { id: 20, title: "Basic", completed: false, current: false },
  ];

  const [lessonProgress] = useState(lessons);

  return (
    <div className="min-h-screen">
      {/* Tampilkan NavbarHome hanya jika hideNavbar tidak true */}
      {!hideNavbar && (
        <div className="bg-white/80 sticky top-0 z-20">
          <NavbarHome
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
      )}
      <div className="flex flex-col lg:flex-row mx-auto gap-6">
        {/* Main lesson path */}
        <div className="flex-1 p-4 md:p-8 relative">
          <div className="relative max-w-md mx-auto">
            {lessonProgress.map((lesson, index) => {
              const isLeft = index % 2 === 0;
              const canAccess =
                lesson.completed ||
                lesson.current ||
                (index > 0 && lessonProgress[index - 1].completed);
              return (
                <div key={lesson.id} className="relative mb-8">
                  {/* Connecting line */}
                  {index > 0 && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <svg width="200" height="64" className="overflow-visible">
                        <path
                          d={`M 100 0 Q ${isLeft ? 50 : 150} 32 100 64`}
                          stroke="gray"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={lesson.completed ? "0" : "5,5"}
                        />
                      </svg>
                    </div>
                  )}

                  <div
                    className={`flex items-center gap-6 ${
                      isLeft ? "" : "flex-row-reverse"
                    }`}
                  >
                    {/* Lesson circle */}
                    <div className="relative flex-shrink-0">
                      {canAccess ? (
                        <Link
                          href={`/?route=levelview&lessonId=${lesson.id}&level=1`}
                          scroll={false}
                          className="block"
                        >
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg cursor-pointer transition-transform hover:scale-105 ${
                              lesson.current
                                ? "bg-blue-500 ring-4 ring-blue-200"
                                : lesson.completed
                                ? lesson.isCheckpoint
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          >
                            {lesson.completed && !lesson.isCheckpoint && (
                              <CheckCircle className="h-8 w-8 text-white" />
                            )}
                            {lesson.isCheckpoint && (
                              <Award className="h-8 w-8 text-white" />
                            )}
                            {lesson.current && (
                              <div className="w-6 h-6 bg-white rounded-full" />
                            )}
                            {!lesson.completed &&
                              !lesson.current &&
                              !lesson.isCheckpoint && (
                                <div className="w-6 h-6 bg-gray-500 rounded-full" />
                              )}
                          </div>
                        </Link>
                      ) : (
                        <div className="block opacity-50 cursor-not-allowed">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-transform ${
                              lesson.current
                                ? "bg-blue-500 ring-4 ring-blue-200"
                                : lesson.completed
                                ? lesson.isCheckpoint
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          >
                            {lesson.completed && !lesson.isCheckpoint && (
                              <CheckCircle className="h-8 w-8 text-white" />
                            )}
                            {lesson.isCheckpoint && (
                              <Award className="h-8 w-8 text-white" />
                            )}
                            {lesson.current && (
                              <div className="w-6 h-6 bg-white rounded-full" />
                            )}
                            {!lesson.completed &&
                              !lesson.current &&
                              !lesson.isCheckpoint && (
                                <div className="w-6 h-6 bg-gray-500 rounded-full" />
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Lesson card */}
                    <div
                      className={`bg-white rounded-xl shadow-md mt-8 p-4 min-w-48 border-2 ${
                        lesson.current ? "border-blue-200" : "border-gray-100"
                      } ${isLeft ? "text-left" : "text-right"}`}
                    >
                      <h3
                        className={`font-semibold text-gray-800 ${
                          lesson.isCheckpoint ? "text-yellow-600" : ""
                        }`}
                      >
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {lesson.isCheckpoint
                          ? "Checkpoint"
                          : lesson.completed
                          ? "Completed"
                          : lesson.current
                          ? "Current lesson"
                          : "Not started"}
                      </p>
                      {lesson.current && (
                        <Link
                          href={`/?route=levelview&lessonId=${lesson.id}&level=1`}
                          scroll={false}
                          className="mt-3 bg-blue-500 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors block text-center"
                        >
                          Continue
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-full lg:w-80 h-full bg-white border-l border-gray-200 p-4 md:p-6 rounded-xl shadow-md mt-6 lg:mt-0">
          <div className="space-y-6">
            {/* Progress stats */}
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl font-bold text-orange-600">0</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">Streak hari</p>
              <p className="text-sm text-gray-500">Pertahankan terus!</p>
            </div>

            {/* XP Progress */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Target Harian
                </span>
                <span className="text-sm text-gray-500">0/20 XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-xs text-gray-600 mt-1">Selesai</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-xs text-gray-600 mt-1">Total XP</div>
              </div>
            </div>

            {/* Current lesson info */}
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                Pelajaran Saat Ini
              </h3>
              <p className="text-sm text-blue-700 mb-3">Greeting 4</p>
              <p className="text-xs text-blue-600 mb-3">
                Pelajari ungkapan salam dasar dan cara merespons dengan tepat.
              </p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Mulai Pelajaran
              </button>
            </div>

            {/* Achievements */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-gray-800">
                Pencapaian Terbaru
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-green-800">
                      Pelajaran pertama selesai
                    </div>
                    <div className="text-xs text-green-600">+10 XP</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                  <Award className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-yellow-800">
                      Checkpoint tercapai
                    </div>
                    <div className="text-xs text-yellow-600">+50 XP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
