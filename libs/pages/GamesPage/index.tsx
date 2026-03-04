"use client";

import { useState } from "react";
import { GameStateLadder } from "./components/GameStateLadder";
import { OptionsList } from "./components/OptionsList";
import { ToggleButton } from "../../components/ToggleButton";
import { useToggle } from "../../hooks/useToggle";
import type { Question } from "@/libs/types/game";
import styles from "./index.module.css";

type GamesPageProps = {
  rewards: number[];
  questions: Question[];
};

export default function GamesPage(props: GamesPageProps) {
  const { rewards, questions } = props;
  const { isOpen: isLadderOpen, toggle: toggleLadder } = useToggle(false);
  const [currentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.page}>
      <main className={`${styles.main} ${styles.gameLayout}`}>
        <div className={styles.mobileToggle}>
          <ToggleButton
            isOpen={isLadderOpen}
            onToggle={toggleLadder}
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
              <OptionsList options={currentQuestion?.options} />
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
