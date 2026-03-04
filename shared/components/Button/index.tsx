"use client";

import classNames from "classnames";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { children, className } = props;
  const classes = classNames(styles.button, className);

  if ("href" in props && props.href) {
    const { href } = props;

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}

