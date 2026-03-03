"use client";

import classNames from "classnames";
import type { HTMLAttributes } from "react";

import { OptionChip, type OptionState } from "../OptionChip";
import styles from "./index.module.css";

export type OptionListItem = {
  id: string;
  text: string;
  state?: OptionState;
  disabled?: boolean;
};

export type OptionsListProps = {
  options: OptionListItem[];
  onOptionClick?: (id: string) => void;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function OptionsList(props: OptionsListProps) {
  const { options, onOptionClick, className, ...restProps } = props;

  return (
    <div
      className={classNames(styles.optionsList, className)}
      {...restProps}
      aria-label={props["aria-label"] ?? "Answer options"}
    >
      {options.map((option) => (
        <div key={option.id} className={styles.optionWrapper}>
          <OptionChip
            label={option.id}
            state={option.state}
            disabled={option.disabled}
            onClick={
              onOptionClick ? () => onOptionClick(option.id) : undefined
            }
          >
            {option.text}
          </OptionChip>
        </div>
      ))}
    </div>
  );
}

