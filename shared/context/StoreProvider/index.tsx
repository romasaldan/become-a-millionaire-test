"use client";
import { createContext, useState } from "react";

type StoreContextType = {
  userReward: number;
  setUserReward: (reward: number) => void;
  gameInProgress: boolean;
  setGameInProgress: (inProgress: boolean) => void;
};

export const StoreContext = createContext<StoreContextType>({
  userReward: 0,
  setUserReward: () => {},
  gameInProgress: false,
  setGameInProgress: () => {},
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [userReward, setUserReward] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);

  const value = {
    userReward,
    setUserReward,
    gameInProgress,
    setGameInProgress,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
