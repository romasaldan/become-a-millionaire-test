export type ComplexityRange = { min: number; max: number };

export type QuestionOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  text: string;
  complexity: number;
  options: QuestionOption[];
};

export type GameConfig = {
  quiz: {
    reward: number;
    complexityRange: ComplexityRange;
  }[];
};

export type QuestionsConfig = {
  questions: Question[];
};
