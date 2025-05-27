export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  completed: boolean;
  progress: number;
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
  progress: number;
}

export interface VocabularyItemData {
  word: string;
  translation: string;
}

export interface ExamplePhraseData {
  word: string;
  translation: string;
}
