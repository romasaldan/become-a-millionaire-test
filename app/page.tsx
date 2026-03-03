import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { Button } from "../libs/components/Button";

export default function Home() {
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
            <div className={styles.cta}>
              <Link href="/game" className={styles.ctaLink}>
                <Button>Start</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
