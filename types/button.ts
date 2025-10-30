import { HistoryItem } from "./other";

export type ButtonsBlockProps = {
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  history: HistoryItem;
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem>>;
  attempts: number
  length: number
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>
  setIsVictory: React.Dispatch<React.SetStateAction<boolean>>
  word: string
};

