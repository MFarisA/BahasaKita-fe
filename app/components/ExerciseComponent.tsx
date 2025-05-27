import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  Award,
  Clock,
  Bot,
  Volume2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ttsService, geminiService } from "../services/aiServices";
import { exerciseQuestionsData } from "../data/exerciseQuestionsData";
import { Question } from "../types/exercise";

interface ExerciseComponentProps {
  lessonId?: string;
  lessonTitle?: string;
  questions?: Question[];
  onComplete?: (score: number, totalQuestions: number) => void;
}

const DuolingoMascot = () => (
  <div className="flex flex-col items-center mb-2">
    <div className="relative">
      <span className="text-[48px] md:text-[64px] animate-bounce">🦉</span>
      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
        +1
      </div>
    </div>
  </div>
);

const ExerciseComponent: React.FC<ExerciseComponentProps> = ({
  lessonId = "lesson-1",
  lessonTitle = "Basic Greetings",
  questions = exerciseQuestionsData,
  onComplete = () => {},
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption) {
      const selectedOptionObj = currentQuestion.options.find(
        (option) => option.id === selectedOption,
      );
      const isAnswerCorrect = selectedOptionObj?.isCorrect || false;

      setIsCorrect(isAnswerCorrect);
      setIsAnswerSubmitted(true);

      if (isAnswerCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

      // Simulate time spent on question
      setTimeSpent((prev) => prev + Math.floor(Math.random() * 30) + 10);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Exercise completed
      onComplete(score + (isCorrect ? 1 : 0), questions.length);
      setShowSummary(true);

      // Show achievement if score is good
      if ((score + (isCorrect ? 1 : 0)) / questions.length >= 0.7) {
        setShowAchievement(true);
      }
    }
  };

  const handleCloseAchievement = () => {
    setShowAchievement(false);
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

  const handleSpeak = (text: string) => {
    ttsService.speak(text);
  };

  const handleAskAI = async () => {
    setAiLoading(true);
    setAiResponse("");
    const prompt = `Bantu saya menjawab soal berikut: '${currentQuestion.text}'. Berikan penjelasan dan tips menjawabnya dalam bahasa Indonesia.`;
    const response = await geminiService.generateText(prompt);
    setAiResponse(response);
    setAiLoading(false);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 shadow-lg max-w-3xl mx-auto mt-10 border-2 border-blue-100">
      {!showSummary ? (
        <>
          <div className="flex flex-col items-center mb-2">
            <DuolingoMascot />
          </div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">{lessonTitle}</h2>
              <p className="text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-600">{timeSpent}s</span>
            </div>
          </div>
          <Progress
            value={progress}
            className="mb-8 h-3 bg-gray-200 rounded-full overflow-hidden"
          />
          <Card className="mb-6 border-2 border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-2">
              <CardTitle className="text-xl flex items-center gap-2">
                {currentQuestion.text}
                <button
                  onClick={() => handleSpeak(currentQuestion.text)}
                  title="Dengarkan soal"
                  className="text-gray-600 hover:text-blue-800 ml-2"
                >
                  <Volume2 className="h-5 w-5" />
                </button>
                <button
                  onClick={handleAskAI}
                  title="Tanya AI"
                  className="text-green-600 hover:text-green-800 ml-2"
                >
                  <Bot className="h-5 w-5" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedOption || ""} className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${isAnswerSubmitted && option.isCorrect ? "border-green-500 bg-green-50 shadow-md" : ""} ${isAnswerSubmitted && selectedOption === option.id && !option.isCorrect ? "border-red-500 bg-red-50 shadow-md" : ""} ${!isAnswerSubmitted ? "hover:bg-blue-50 hover:border-blue-300 cursor-pointer border-gray-200" : "border-gray-200"}`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={`option-${option.id}`}
                      disabled={isAnswerSubmitted}
                    />
                    <Label
                      htmlFor={`option-${option.id}`}
                      className="flex-grow cursor-pointer flex items-center gap-2"
                    >
                      {option.text}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(option.text);
                        }}
                        title="Dengarkan jawaban"
                        className="text-gray-500 hover:text-blue-700"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </Label>
                    {isAnswerSubmitted && option.isCorrect && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {isAnswerSubmitted &&
                      selectedOption === option.id &&
                      !option.isCorrect && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                  </div>
                ))}
              </RadioGroup>
              {aiLoading && (
                <div className="text-xs text-blue-500 mt-2">
                  Meminta jawaban AI...
                </div>
              )}
              {aiResponse && (
                <div className="text-xs bg-blue-50 p-2 rounded mt-2 text-blue-900">
                  {aiResponse}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg mb-4 w-full shadow-md border ${isCorrect ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
                >
                  <div className="flex items-center mb-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span className="font-medium">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 mr-2" />
                        <span className="font-medium">Incorrect</span>
                      </>
                    )}
                  </div>
                  <p>{currentQuestion.explanation}</p>
                </motion.div>
              )}
              <div className="flex justify-between w-full">
                {!isAnswerSubmitted ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOption}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
                  >
                    {currentQuestionIndex < questions.length - 1
                      ? "Next Question"
                      : "Complete Exercise"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="ml-2">
                          Score: {score}/
                          {currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your current score</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardFooter>
          </Card>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Exercise Complete!
            </h2>
            <p className="text-gray-600">
              You've completed the {lessonTitle} exercise.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-blue-100 shadow-md">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 mb-2 animate__animated animate__bounceIn">
              {score}/{questions.length}
            </div>
            <p className="text-gray-700">
              {score === questions.length
                ? "Perfect score! Amazing job!"
                : score >= questions.length * 0.7
                  ? "Great job! Keep it up!"
                  : "Good effort! Try again to improve your score."}
            </p>

            <div className="mt-6 flex justify-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">
                    Time spent: {timeSpent} seconds
                  </span>
                </div>
                <Progress
                  value={(score / questions.length) * 100}
                  className="h-2 w-48"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round((score / questions.length) * 100)}% accuracy
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleRestartExercise}
              variant="outline"
              className="border-2 border-blue-300 hover:bg-blue-50 font-bold"
            >
              Try Again
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              Continue Learning
            </Button>
          </div>
        </motion.div>
      )}
      <Dialog open={showAchievement} onOpenChange={setShowAchievement}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Achievement Unlocked!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-full mb-4 shadow-lg border-2 border-yellow-200"
            >
              <Award className="h-16 w-16 text-yellow-500 drop-shadow-md" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Quick Learner</h3>
            <p className="text-gray-600 text-center mb-4">
              You completed the {lessonTitle} exercise with{" "}
              {Math.round((score / questions.length) * 100)}% accuracy!
            </p>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
              +50 XP
            </Badge>
          </div>
          <DialogFooter>
            <Button onClick={handleCloseAchievement} className="w-full">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExerciseComponent;
