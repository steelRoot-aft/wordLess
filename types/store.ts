import { HistoryItem } from "./other";
import { Difficulty } from "./settings";

export type UseActionStoreItem = {
  isGameOver: boolean;
  isVictory: boolean;
  lengthW: number;
  difficulty: Difficulty;
  word: string | null;
  inputs: string[];
  attempts: number;
  history: HistoryItem;
};

export type UseActionStoreActions = UseActionStoreItem & {
  setIsGameOver: (isGameOver: boolean) => void;
  setIsVictory: (isVictory: boolean) => void;
  setWord: () => void;
  setAttempts: (attempts: number) => void;
  updateInput: (index: number, value: string) => void;

  reset: () => void;
  check: (setDisabled: React.Dispatch<React.SetStateAction<boolean>>) => void;
  setSettings: (lengthW: number, attempts: number, difficulty: Difficulty) => void;
  resetSettings: () => void;
};
