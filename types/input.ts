import { Difficulty } from "@/lib/generated/enums";

export type InputBlockProps = {
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  length: number;
}

export type CustomSelectAddWordProps = {
  selectedDifficult: Difficulty;
  setSelectedDifficult: React.Dispatch<React.SetStateAction<Difficulty>>;
};