import { HistoryItem } from "./other";

export type GameOverProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isVicroty: boolean;
  setIsVictory: React.Dispatch<React.SetStateAction<boolean>>;
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem>>;
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  setWord: React.Dispatch<React.SetStateAction<string | null>>;
  word: string | null;
};
