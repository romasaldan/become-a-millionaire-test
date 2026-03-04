import { useContext } from "react";
import { StoreContext } from "../context/StoreProvider";

export function useAppStore() {
  return useContext(StoreContext);
}
