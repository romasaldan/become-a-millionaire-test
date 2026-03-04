import { unstable_cache } from "next/cache";
import type { GameConfig, QuestionsConfig } from "@/shared/types/game";
import { getQuestionForQuizLevel, prepareGameData } from "./helpers";
import gameConfig from "../../configs/game-config.json";
import questionsConfig from "../../configs/questions.json";

const GAME_DATA_REVALIDATE_SECONDS = 3600;

const getPreparedGameDataCached = unstable_cache(
  async () => {
    return prepareGameData(
      gameConfig as GameConfig,
      questionsConfig as QuestionsConfig,
    );
  },
  ["prepared-game-data"],
  { revalidate: GAME_DATA_REVALIDATE_SECONDS },
);

export async function getGameData() {
  try {
    const { rewards, questionsByRange } = await getPreparedGameDataCached();
    const usedQuestionIds = new Set<number>();
    const questions = questionsByRange.map((questionsInRange) =>
      getQuestionForQuizLevel(questionsInRange, usedQuestionIds),
    );

    return { rewards, questions };
  } catch (error) {
    throw new Error(
      "Unable to load game data right now. Please reload the page and try again.",
      { cause: error },
    );
  }
}
