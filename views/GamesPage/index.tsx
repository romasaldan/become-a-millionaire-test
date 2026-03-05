"use client";

import { GameStateLadder } from "./components/GameStateLadder";
import { OptionsList } from "./components/OptionsList";
import { ToggleButton } from "../../shared/components/ToggleButton";
import { ConfirmModal } from "../../shared/components/ConfirmModal";
import { useToggle } from "../../shared/hooks/useToggle";
import { useRefreshGuard } from "../../shared/hooks/useRefreshGuard";
import type { Question } from "@/shared/types/game";
import styles from "./index.module.css";
import { useGameEngine } from "./useGameEngine";
import classNames from "classnames";

type GamesPageProps = {
  rewards: number[];
  questions: Question[];
};

export default function GamesPage(props: GamesPageProps) {
  const { rewards, questions } = props;
  const { isOpen: isLadderOpen, toggle: toggleLadder } = useToggle(false);
  const {
    currentQuestion,
    questionState,
    selectedOptions,
    onOptionClick,
    currentQuestionIndex,
  } = useGameEngine(questions, rewards);
  const { showRefreshModal, confirmRefresh, cancelRefresh } = useRefreshGuard();

  return (
    <div className={styles.page}>
      {showRefreshModal && (
        <ConfirmModal
          title="Leave the game?"
          description="Your progress will be lost if you refresh the page."
          confirmLabel="Refresh"
          cancelLabel="Stay"
          onConfirm={confirmRefresh}
          onCancel={cancelRefresh}
        />
      )}
      <main className={classNames(styles.main, styles.gameLayout)}>
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
              <OptionsList
                options={currentQuestion?.options}
                onOptionClick={onOptionClick}
                selectedOptions={selectedOptions}
                isAnswered={questionState !== "inProgress"}
              />
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
