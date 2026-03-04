import Link from "next/link";
import { Button } from "@/shared/components/Button";
import styles from "./not-found.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.content}>
            <p className={styles.kicker}>404</p>
            <h1 className={styles.title}>This question does not exist</h1>
            <p className={styles.description}>
              The page you requested is missing. Return to the start and try a
              different path.
            </p>
            <div className={styles.ctas}>
              <Button href="/game">Start game</Button>
              <Link href="/" className={styles.secondaryLink}>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
