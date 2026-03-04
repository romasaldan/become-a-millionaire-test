"use client";

import { useEffect } from "react";
import { Button } from "../Button";
import styles from "./ConfirmModal.module.css";

type ConfirmModalProps = {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal(props: ConfirmModalProps) {
  const {
    title,
    description,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
  } = props;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <Button
            className={styles.cancelButton}
            onClick={onCancel}
            autoFocus
          >
            {cancelLabel}
          </Button>
          <Button className={styles.confirmButton} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
