import { useAppStore } from "@/shared/hooks/useAppStore";
import type { Question } from "@/shared/types/game";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type QuestionState = "inProgress" | "incorrect" | "correct";

export function useGameEngine(questions: Question[], rewards: number[]) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionState, setQuestionState] =
    useState<QuestionState>("inProgress");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const currentQuestion = questions[currentQuestionIndex];
  const correctOptionsAmount = currentQuestion?.options.filter(
    (option) => option.isCorrect,
  ).length;
  const { setUserReward, setGameInProgress } = useAppStore();
  const router = useRouter();

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

      if (currentQuestionIndex > 0) {
        setUserReward(rewards[currentQuestionIndex - 1]);
      }

      setGameInProgress(false);
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
      } else {
        router.push("/summary");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [questionState, router]);

  return {
    currentQuestion,
    correctOptionsAmount,
    questionState,
    selectedOptions,
    onOptionClick,
    currentQuestionIndex,
  };
}
