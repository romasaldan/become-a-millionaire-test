import Link from "next/link";
import { OptionChip } from "../../libs/components/OptionChip";
import { QuestionLevelChip } from "../../libs/components/QuestionLevelChip";
import styles from "../page.module.css";

export default function GamePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Game</h1>
          <p>This is where the game will run.</p>
        </div>

        <section aria-label="Sample question progress" style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <QuestionLevelChip state="answered">$1,000,000</QuestionLevelChip>
            <QuestionLevelChip state="current">$1,000,000</QuestionLevelChip>
            <QuestionLevelChip state="future">$1,000,000</QuestionLevelChip>
          </div>
        </section>

        <section aria-label="Sample question">
          <p style={{ marginBottom: 12 }}>What is the capital of France?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <OptionChip label="A" state="inactive">
              Berlin
            </OptionChip>
            <OptionChip label="B" state="selected">
              Madrid
            </OptionChip>
            <OptionChip label="C" state="correct">
              Paris
            </OptionChip>
            <OptionChip label="D" state="wrong">
              Rome
            </OptionChip>
          </div>
        </section>

        <div className={styles.ctas}>
          <Link className={styles.secondary} href="/">
            Back to Start
          </Link>
          <Link className={styles.primary} href="/summary">
            Go to Summary
          </Link>
        </div>
      </main>
    </div>
  );
}

