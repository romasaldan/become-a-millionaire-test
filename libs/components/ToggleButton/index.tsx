import Image from "next/image";
import styles from "./ToggleButton.module.css";

type ToggleButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
  openIconSrc?: string;
  closedIconSrc?: string;
  ariaLabelOpen?: string;
  ariaLabelClosed?: string;
};

export function ToggleButton(props: ToggleButtonProps) {
  const {
    isOpen,
    onToggle,
    openIconSrc = "/close.svg",
    closedIconSrc = "/hamburger.svg",
    ariaLabelOpen = "Hide question progress",
    ariaLabelClosed = "Show question progress",
  } = props;

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        type="button"
        aria-label={isOpen ? ariaLabelOpen : ariaLabelClosed}
        onClick={onToggle}
      >
        <Image
          src={isOpen ? openIconSrc : closedIconSrc}
          alt="Toggle"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
