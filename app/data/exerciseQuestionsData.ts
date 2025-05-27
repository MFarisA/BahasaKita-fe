import { Question } from "../types/exercise";

export const exerciseQuestionsData: Question[] = [
  {
    id: "q1",
    text: 'How do you say "Hello" in Spanish?',
    options: [
      { id: "a", text: "Hola", isCorrect: true },
      { id: "b", text: "Bonjour", isCorrect: false },
      { id: "c", text: "Ciao", isCorrect: false },
      { id: "d", text: "Hallo", isCorrect: false },
    ],
    explanation: '"Hola" is the Spanish word for "Hello".',
  },
  {
    id: "q2",
    text: 'Which phrase means "Good morning" in Spanish?',
    options: [
      { id: "a", text: "Buenas tardes", isCorrect: false },
      { id: "b", text: "Buenos días", isCorrect: true },
      { id: "c", text: "Buenas noches", isCorrect: false },
      { id: "d", text: "Buen provecho", isCorrect: false },
    ],
    explanation: '"Buenos días" is the Spanish phrase for "Good morning".',
  },
  {
    id: "q3",
    text: 'How do you say "Thank you" in Spanish?',
    options: [
      { id: "a", text: "Por favor", isCorrect: false },
      { id: "b", text: "De nada", isCorrect: false },
      { id: "c", text: "Gracias", isCorrect: true },
      { id: "d", text: "Perdón", isCorrect: false },
    ],
    explanation: '"Gracias" is the Spanish word for "Thank you".',
  },
];
