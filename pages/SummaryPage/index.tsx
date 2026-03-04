import Image from "next/image";
import { SummaryContent } from "./components/SummaryContent";
import styles from "./index.module.css";

export default function SummaryPage() {
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
          <SummaryContent />
        </div>
      </main>
    </div>
  );
}
