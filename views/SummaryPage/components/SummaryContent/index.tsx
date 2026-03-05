"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button";
import styles from "./index.module.css";
import { useAppStore } from "@/shared/hooks/useAppStore";
import { useEffect } from "react";

export function SummaryContent() {
  const router = useRouter();
  const { userReward, gameInProgress, setUserReward } = useAppStore();

  function handleTryAgain() {
    router.push("/game");
    setUserReward(0);
  }

  useEffect(() => {
    if (!gameInProgress) {
      router.push("/");
    }
  }, [router, gameInProgress]);

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
