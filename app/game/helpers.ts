import type {
  GameConfig,
  Question,
  QuestionsConfig,
  ComplexityRange,
} from "@/libs/types/game";

export type PreparedGameData = {
  rewards: number[];
  questionsByRange: Question[][];
};

export function buildQuestionsByRange(
  questions: Question[],
  complexityRanges: ComplexityRange[],
) {
  return complexityRanges.map((range) =>
    questions.filter(
      (question) =>
        question.complexity >= range.min && question.complexity <= range.max,
    ),
  );
}

export function getQuestionForQuizLevel(
  questionsInRange: Question[],
  usedQuestionIds: Set<number>,
) {
  const availableQuestions = questionsInRange.filter(
    (question) => !usedQuestionIds.has(question.id),
  );

  const selectedQuestion =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  usedQuestionIds.add(selectedQuestion.id);

  return selectedQuestion;
}

export function prepareGameData(
  gameConfig: GameConfig,
  questionsConfig: QuestionsConfig,
): PreparedGameData {
  return {
    rewards: gameConfig.quiz.map((quizItem) => quizItem.reward),
    questionsByRange: buildQuestionsByRange(
      questionsConfig.questions,
      gameConfig.quiz.map((quizItem) => quizItem.complexityRange),
    ),
  };
}
