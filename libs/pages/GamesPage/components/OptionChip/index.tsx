"use client";

import classNames from "classnames";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Hexagon } from "./Hexagon";
import styles from "./index.module.css";

export type OptionState = "inactive" | "selected" | "correct" | "wrong";

export type OptionChipProps = {
  label: ReactNode;
  children: ReactNode;
  state?: OptionState;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function OptionChip(props: OptionChipProps) {
  const {
    label,
    children,
    state = "inactive",
    className,
    ...buttonProps
  } = props;

  const stateClass =
    styles[`option-${state}` as keyof typeof styles] ??
    styles["option-inactive"];

  return (
    <button
      type="button"
      className={classNames(styles.option, stateClass, className)}
      {...buttonProps}
    >
      <Hexagon
        className={styles.hexagon}
        stroke="var(--option-stroke)"
        fill="var(--option-fill)"
        aria-hidden="true"
      />
      <span className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.text}>{children}</span>
      </span>
    </button>
  );
}
