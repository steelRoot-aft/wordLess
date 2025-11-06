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
  setWord: React.Dispatch<React.SetStateAction<string | null>>
};


export type BonusBtnProps = {
  label: string;
  price: number
  opt: "first" | "last" | "all" | "random";
}

export type ComponentTitleProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type InfoTypeBtnProps = {
  typeInfo: 'personal' | 'general';
  setTypeInfo: React.Dispatch<React.SetStateAction<'personal' | 'general'>>
};