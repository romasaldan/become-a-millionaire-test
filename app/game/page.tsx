import Link from "next/link";
import styles from "../page.module.css";

export default function GamePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Game</h1>
          <p>This is where the game will run.</p>
        </div>
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

