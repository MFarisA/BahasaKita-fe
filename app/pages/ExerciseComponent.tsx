"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  Award,
  Clock,
  Bot,
  Volume2,
  X,
  Settings,
  Lightbulb,
} from "lucide-react";

// Mock data for demonstration
const mockQuestions = [
  {
    id: "q1",
    type: "image-selection",
    text: 'Select "girl"',
    options: [
      {
        id: "1",
        text: "femme",
        image: "👩", // In real app, use your image assets
        isCorrect: false,
      },
      {
        id: "2", 
        text: "fille",
        image: "👧",
        isCorrect: true,
      },
      {
        id: "3",
        text: "homme", 
        image: "👨",
        isCorrect: false,
      },
      {
        id: "4",
        text: "garçon",
        image: "👦", 
        isCorrect: false,
      },
    ],
    explanation: "Fille means 'girl' in French.",
    audioText: "fille"
  },
  {
    id: "q2",
    type: "image-selection", 
    text: 'Select "boy"',
    options: [
      {
        id: "1",
        text: "femme",
        image: "👩",
        isCorrect: false,
      },
      {
        id: "2",
        text: "fille", 
        image: "👧",
        isCorrect: false,
      },
      {
        id: "3",
        text: "homme",
        image: "👨", 
        isCorrect: false,
      },
      {
        id: "4",
        text: "garçon",
        image: "👦",
        isCorrect: true,
      },
    ],
    explanation: "Garçon means 'boy' in French.",
    audioText: "garçon"
  },
];

// Mock TTS service
const ttsService = {
  speak: (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      speechSynthesis.speak(utterance);
    }
  }
};

const ExerciseComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const currentQuestion = mockQuestions[currentQuestionIndex];
  // Progress shows current position + 1 to indicate progress through the exercise
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!showSummary) {
        setTimeSpent(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [showSummary]);

  const handleOptionSelect = (optionId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(optionId);
      // Auto play audio when option is selected
      const selectedOptionObj = currentQuestion.options.find(option => option.id === optionId);
      if (selectedOptionObj) {
        ttsService.speak(selectedOptionObj.text);
      }
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption) {
      const selectedOptionObj = currentQuestion.options.find(
        (option) => option.id === selectedOption,
      );
      const isAnswerCorrect = selectedOptionObj?.isCorrect || false;

      setIsCorrect(isAnswerCorrect);
      setIsAnswerSubmitted(true);

      if (isAnswerCorrect) {
        setScore((prevScore) => prevScore + 1);
        // Play success sound effect (you can replace with actual audio file)
        ttsService.speak("Correct!");
      } else {
        // Play error sound effect
        ttsService.speak("Incorrect");
      }
    }
  };

  const handleContinue = () => {
    // Play continue sound when correct answer is clicked
    if (isCorrect) {
      ttsService.speak(currentQuestion.audioText);
    }
    
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestartExercise = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setShowSummary(false);
    setTimeSpent(0);
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center transform transition-all duration-300 scale-100 opacity-100">
        
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Exercise Complete!
          </h2>
          <div className="text-4xl font-bold text-green-500 mb-4">
            {score}/{mockQuestions.length}
          </div>
          <p className="text-gray-600 mb-6">
            {score === mockQuestions.length
              ? "Perfect score! Amazing job!"
              : score >= mockQuestions.length * 0.7
              ? "Great job! Keep it up!"
              : "Good effort! Try again to improve your score."}
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleRestartExercise}
              className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
            >
              Try Again
            </button>
            <button className="flex-1 py-3 px-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600">
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => window.history.back()}
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            </div>
          <div className="flex-1 bg-gray-200 rounded-full h-3 max-w-xs relative overflow-hidden">
              <div 
                className="bg-black h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {currentQuestion.text}
          </h1>
          <p className="text-gray-600">Choose the right picture.</p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
          {currentQuestion.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`relative p-6 rounded-2xl border-4 transition-all duration-200 transform hover:scale-105 ${
                selectedOption === option.id
                  ? isAnswerSubmitted
                    ? option.isCorrect
                      ? "border-green-400 bg-green-50"
                      : "border-red-400 bg-red-50" 
                    : "border-blue-400 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              disabled={isAnswerSubmitted}
            >
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">{index + 1}</span>
              </div>
              
              <div className="text-6xl mb-4">{option.image}</div>
              <div className="text-lg font-semibold text-gray-800">
                {option.text}
              </div>

              {/* Status indicators */}
              {isAnswerSubmitted && selectedOption === option.id && (
                <div className="absolute top-2 right-2">
                  {option.isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
              )}
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
                className={`py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-200 ${
                  selectedOption 
                    ? "bg-orange-400 text-white hover:bg-orange-500 shadow-lg" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                CHECK
              </button>
            </div>
          ) : (
            <div className={`rounded-2xl p-6 transform transition-all duration-300 opacity-100 translate-y-0 ${
                isCorrect 
                  ? "bg-green-100 border-2 border-green-200" 
                  : "bg-red-100 border-2 border-red-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">
                    {isCorrect ? "🦉" : "😔"}
                  </div>
                  <div>
                    <div className={`text-lg font-bold mb-1 ${
                      isCorrect ? "text-green-800" : "text-red-800"
                    }`}>
                      {isCorrect ? "Nicely done!" : "Correct solution:"}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {currentQuestion.options.find(o => o.isCorrect)?.text}
                      </span>
                      <Volume2
                        className="h-4 w-4 text-gray-500 cursor-pointer hover:text-black"
                        onClick={() => {
                          const correctText = currentQuestion.options.find(o => o.isCorrect)?.text;
                          if (correctText) ttsService.speak(correctText);
                        }}
                      />
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
                  className="bg-green-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-green-600 transition-colors"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseComponent;