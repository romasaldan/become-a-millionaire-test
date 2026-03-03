import GamesPage from "../../libs/pages/GamesPage";
import questionsConfig from "../../configs/questions.json";

export default function GameRoutePage() {
  const rewards = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000,
    250000, 500000, 1000000,
  ];
  const questions = [...questionsConfig.questions].sort(
    (left, right) => left.complexity - right.complexity
  );

  return <GamesPage rewards={rewards} questions={questions} />;
}
