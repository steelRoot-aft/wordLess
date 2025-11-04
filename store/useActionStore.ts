import prisma from "@/lib/prisma";
import { RUWORDS } from "@/public/russian";
import { UseActionStoreActions } from "@/types/store";
import { create } from "zustand";

export const useActionStore = create<UseActionStoreActions>((set, get) => ({
  isGameOver: false,
  isVictory: false,
  word: null,
  inputs: [],
  attempts: 5,
  history: [],
  lengthW: 5,
  difficulty: "medium",

  setIsGameOver: (isGameOver) => set({ isGameOver }),
  setIsVictory: (isVictory) => set({ isVictory }),
  setWord: () => {
    const { lengthW, difficulty } = get();
    const filtered = RUWORDS.filter(
      (w) => w.length === lengthW && w.difficulty === difficulty,
    );
    const randomWord = filtered[Math.floor(Math.random() * filtered.length)];

    if (!randomWord) {
      return alert("Слова с такими параметрами не нашлось!");
    }

    set({ word: randomWord.word.toLowerCase() });
  },
  setAttempts: (attempts) => set({ attempts }),
  updateInput: (index, value) =>
    set((state) => {
      const newInputs = [...state.inputs];
      newInputs[index] = value;

      return { inputs: newInputs };
    }),
  reset: () => {
    set({
      isGameOver: false,
      isVictory: false,
      inputs: [],
      history: [],
    });
    get().setWord();
  },
  check: (setDisabled) => {
    const { inputs, word, attempts, history } = get();
    if (!word) return;
    if (inputs.length !== word?.length) {
      return alert("Введите все буквы!");
    }

    if (inputs.join("") === word) {
      set({ isVictory: true, isGameOver: true });

      return;
    }

    set((prev) => ({
      history: [...prev.history, { words: inputs }],
      inputs: [""],
    }));

    if (history.length + 1 >= attempts) {
      set({ isGameOver: true });
      setDisabled(true);
    }
  },
  setSettings: (lengthW, attempts, difficulty) => {
    set({
      lengthW,
      attempts,
      difficulty,
      isGameOver: false,
      isVictory: false,
      inputs: [],
      history: [],
    });
    get().setWord();
  },
  resetSettings: () => {
    set({
      attempts: 5,
      lengthW: 5,
      difficulty: "medium",
      inputs: [],
      history: [],
      isGameOver: false,
      isVictory: false,
    });
    get().setWord();
  },
}));
