export type LengthItem = {
  label: string;
  value: number;
};

export type AttemptsItem = {
  label: string;
  value: number;
};

export type DifficultyItem = {
  label: string;
  value: Difficulty;
};

export type Difficulty = "easy" | "medium" | "hard";
