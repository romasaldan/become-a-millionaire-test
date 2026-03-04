import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import type { GameConfig, QuestionsConfig } from "@/libs/types/game";
import { getQuestionForQuizLevel, prepareGameData } from "./helpers";

const GAME_DATA_REVALIDATE_SECONDS = 3600;

const getPreparedGameDataCached = unstable_cache(
  async (protocol: string, host: string) => {
    const [gameConfigResponse, questionsConfigResponse] = await Promise.all([
      fetch(`${protocol}://${host}/api/configs/game`, {
        next: { revalidate: GAME_DATA_REVALIDATE_SECONDS },
      }),
      fetch(`${protocol}://${host}/api/configs/questions`, {
        next: { revalidate: GAME_DATA_REVALIDATE_SECONDS },
      }),
    ]);

    if (!gameConfigResponse.ok || !questionsConfigResponse.ok) {
      throw new Error("Failed to fetch game configs.");
    }

    const [gameConfig, questionsConfig] = (await Promise.all([
      gameConfigResponse.json(),
      questionsConfigResponse.json(),
    ])) as [GameConfig, QuestionsConfig];

    return prepareGameData(gameConfig, questionsConfig);
  },
  ["prepared-game-data"],
  { revalidate: GAME_DATA_REVALIDATE_SECONDS },
);

export async function getGameData() {
  try {
    const headersList = await headers();
    const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") ?? "http";

    if (!host) {
      throw new Error("Unable to resolve host for config fetch requests.");
    }

    const { rewards, questionsByRange } = await getPreparedGameDataCached(
      protocol,
      host,
    );
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
