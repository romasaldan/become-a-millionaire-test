"use client";

import classNames from "classnames";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Hexagon } from "./Hexagon";
import styles from "./index.module.css";
import { QuestionOption } from "@/shared/types/game";
import { getOptionState } from "../../utils/getOptionState";

export type OptionChipProps = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  isAnswered?: boolean;
  isSelected?: boolean;
  option: QuestionOption;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function OptionChip(props: OptionChipProps) {
  const {
    label,
    children,
    className,
    isAnswered,
    isSelected,
    option,
    ...buttonProps
  } = props;

  const optionsState = getOptionState(isAnswered, isSelected, option.isCorrect);
  const stateClass =
    styles[`option-${optionsState}` as keyof typeof styles] ??
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
