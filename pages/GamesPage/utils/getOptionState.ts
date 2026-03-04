export type OptionState = "inactive" | "selected" | "correct" | "wrong";

export function getOptionState(
  isAnswered: boolean | undefined,
  isOpened: boolean | undefined,
  isCorrect: boolean,
): OptionState {
  if (!isOpened) return "inactive";
  if (!isAnswered) return "selected";

  return isCorrect ? "correct" : "wrong";
}
