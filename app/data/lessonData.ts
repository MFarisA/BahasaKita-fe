import { Unit, VocabularyItemData, ExamplePhraseData } from "../types/lesson";

export const unitsData: Unit[] = [
  {
    id: "1",
    title: "Beginner Basics",
    progress: 65,
    lessons: [
      {
        id: "1",
        title: "Greetings and Introductions",
        description: "Learn basic greetings and how to introduce yourself in conversation.",
        duration: 15,
        completed: true,
        progress: 100,
      },
      {
        id: "2",
        title: "Numbers and Counting",
        description: "Master the number system and learn to count in your target language.",
        duration: 20,
        completed: false,
        progress: 30,
      },
      {
        id: "3",
        title: "Common Phrases",
        description: "Essential phrases for everyday situations and conversations.",
        duration: 25,
        completed: false,
        progress: 0,
      },
    ],
  },
  {
    id: "2",
    title: "Daily Conversations",
    progress: 20,
    lessons: [
      {
        id: "4",
        title: "At the Restaurant",
        description: "Learn vocabulary and phrases for ordering food and dining out.",
        duration: 30,
        completed: false,
        progress: 50,
      },
      {
        id: "5",
        title: "Shopping Vocabulary",
        description: "Essential words and phrases for shopping experiences.",
        duration: 25,
        completed: false,
        progress: 0,
      },
    ],
  },
];

export const vocabularyData: VocabularyItemData[] = [
  { word: "Hello", translation: "Hola" },
  { word: "Goodbye", translation: "Adiós" },
  { word: "Thank you", translation: "Gracias" },
  { word: "Please", translation: "Por favor" },
];

export const examplePhrasesData: ExamplePhraseData[] = [
  { word: "How are you?", translation: "¿Cómo estás?" },
  { word: "My name is...", translation: "Me llamo..." },
  { word: "Nice to meet you", translation: "Encantado/a" },
];
