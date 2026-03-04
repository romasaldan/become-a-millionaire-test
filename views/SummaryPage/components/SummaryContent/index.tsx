"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button";
import styles from "./index.module.css";
import { useAppStore } from "@/shared/hooks/useAppStore";

export function SummaryContent() {
  const router = useRouter();
  const { userReward, setGameInProgress } = useAppStore();

  function handleTryAgain() {
    setGameInProgress(true);
    router.push("/game");
  }

  return (
    <div className={styles.content}>
      <span className={styles.label}>Total score:</span>
      <span className={styles.score}>${userReward} earned</span>
      <div className={styles.cta}>
        <Button onClick={handleTryAgain}>Try again</Button>
      </div>
    </div>
  );
}
