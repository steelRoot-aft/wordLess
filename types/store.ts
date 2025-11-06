import { Difficulty, Role } from "@/lib/generated/enums";
import { HistoryItem } from "./other";

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
  check: () => void;
  setSettings: (
    lengthW: number,
    attempts: number,
    difficulty: Difficulty,
  ) => void;
  resetSettings: () => void;
};

export type UseBonusStoreItem = {
  openWord: {
    char: string;
    position: number;
    isOpen: boolean;
  }[];
};

export type UseBonusStoreActions = UseBonusStoreItem & {
  setOpenWord: (openWord: UseBonusStoreItem["openWord"]) => void;
  setBonus: (
    opt: "first" | "last" | "all" | "random",
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => Promise<any>;
};

export type UseUserStoreItem = {
  id: string | null;
  coins: number;
  name: string | null;
  email: string | null;
  avatar: string | null;
  role: Role;
  createdAt: Date | null;
  words: number;
  wins: number;
  losses: number;
  games: number;
  score: number;
};

export type UseUserStoreActions = UseUserStoreItem & {
  setCoins: (coins: number) => void;
  setInitialUser: () => void;
  setName: (name: string) => void;
};
