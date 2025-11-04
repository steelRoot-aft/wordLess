import { HistoryItem } from "./other";

export type UseActionStoreItem = {
  isGameOver: boolean;
  isVictory: boolean;
  word: string | null;
  inputs: string[];
  attempts: number;
  history: HistoryItem;
};

export type UseActionStoreActions = UseActionStoreItem & {
  setIsGameOver: (isGameOver: boolean) => void;
  setIsVictory: (isVictory: boolean) => void;
  setWord: (word: string | null) => void;
  setAttempts: (attempts: number) => void;
  updateInput: (index: number, value: string) => void;

  reset: () => void;
  check: (setDisabled: React.Dispatch<React.SetStateAction<boolean>>) => void;
};
