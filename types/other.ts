import { Difficulty } from "@/lib/generated/enums";
import { AppRouter } from "@/lib/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type HistoryItem = {
  words: string[];
}[];

export type SetLengthSettingsProps = {
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
};

export type SetAttemptsSettingsProps = {
  attempts: number;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
};

export type SetDifficultySettingsProps = {
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
};

export type InfoTrProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  onClick?: () => void;
  inputName?: string | null;
  setInputName?: React.Dispatch<React.SetStateAction<string | null>>;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type InfoDataItem =
  inferRouterOutputs<AppRouter>["user"]["getOtherInfo"];
