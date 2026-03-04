import type {
  GameConfig,
  Question,
  QuestionsConfig,
} from "@/shared/types/game";
import {
  buildQuestionsByRange,
  getQuestionForQuizLevel,
  prepareGameData,
} from "./helpers";

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Q1",
    complexity: 2,
    options: [],
  },
  {
    id: 2,
    text: "Q2",
    complexity: 5,
    options: [],
  },
  {
    id: 3,
    text: "Q3",
    complexity: 8,
    options: [],
  },
];

afterEach(() => {
  jest.restoreAllMocks();
});

describe("buildQuestionsByRange", () => {
  it("groups questions by provided complexity ranges", () => {
    const ranges = [
      { min: 1, max: 3 },
      { min: 4, max: 6 },
      { min: 7, max: 10 },
    ];

    const result = buildQuestionsByRange(QUESTIONS, ranges);

    expect(result).toEqual([[QUESTIONS[0]], [QUESTIONS[1]], [QUESTIONS[2]]]);
  });

  it("treats min and max range values as inclusive", () => {
    const ranges = [
      { min: 2, max: 2 },
      { min: 8, max: 8 },
    ];

    const result = buildQuestionsByRange(QUESTIONS, ranges);

    expect(result).toEqual([[QUESTIONS[0]], [QUESTIONS[2]]]);
  });

  it("includes a question in multiple groups when ranges overlap", () => {
    const ranges = [
      { min: 1, max: 5 },
      { min: 5, max: 10 },
    ];

    const result = buildQuestionsByRange(QUESTIONS, ranges);

    expect(result[0]).toEqual([QUESTIONS[0], QUESTIONS[1]]);
    expect(result[1]).toEqual([QUESTIONS[1], QUESTIONS[2]]);
  });

  it("returns empty groups when no questions match", () => {
    const ranges = [
      { min: 11, max: 20 },
      { min: 30, max: 40 },
    ];

    const result = buildQuestionsByRange(QUESTIONS, ranges);

    expect(result).toEqual([[], []]);
  });

  it("returns an empty array when there are no ranges", () => {
    const result = buildQuestionsByRange(QUESTIONS, []);

    expect(result).toEqual([]);
  });
});

describe("getQuestionForQuizLevel", () => {
  it("returns a question not used yet and marks it as used", () => {
    const usedQuestionIds = new Set<number>([1]);
    jest.spyOn(Math, "random").mockReturnValue(0);

    const result = getQuestionForQuizLevel(QUESTIONS, usedQuestionIds);

    expect(result).toBe(QUESTIONS[1]);
    expect(usedQuestionIds.has(2)).toBe(true);
  });

  it("can select the last available question when random is near 1", () => {
    const usedQuestionIds = new Set<number>();
    jest.spyOn(Math, "random").mockReturnValue(0.999999);

    const result = getQuestionForQuizLevel(QUESTIONS, usedQuestionIds);

    expect(result).toBe(QUESTIONS[2]);
    expect(usedQuestionIds.has(3)).toBe(true);
  });

  it("avoids returning duplicates across sequential picks", () => {
    const usedQuestionIds = new Set<number>();
    jest.spyOn(Math, "random").mockReturnValue(0);

    const first = getQuestionForQuizLevel(QUESTIONS, usedQuestionIds);
    const second = getQuestionForQuizLevel(QUESTIONS, usedQuestionIds);
    const third = getQuestionForQuizLevel(QUESTIONS, usedQuestionIds);

    expect(first.id).toBe(1);
    expect(second.id).toBe(2);
    expect(third.id).toBe(3);
    expect(usedQuestionIds).toEqual(new Set([1, 2, 3]));
  });

  it("throws when no available questions remain", () => {
    const usedQuestionIds = new Set<number>([1, 2, 3]);

    expect(() => getQuestionForQuizLevel(QUESTIONS, usedQuestionIds)).toThrow();
  });
});

describe("prepareGameData", () => {
  it("builds rewards and grouped questions from configs", () => {
    const gameConfig: GameConfig = {
      quiz: [
        { reward: 100, complexityRange: { min: 1, max: 4 } },
        { reward: 200, complexityRange: { min: 5, max: 10 } },
      ],
    };
    const questionsConfig: QuestionsConfig = {
      questions: QUESTIONS,
    };

    const result = prepareGameData(gameConfig, questionsConfig);

    expect(result.rewards).toEqual([100, 200]);
    expect(result.questionsByRange).toEqual([
      [QUESTIONS[0]],
      [QUESTIONS[1], QUESTIONS[2]],
    ]);
  });

  it("returns empty arrays when quiz config has no levels", () => {
    const gameConfig: GameConfig = { quiz: [] };
    const questionsConfig: QuestionsConfig = { questions: QUESTIONS };

    const result = prepareGameData(gameConfig, questionsConfig);

    expect(result).toEqual({
      rewards: [],
      questionsByRange: [],
    });
  });

  it("keeps rewards order exactly as defined by quiz levels", () => {
    const gameConfig: GameConfig = {
      quiz: [
        { reward: 500, complexityRange: { min: 1, max: 3 } },
        { reward: 100, complexityRange: { min: 4, max: 6 } },
        { reward: 1000, complexityRange: { min: 7, max: 10 } },
      ],
    };
    const questionsConfig: QuestionsConfig = { questions: QUESTIONS };

    const result = prepareGameData(gameConfig, questionsConfig);

    expect(result.rewards).toEqual([500, 100, 1000]);
  });
});
