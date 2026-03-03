"use client";

import { useState } from "react";
import { GameStateLadder } from "./components/GameStateLadder";
import { OptionsList } from "./components/OptionsList";
import { ToggleButton } from "../../components/ToggleButton";
import styles from "./index.module.css";

type GameQuestionOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type GameQuestion = {
  id: number;
  text: string;
  complexity: number;
  options: GameQuestionOption[];
};

type GamesPageProps = {
  rewards: number[];
  questions: GameQuestion[];
};

export default function GamesPage(props: GamesPageProps) {
  const { rewards, questions } = props;
  const [isLadderOpen, setIsLadderOpen] = useState(false);
  const [currentQuestionIndex] = useState(7);
  const currentQuestion = questions[currentQuestionIndex] ?? questions[0];
  const currentOptions =
    currentQuestion?.options.map((option) => ({
      id: option.id,
      text: option.text,
    })) ?? [];

  return (
    <div className={styles.page}>
      <main className={`${styles.main} ${styles.gameLayout}`}>
        <div className={styles.mobileToggle}>
          <ToggleButton
            isOpen={isLadderOpen}
            onToggle={() => setIsLadderOpen((open) => !open)}
            ariaLabelOpen="Hide question progress"
            ariaLabelClosed="Show question progress"
          />
        </div>
        <div className={styles.gameContent}>
          <section
            className={styles.questionSection}
            aria-label="Current question"
          >
            <p className={styles.questionText}>
              {currentQuestion?.text ??
                "Questions are not available right now."}
            </p>
            <div className={styles.optionsWrapper}>
              <OptionsList options={currentOptions} />
            </div>
          </section>
        </div>

        <aside
          aria-label="Sample question progress"
          className={`${styles.ladderOverlay} ${
            isLadderOpen ? styles.ladderOverlayOpen : ""
          }`}
        >
          <div className={styles.ladderContainer}>
            <GameStateLadder
              rewards={rewards}
              currentQuestionIndex={currentQuestionIndex}
            />
          </div>
        </aside>
      </main>
    </div>
  );
}
