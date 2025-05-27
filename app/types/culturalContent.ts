export interface Story {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  language: string;
}

export interface Proverb {
  id: string;
  text: string;
  translation: string;
  explanation: string;
}

export interface Trivia {
  id: string;
  fact: string;
  category: string;
}

export interface CulturalContentData {
  stories: Story[];
  proverbs: Proverb[];
  trivia: Trivia[];
}
