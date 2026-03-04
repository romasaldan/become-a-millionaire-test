import Image from "next/image";
import styles from "./index.module.css";
import { StartGameButton } from "./components/StartGameButton";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.illustration}>
            <Image
              src="/hand.svg"
              alt="Thumbs up with sparkles"
              fill
              priority
              sizes="(min-width: 768px) 320px, 60vw"
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>Who wants to be a millionaire?</h1>
            <StartGameButton />
          </div>
        </div>
      </main>
    </div>
  );
}
