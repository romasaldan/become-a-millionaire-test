import type { Question } from "@/libs/types/game";
import { useEffect, useState } from "react";

type QuestionState = "inProgress" | "incorrect" | "correct";

export function useGameEngine(questions: Question[]) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionState, setQuestionState] =
    useState<QuestionState>("inProgress");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const currentQuestion = questions[currentQuestionIndex];
  const correctOptionsAmount = currentQuestion?.options.filter(
    (option) => option.isCorrect,
  ).length;

  const onOptionClick = (optionId: number) => {
    if (
      selectedOptions.includes(optionId) ||
      selectedOptions.length === correctOptionsAmount
    ) {
      return;
    }
    const newSelectedOptions = [...selectedOptions, optionId];
    const isCorrectAnswer = currentQuestion?.options[optionId].isCorrect;

    if (isCorrectAnswer) {
      setQuestionState(
        correctOptionsAmount === newSelectedOptions.length
          ? "correct"
          : "inProgress",
      );
    } else {
      setQuestionState("incorrect");
    }

    setSelectedOptions(newSelectedOptions);
  };

  useEffect(() => {
    if (questionState === "inProgress") {
      return;
    }

    const timeout = setTimeout(() => {
      if (questionState === "correct") {
        setCurrentQuestionIndex((prev) => prev + 1);
        setQuestionState("inProgress");
        setSelectedOptions([]);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [questionState]);

  return {
    currentQuestion,
    correctOptionsAmount,
    questionState,
    selectedOptions,
    onOptionClick,
    currentQuestionIndex,
  };
}
