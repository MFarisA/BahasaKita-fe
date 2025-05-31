"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Star,
  ArrowLeft,
  CheckCircle,
  Lock,
  Play,
  Trophy,
  Zap,
} from "lucide-react";
import NavbarHome from "../components/common/NavbarHome";

const LevelView = ({
  lessonId,
  unitId,
  level,
}: {
  lessonId: string;
  unitId?: string;
  level: number;
}) => {
  // Simulasi data level
  const totalLevels = 4;
  const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);

  // Add missing state for NavbarHome
  const [activeMenu, setActiveMenu] = React.useState<string>("Lessons");
  const [notifications, setNotifications] = React.useState<any[]>([]);

  // Warna gradien untuk setiap level
  const levelColors = [
    "from-emerald-400 to-emerald-600", // Level 1
    "from-blue-400 to-blue-600", // Level 2
    "from-purple-400 to-purple-600", // Level 3
    "from-orange-400 to-orange-600", // Level 4
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/union.svg')] bg-indigo-200 bg-cover bg-center bg-no-repeat bg-fixed p-4 md:p-8">
      <NavbarHome
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        notifications={notifications}
      />

      {/* Header Section */}
      <div className="flex-1 flex flex-col justify-center items-center w-full py-10">
        <div className="max-w-7xl w-full px-6 flex flex-col items-center">
          <div className="flex-1 w-full">
            <h1 className="text-4xl font-bold text-slate-800 mb-2 text-center">
              Level Journey
            </h1>
            <p className="text-slate-600 text-lg text-center">
              Selesaikan setiap level untuk membuka yang berikutnya
            </p>
          </div>
        </div>

        {/* Levels Path */}
        <div className="flex flex-col lg:flex-row items-start max-w-6xl w-full mx-auto mt-8 justify-center gap-8 lg:gap-12">
          {/* Main Level Path - Card Smaller */}
          <div className="flex-1 relative flex justify-center w-full min-w-0">
            <div className="relative max-w-xl w-full mx-auto">
              {/* Path Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 rounded-full hidden sm:block"></div>
              <div className="space-y-10">
                {levels.map((lvl, index) => {
                  const isCompleted = lvl < level;
                  const isCurrent = lvl === level;
                  const isLocked = lvl > level;

                  return (
                    <div
                      key={lvl}
                      className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-8 ${
                        index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                      }`}
                    >
                      {/* Level Circle - Made Bigger */}
                      <div className="relative flex-shrink-0 mb-2 sm:mb-0">
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-500 transform
                          ${
                            isCompleted
                              ? `bg-gradient-to-br ${levelColors[index]} border-white shadow-lg scale-100`
                              : isCurrent
                              ? `bg-gradient-to-br ${levelColors[index]} border-white shadow-xl scale-110 animate-pulse`
                              : "bg-slate-200 border-slate-300 scale-95"
                          }
                        `}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-10 w-10 text-white drop-shadow-lg" />
                          ) : isCurrent ? (
                            <Play className="h-10 w-10 text-white drop-shadow-lg ml-1" />
                          ) : (
                            <Lock className="h-10 w-10 text-slate-400" />
                          )}
                        </div>

                        {/* Level Number Badge - Made Bigger */}
                        <div
                          className={`absolute -top-1 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold
                        ${
                          isCompleted || isCurrent
                            ? "bg-white text-slate-700 shadow-md"
                            : "bg-slate-300 text-slate-500"
                        }`}
                        >
                          {lvl}
                        </div>

                        {/* Glow effect for current level */}
                        {isCurrent && (
                          <div
                            className={`absolute inset-0 rounded-full bg-gradient-to-br ${levelColors[index]} opacity-30 blur-xl scale-150 animate-pulse`}
                          ></div>
                        )}
                      </div>

                      {/* Level Content Card - Responsive */}
                      <div
                        className={`flex-1 w-full max-w-full ${
                          index % 2 === 0 ? "text-left" : "text-left"
                        }`}
                      >
                        <div
                          className={`bg-white rounded-2xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-full min-h-0 h-auto ${
                            isCurrent
                              ? "ring-2 ring-blue-400 ring-opacity-50"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div
                              className={`p-3 rounded-lg bg-gradient-to-br ${levelColors[index]}`}
                            >
                              {index === 0 && (
                                <Star className="h-6 w-6 text-white" />
                              )}
                              {index === 1 && (
                                <Zap className="h-6 w-6 text-white" />
                              )}
                              {index === 2 && (
                                <Award className="h-6 w-6 text-white" />
                              )}
                              {index === 3 && (
                                <Trophy className="h-6 w-6 text-white" />
                              )}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">
                              Level {lvl}
                            </h3>
                            {isCompleted && (
                              <div className="flex gap-1">
                                {[1, 2, 3].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-5 w-5 text-amber-400 fill-current"
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          <p className="text-slate-600 mb-4 text-normal">
                            {isCompleted
                              ? `Selamat! Level ${lvl} telah selesai dengan sempurna.`
                              : isCurrent
                              ? `Saatnya menguji kemampuanmu di level ${lvl}!`
                              : `Level ${lvl} akan terbuka setelah menyelesaikan level sebelumnya.`}
                          </p>

                          {(isCompleted || isCurrent) && (
                            <div className="space-y-5">
                              <div className="flex gap-3">
                                <div className="flex-1 bg-slate-100 rounded-full h-3">
                                  <div
                                    className={`h-3 rounded-full bg-gradient-to-r ${levelColors[index]} transition-all duration-500`}
                                    style={{
                                      width: isCompleted
                                        ? "100%"
                                        : isCurrent
                                        ? "20%"
                                        : "0%",
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-slate-500">
                                  {isCompleted
                                    ? "100%"
                                    : isCurrent
                                    ? "20%"
                                    : "0%"}
                                </span>
                              </div>

                              {/* Start Button - Made Smaller */}
                              <Link
                                href={`/?route=exercise&lessonId=${lessonId}${
                                  unitId ? `&unitId=${unitId}` : ""
                                }&level=${lvl}`}
                                className={`inline-flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl font-semibold text-base
                              transition-all duration-300 transform hover:scale-105 active:scale-95
                              ${
                                isCompleted
                                  ? `bg-gradient-to-r ${levelColors[index]} text-white shadow-md hover:shadow-lg`
                                  : isCurrent
                                  ? `bg-gradient-to-r ${levelColors[index]} text-white shadow-lg hover:shadow-xl animate-pulse`
                                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                              }
                            `}
                              >
                                {isCompleted ? (
                                  <>
                                    <CheckCircle className="h-5 w-5" />
                                    Ulangi Level
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-5 w-5" />
                                    Mulai Level
                                  </>
                                )}
                              </Link>
                            </div>
                          )}

                          {isLocked && (
                            <div className="mt-5">
                              <button
                                disabled
                                className="inline-flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl font-semibold text-base
                              bg-slate-200 text-slate-400 cursor-not-allowed"
                              >
                                <Lock className="h-5 w-5" />
                                Level Terkunci
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Panduan di kanan */}
          <div className="w-full max-w-md lg:w-96 h-full bg-white/90 border-l border-slate-200 p-4 sm:p-6 rounded-3xl shadow-xl lg:self-start flex flex-col gap-6 mt-8 lg:mt-0">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-amber-500" />
              <span className="text-lg font-bold text-slate-800">
                Panduan Level
              </span>
            </div>
            <ul className="space-y-4 text-slate-700 text-normal">
              <li>
                <span className="font-semibold text-blue-600">Level aktif</span>{" "}
                adalah level yang sedang kamu kerjakan sekarang. Klik tombol{" "}
                <span className="font-semibold text-blue-600">Mulai Level</span>{" "}
                untuk memulai latihan.
              </li>
              <li>
                <span className="font-semibold text-green-600">
                  Level selesai
                </span>{" "}
                ditandai dengan ikon centang dan dapat diulang kapan saja.
              </li>
              <li>
                <span className="font-semibold text-slate-400">
                  Level terkunci
                </span>{" "}
                hanya akan terbuka setelah kamu menyelesaikan level sebelumnya.
              </li>
              <li>Setiap level memiliki progress bar dan badge unik.</li>
              <li>Raih skor terbaik di setiap level untuk membuka prestasi!</li>
            </ul>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 text-sm">
              <span className="inline-flex items-center gap-1 text-blue-600">
                <Play className="h-4 w-4" />
                Mulai Lvl
              </span>
              <span className="inline-flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                Ulangi Lvl
              </span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <Lock className="h-4 w-4" />
                Level Terkunci
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button - Fixed Position Bottom Left */}
      <div className="fixed bottom-4 left-2 sm:bottom-8 sm:left-6 z-50 w-auto">
        <Link
          href="/?route=home"
          className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm hover:bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl text-slate-700 hover:text-slate-900 transition-all duration-300 transform hover:scale-105 active:scale-95 group border border-white/20 text-xs sm:text-sm"
        >
          <div className="rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          <span className="font-semibold">Kembali</span>
        </Link>
      </div>
    </div>
  );
};

export default LevelView;
