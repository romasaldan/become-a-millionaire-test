import GamesPage from "../../views/GamesPage";
import { getGameData } from "./game-data";

export const dynamic = "force-dynamic";

export default async function GameRoutePage() {
  const { rewards, questions } = await getGameData();

  return <GamesPage rewards={rewards} questions={questions} />;
}
