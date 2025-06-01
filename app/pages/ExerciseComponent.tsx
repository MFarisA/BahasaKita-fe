"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Volume2,
  X,
  Settings,
  Lightbulb,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

// Data soal untuk bahasa Jawa dan Sunda
const mockQuestions = [
  {
    id: "q1",
    type: "image-selection",
    text: 'Pilih "anak perempuan" dalam bahasa Jawa',
    options: [
      {
        id: "1",
        text: "bocah lanang",
        image: "👦",
        isCorrect: false,
      },
      {
        id: "2",
        text: "bocah wedok",
        image: "👧",
        isCorrect: true,
      },
      {
        id: "3",
        text: "wong lanang",
        image: "👨",
        isCorrect: false,
      },
      {
        id: "4",
        text: "wong wedok",
        image: "👩",
        isCorrect: false,
      },
    ],
    explanation: "Bocah wedok artinya anak perempuan dalam bahasa Jawa.",
    audioText: "bocah wedok",
  },
  {
    id: "q2",
    type: "image-selection",
    text: 'Pilih "anak laki-laki" dalam bahasa Sunda',
    options: [
      {
        id: "1",
        text: "budak awéwé",
        image: "👧",
        isCorrect: false,
      },
      {
        id: "2",
        text: "mojang",
        image: "👩",
        isCorrect: false,
      },
      {
        id: "3",
        text: "budak lalaki",
        image: "👦",
        isCorrect: true,
      },
      {
        id: "4",
        text: "lalaki",
        image: "👨",
        isCorrect: false,
      },
    ],
    explanation: "Budak lalaki artinya anak laki-laki dalam bahasa Sunda.",
    audioText: "budak lalaki",
  },
  {
    id: "q3",
    type: "image-selection",
    text: 'Pilih "ibu" dalam bahasa Jawa',
    options: [
      {
        id: "1",
        text: "bapak",
        image: "👨",
        isCorrect: false,
      },
      {
        id: "2",
        text: "mbah",
        image: "👵",
        isCorrect: false,
      },
      {
        id: "3",
        text: "ibu",
        image: "👩",
        isCorrect: true,
      },
      {
        id: "4",
        text: "simbah",
        image: "👴",
        isCorrect: false,
      },
    ],
    explanation: "Ibu dalam bahasa Jawa tetap 'ibu' atau bisa juga 'simbok'.",
    audioText: "ibu",
  },
  {
    id: "q4",
    type: "image-selection",
    text: 'Pilih "bapak" dalam bahasa Sunda',
    options: [
      {
        id: "1",
        text: "indung",
        image: "👩",
        isCorrect: false,
      },
      {
        id: "2",
        text: "bapa",
        image: "👨",
        isCorrect: true,
      },
      {
        id: "3",
        text: "aki",
        image: "👴",
        isCorrect: false,
      },
      {
        id: "4",
        text: "nini",
        image: "👵",
        isCorrect: false,
      },
    ],
    explanation: "Bapa artinya bapak dalam bahasa Sunda.",
    audioText: "bapa",
  },
];

// Mock TTS service
const ttsService = {
  speak: (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      speechSynthesis.speak(utterance);
    }
  },
};

const ExerciseComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lessonId = searchParams.get("lessonId") || "";
  const unitId = searchParams.get("unitId") || undefined;
  const level = parseInt(searchParams.get("level") || "1", 10);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [questionAnimation, setQuestionAnimation] = useState("animate-fadeIn");
  const [showBackModal, setShowBackModal] = useState(false);

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!showSummary) {
        setTimeSpent((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [showSummary]);

  // Confetti effect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleOptionSelect = (optionId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(optionId);
      const selectedOptionObj = currentQuestion.options.find(
        (option) => option.id === optionId
      );
      if (selectedOptionObj) {
        ttsService.speak(selectedOptionObj.text);
      }
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption) {
      const selectedOptionObj = currentQuestion.options.find(
        (option) => option.id === selectedOption
      );
      const isAnswerCorrect = selectedOptionObj?.isCorrect || false;

      setIsCorrect(isAnswerCorrect);
      setIsAnswerSubmitted(true);

      if (isAnswerCorrect) {
        setScore((prevScore) => prevScore + 1);
        setShowConfetti(true);
        ttsService.speak("Benar!");
      } else {
        ttsService.speak("Salah");
      }
    }
  };

  const handleContinue = () => {
    if (isCorrect) {
      ttsService.speak(currentQuestion.audioText);
    }

    setQuestionAnimation("animate-slideOut");

    setTimeout(() => {
      setSelectedOption(null);
      setIsAnswerSubmitted(false);

      if (currentQuestionIndex < mockQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setQuestionAnimation("animate-slideIn");
      } else {
        setShowSummary(true);
      }
    }, 300);
  };

  const handleRestartExercise = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setShowSummary(false);
    setTimeSpent(0);
    setQuestionAnimation("animate-fadeIn");
  };

  const handleContinueLearning = () => {
    if (level < 4) {
      // Redirect ke LevelView untuk level berikutnya
      router.push(
        `/?route=levelview&lessonId=${lessonId}${
          unitId ? `&unitId=${unitId}` : ""
        }&level=${level + 1}`
      );
    } else {
      // Jika sudah level terakhir, redirect ke halaman utama lessonview (route=home)
      router.push(`/?route=home`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (showSummary) {
    const scorePercentage = (score / mockQuestions.length) * 100;
    const isExcellent = scorePercentage === 100;
    const isGood = scorePercentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Summary Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-2xl max-w-lg w-full text-center transform transition-all duration-500 animate-scaleIn relative">
          {/* Floating stars */}
          {isExcellent && (
            <>
              <div className="absolute -top-3 -left-3 text-2xl animate-bounce">
                ⭐
              </div>
              <div className="absolute -top-3 -right-3 text-xl animate-bounce animation-delay-500">
                ⭐
              </div>
              <div className="absolute top-3 right-3 text-xl animate-pulse">
                ✨
              </div>
            </>
          )}

          <div className="text-6xl mb-4 animate-bounce">
            {isExcellent ? "🏆" : isGood ? "🎉" : "💪"}
          </div>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            {isExcellent
              ? "Sempurna!"
              : isGood
              ? "Bagus Sekali!"
              : "Terus Semangat!"}
          </h2>

          <div className="relative mb-4">
            <div className="text-4xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">
              {score}/{mockQuestions.length}
            </div>
            <div className="text-base text-gray-600 mt-1">
              {scorePercentage}% Akurasi
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4 p-2 bg-gray-50 rounded-xl">
            <div className="text-blue-500 text-lg">⏰</div>
            <span className="font-semibold text-gray-700 text-sm">
              Waktu: {formatTime(timeSpent)}
            </span>
          </div>

          <p className="text-gray-600 mb-6 text-base">
            {isExcellent
              ? "Luar biasa! Kamu ahli bahasa daerah! 🌟"
              : isGood
              ? "Kemajuan yang hebat! Terus pertahankan! 🚀"
              : "Setiap kesalahan adalah langkah menuju penguasaan! 💡"}
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleRestartExercise}
              className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-xl font-bold text-gray-700 text-sm hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 hover:scale-105"
            >
              Coba Lagi
            </button>
            <button
              onClick={handleContinueLearning}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-sm hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Lanjut Belajar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header
        className="flex flex-col gap-4 mx-2 md:mx-8 mb-6 bg-white rounded-xl p-3 md:p-6 shadow transition-all duration-300 z-30 sticky"
        style={{ top: 20 }}
      >
        <section className="container mx-auto px-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
            {/* Left section - Back button */}
            <div className="flex items-center gap-2 md:gap-4 md:pr-20 mb-2 md:mb-0">
              <button
                className="p-2 md:p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 group"
                onClick={() => setShowBackModal(true)}
                aria-label="Kembali"
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
              </button>
            </div>

            {/* Center section - Progress bar */}
            <div className="w-full md:flex-1 md:max-w-2xl md:pl-14 mx-0 md:mx-4 mb-2 md:mb-0">
              <div className="bg-gray-200 rounded-full h-3 md:h-4 relative overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 md:h-4 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Right section - Timer and action buttons */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              <div className="flex items-center gap-1 md:gap-2 bg-blue-50 px-2 md:px-3 py-1 md:py-2 rounded-xl">
                <Clock className="h-4 w-4 text-indigo-700" />
                <span className="text-xs md:text-sm font-semibold text-indigo-700">
                  {formatTime(timeSpent)}
                </span>
              </div>
              <button
                className="p-2 md:p-3 hover:bg-yellow-50 rounded-2xl transition-all duration-300 hover:scale-110 group"
                aria-label="Hint"
              >
                <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
              </button>
              <button
                className="p-2 md:p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 group"
                aria-label="Pengaturan"
              >
                <Settings className="h-5 w-5 md:h-6 md:w-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
              </button>
            </div>
          </div>
        </section>
      </header>

      {/* Main Content */}
      <div className={`max-w-4xl mx-auto px-4 pt-6 ${questionAnimation}`}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-indigo-100 px-3 py-1 rounded-full mb-2">
            <span className="text-indigo-800 font-semibold text-xs">
              Soal {currentQuestionIndex + 1} dari {mockQuestions.length}
            </span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            {currentQuestion.text}
          </h1>
          <p className="text-base text-gray-600">Pilih gambar yang tepat</p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-2xl mx-auto">
          {currentQuestion.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`relative p-5 h-44 min-h-[11rem] rounded-2xl border-4 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group ${
                selectedOption === option.id
                  ? isAnswerSubmitted
                    ? option.isCorrect
                      ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-green-200 shadow-xl"
                      : "border-red-400 bg-gradient-to-br from-red-50 to-pink-50 shadow-red-200 shadow-xl"
                    : "border-indigo-400 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-blue-200 shadow-xl"
                  : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-indigo-200 hover:shadow-xl"
              }`}
              disabled={isAnswerSubmitted}
            >
              {/* Option number */}
              <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">
                  {index + 1}
                </span>
              </div>

              {/* Emoji with animation */}
              <div className="text-7xl mb-4 group-hover:animate-bounce transition-all duration-300">
                {option.image}
              </div>

              {/* Text */}
              <div className="text-lg font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">
                {option.text}
              </div>

              {/* Status indicators */}
              {isAnswerSubmitted && selectedOption === option.id && (
                <div className="absolute -top-2 -right-2 animate-bounceIn">
                  {option.isCorrect ? (
                    <div className="bg-green-500 rounded-full p-1 shadow-lg">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <div className="bg-red-500 rounded-full p-1 shadow-lg">
                      <XCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              )}

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="max-w-2xl mx-auto">
          {!isAnswerSubmitted ? (
            <div className="text-center">
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className={`py-3 px-8 rounded-2xl font-bold text-base transition-all duration-300 transform ${
                  selectedOption
                    ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:from-orange-500 hover:to-pink-600 shadow-xl hover:scale-110 hover:-translate-y-1"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedOption ? "PERIKSA JAWABAN" : "PILIH JAWABAN"}
              </button>
            </div>
          ) : (
            <div
              className={`rounded-2xl p-5 transform transition-all duration-500 animate-slideUp shadow-xl ${
                isCorrect
                  ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
                  : "bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl animate-bounce">
                    {isCorrect ? "🦉" : "😔"}
                  </div>
                  <div>
                    <div
                      className={`text-lg font-bold mb-1 ${
                        isCorrect ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {isCorrect ? "Bagus sekali! 🎉" : "Jawaban yang benar:"}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base text-gray-700 font-bold">
                        {currentQuestion.options.find((o) => o.isCorrect)?.text}
                      </span>
                      <button
                        className="p-1 hover:bg-white/50 rounded-full transition-all duration-300 hover:scale-110"
                        onClick={() => {
                          const correctText = currentQuestion.options.find(
                            (o) => o.isCorrect
                          )?.text;
                          if (correctText) ttsService.speak(correctText);
                        }}
                      >
                        <Volume2 className="h-4 w-4 text-gray-500 hover:text-black" />
                      </button>
                    </div>
                    {!isCorrect && (
                      <div className="text-sm text-gray-600 mt-1">
                        {currentQuestion.explanation}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-110 shadow-lg text-base"
                >
                  LANJUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Konfirmasi Back */}
      {showBackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-xs w-full text-center">
            <div className="mb-3 text-3xl">❓</div>
            <h3 className="font-bold text-lg mb-2">Keluar dari latihan?</h3>
            <p className="text-gray-600 mb-5 text-sm">
              Apakah Anda yakin ingin keluar? Progres latihan akan hilang.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowBackModal(false)}
                className="flex-1 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:from-red-600 hover:to-pink-600 transition"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-100px);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        .animate-slideOut {
          animation: slideOut 0.3s ease-in;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out;
        }
        .animate-bounceIn {
          animation: bounceIn 0.6s ease-out;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-confetti {
          animation: confetti 3s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default ExerciseComponent;
