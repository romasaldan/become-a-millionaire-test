"use client";

import classNames from "classnames";
import type { HTMLAttributes } from "react";

import { OptionChip } from "../OptionChip";
import styles from "./index.module.css";
import { QuestionOption } from "@/libs/types/game";

export type OptionsListProps = {
  options: QuestionOption[];
  onOptionClick?: (index: number) => void;
  className?: string;
  selectedOptions: number[];
  isAnswered: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function OptionsList(props: OptionsListProps) {
  const {
    options,
    onOptionClick,
    className,
    selectedOptions,
    isAnswered,
    ...restProps
  } = props;
  const isSelected = (index: number) => selectedOptions.includes(index);

  return (
    <div
      className={classNames(styles.optionsList, className)}
      {...restProps}
      aria-label={props["aria-label"] ?? "Answer options"}
    >
      {options.map((option, index) => (
        <div key={option.id} className={styles.optionWrapper}>
          <OptionChip
            label={option.id}
            isAnswered={isAnswered}
            isSelected={isSelected(index)}
            onClick={() => onOptionClick?.(index)}
            option={option}
          >
            {option.text}
          </OptionChip>
        </div>
      ))}
    </div>
  );
}
