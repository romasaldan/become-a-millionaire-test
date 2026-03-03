import Link from "next/link";
import styles from "../page.module.css";

export default function SummaryPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Game Summary</h1>
          <p>Here you will see the results of the game.</p>
        </div>
        <div className={styles.ctas}>
          <Link className={styles.secondary} href="/game">
            Back to Game
          </Link>
          <Link className={styles.primary} href="/">
            Back to Start
          </Link>
        </div>
      </main>
    </div>
  );
}

