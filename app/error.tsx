"use client";

import { Button } from "@/shared/components/Button";
import styles from "./error.module.css";

type AppErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function AppErrorPage(props: AppErrorPageProps) {
  const { error, reset } = props;

  const handleReload = () => {
    reset();
    window.location.reload();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.content}>
          <p className={styles.kicker}>Something went wrong</p>
          <h1 className={styles.title}>Unable to load this page</h1>
          <p className={styles.description}>
            An unexpected error occurred. Please reload the page and try again.
          </p>
          <div className={styles.cta}>
            <Button onClick={handleReload}>Reload page</Button>
          </div>
          <p className={styles.errorDetails}>{error.message}</p>
        </div>
      </main>
    </div>
  );
}
