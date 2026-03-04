"use client";

import Link from "next/link";
import { Button } from "@/shared/components/Button";
import styles from "./index.module.css";
import { useAppStore } from "@/shared/hooks/useAppStore";

export function StartGameButton() {
  const { setGameInProgress } = useAppStore();

  return (
    <div className={styles.cta}>
      <Link href="/game" className={styles.ctaLink} onClick={() => setGameInProgress(true)}>
        <Button>Start</Button>
      </Link>
    </div>
  );
}
