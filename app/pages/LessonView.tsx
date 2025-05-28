"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Volume2,
  Bot,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import ExerciseComponent from "./ExerciseComponent";
import { ttsService, geminiService } from "../services/aiServices";
import {
  unitsData,
  vocabularyData,
  examplePhrasesData,
} from "../data/lessonData";
import { Unit } from "../types/lesson";

interface LessonViewProps {
  unitId?: string;
  lessonId?: string;
  onBack?: () => void;
}

const VocabularyItem = ({
  word,
  translation,
}: {
  word: string;
  translation: string;
}) => {
  const [aiResponse, setAiResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSpeak = () => {
    ttsService.speak(word);
  };

  const handleAskAI = async () => {
    setLoading(true);
    setAiResponse("");
    const prompt = `Jelaskan arti dan penggunaan kata '${word}' dalam bahasa target, serta contoh kalimat.`;
    const response = await geminiService.generateText(prompt);
    setAiResponse(response);
    setLoading(false);
  };

  return (
    <li className="flex flex-col gap-1 border-b pb-2 mb-2">
      <div className="flex items-center gap-2">
        <span className="font-medium text-base">{word}</span>
        <button
          onClick={handleSpeak}
          title="Dengarkan"
          className="text-primary hover:text-indigo-600"
        >
          <Volume2 className="h-4 w-4" />
        </button>
        <button
          onClick={handleAskAI}
          title="Tanya AI"
          className="text-green-600 hover:text-green-800"
        >
          <Bot className="h-4 w-4" />
        </button>
        <span className="ml-auto text-muted-foreground">{translation}</span>
      </div>
      {loading && (
        <span className="text-xs text-blue-500">Meminta jawaban AI...</span>
      )}
      {aiResponse && (
        <div className="text-xs bg-muted/50 p-2 rounded mt-1">{aiResponse}</div>
      )}
    </li>
  );
};

const LessonView = ({
  unitId = "1",
  lessonId = "1",
  onBack = () => {},
}: LessonViewProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showExercise, setShowExercise] = useState(false);

  // Data diimpor dari file data
  const units: Unit[] = unitsData;

  // Find current unit and lesson
  const currentUnit = units.find((unit) => unit.id === unitId) || units[0];
  const currentLesson =
    currentUnit.lessons.find((lesson) => lesson.id === lessonId) ||
    currentUnit.lessons[0];

  const handleStartExercise = () => {
    setShowExercise(true);
  };

  const handleFinishExercise = () => {
    setShowExercise(false);
  };

  if (showExercise) {
    return (
      <ExerciseComponent
        lessonId={currentLesson.id}
        onComplete={handleFinishExercise}
      />
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Sidebar with unit structure */}
      <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md border-2 border-blue-100">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
        </div>

        <h3 className="text-lg font-semibold mb-4">Course Units</h3>

        {units.map((unit) => (
          <div key={unit.id} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{unit.title}</h4>
              <Badge
                variant={unit.id === currentUnit.id ? "default" : "outline"}
              >
                {unit.progress}%
              </Badge>
            </div>

            <Progress value={unit.progress} className="h-1 mb-3" />

            <div className="space-y-2 pl-2">
              {unit.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`flex items-center p-2 rounded-md cursor-pointer transition-all duration-200 ${
                    lesson.id === currentLesson.id
                      ? "bg-blue-100 border-l-4 border-blue-500"
                      : "hover:bg-blue-50 border-l-4 border-transparent"
                  }`}
                >
                  {lesson.completed ? (
                    <div className="relative">
                      <CheckCircle className="h-5 w-5 mr-2 text-blue-500 drop-shadow-sm" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></span>
                    </div>
                  ) : (
                    <div className="h-4 w-4 mr-2 rounded-full border border-muted-foreground flex items-center justify-center">
                      {lesson.progress > 0 && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                  )}
                  <span className="text-sm">{lesson.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4">
        <Card className="w-full border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">
                  {currentLesson.title}
                </CardTitle>
                <CardDescription className="mt-2">
                  {currentLesson.description}
                </CardDescription>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{currentLesson.duration} mins</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Lesson Content</TabsTrigger>
                <TabsTrigger value="exercises">Exercises</TabsTrigger>
              </TabsList>

              {/* tabs Overview */}
              <TabsContent value="overview" className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Lesson Progress</h3>
                </div>

                <Progress value={currentLesson.progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {currentLesson.progress}% complete
                </p>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-medium">What you'll learn</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>
                      Key vocabulary related to{" "}
                      {currentLesson.title.toLowerCase()}
                    </li>
                    <li>Essential grammar structures for this topic</li>
                    <li>Cultural context and practical usage examples</li>
                    <li>Pronunciation tips and practice exercises</li>
                  </ul>
                </div>
              </TabsContent>

              {/* tabs Lesson Content */}
              <TabsContent value="content" className="space-y-4">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-medium mb-4">Lesson Materials</h3>
                  <p className="text-sm mb-4">
                    This lesson introduces key vocabulary and phrases for{" "}
                    {currentLesson.title.toLowerCase()}. Follow along with the
                    examples and practice your pronunciation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card className="border-2 border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="text-xl">📚</span> Vocabulary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {vocabularyData.map((item) => (
                            <VocabularyItem
                              key={item.word}
                              word={item.word}
                              translation={item.translation}
                            />
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="text-xl">💬</span> Example Phrases
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {examplePhrasesData.map((item) => (
                            <VocabularyItem
                              key={item.word}
                              word={item.word}
                              translation={item.translation}
                            />
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* tabs Exercises */}
              <TabsContent value="exercises" className="space-y-4">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-medium mb-2">Practice Exercises</h3>
                  <p className="text-sm mb-6">
                    Complete these exercises to test your understanding of the
                    lesson material. You'll receive immediate feedback on your
                    answers.
                  </p>

                  <div className="space-y-4">
                    <Card className="border-2 border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="text-xl">❓</span> Multiple Choice
                          Questions
                        </CardTitle>
                        <CardDescription>
                          5 questions • Estimated time: 10 minutes
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button
                          onClick={handleStartExercise}
                          className="w-full sm:w-auto bg-blue-500 hover:bg-gray-600 text-white font-bold py-2 px-6 mt-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Start Exercise
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-2 border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="text-xl">🔄</span> Matching Exercise
                        </CardTitle>
                        <CardDescription>
                          8 pairs • Estimated time: 5 minutes
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" className="w-full sm:w-auto mt-4">
                          Start Exercise
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              className="border-2 border-blue-300 hover:bg-blue-50 font-bold"
            >
              Previous Lesson
            </Button>
            <Button className="bg-blue-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              Next Lesson
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LessonView;
