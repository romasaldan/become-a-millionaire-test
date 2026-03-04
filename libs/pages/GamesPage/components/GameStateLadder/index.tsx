import type { HTMLAttributes } from "react";

import { QuestionLevelChip, QuestionLevelState } from "../QuestionLevelChip";
import styles from "./index.module.css";

export type GameStateLadderProps = {
  rewards: number[];
  currentQuestionIndex: number;
} & HTMLAttributes<HTMLDivElement>;

export const MAP_VALUE_TO_STATE: Record<string, QuestionLevelState> = {
  "-1": "future",
  0: "current",
  1: "answered",
};

export function GameStateLadder(props: GameStateLadderProps) {
  const { rewards, currentQuestionIndex } = props;
  console.log(rewards, currentQuestionIndex);

  return (
    <div className={styles.container}>
      {rewards.map((reward, questionIndex) => {
        const state =
          MAP_VALUE_TO_STATE[Math.sign(currentQuestionIndex - questionIndex)];

        return (
          <QuestionLevelChip key={questionIndex} state={state}>
            {"$"}
            {reward.toLocaleString()}
          </QuestionLevelChip>
        );
      })}
    </div>
  );
}
