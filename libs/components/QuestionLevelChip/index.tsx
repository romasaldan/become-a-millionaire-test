"use client";

import classNames from "classnames";
import type { HTMLAttributes, ReactNode } from "react";

import { Hexagon } from "./Hexagon";
import styles from "./index.module.css";

export type QuestionLevelState = "answered" | "current" | "future";

export type QuestionLevelChipProps = {
  children: ReactNode;
  state?: QuestionLevelState;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function QuestionLevelChip(props: QuestionLevelChipProps) {
  const { children, state = "future", className, ...rest } = props;

  const stateClass =
    styles[`chip-${state}` as keyof typeof styles] ?? styles["chip-future"];

  return (
    <div className={classNames(styles.chip, stateClass, className)} {...rest}>
      <Hexagon
        className={styles.hexagon}
        stroke="var(--chip-stroke)"
        fill="var(--chip-fill)"
        aria-hidden="true"
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

