import Link from "next/link";
import { GameStateLadder } from "../../libs/components/GameStateLadder";
import { OptionsList } from "../../libs/components/OptionsList";
import styles from "../page.module.css";

export default function GamePage() {
  const sampleOptions = [
    { id: "A", text: "Berlin", state: "inactive" as const },
    { id: "B", text: "Madrid", state: "selected" as const },
    { id: "C", text: "Paris", state: "correct" as const },
    { id: "D", text: "Rome", state: "wrong" as const },
  ];

  // Example rewards and current question index, using the same
  // reward values as in the sample game-config.json.
  const sampleRewards = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000,
    250000, 500000, 1000000,
  ];
  const currentQuestionIndex = 7;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Game</h1>
          <p>This is where the game will run.</p>
        </div>

        <section
          aria-label="Sample question progress"
          style={{ marginBottom: 24 }}
        >
          <GameStateLadder
            rewards={sampleRewards}
            currentQuestionIndex={currentQuestionIndex}
          />
        </section>

        <section aria-label="Sample question">
          <p style={{ marginBottom: 12 }}>What is the capital of France?</p>
          <OptionsList options={sampleOptions} />
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

