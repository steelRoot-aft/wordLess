import { UseActionStoreActions } from "@/types/store";
import { create } from "zustand";

export const useActionStore = create<UseActionStoreActions>((set, get) => ({
  isGameOver: false,
  isVictory: false,
  word: null,
  inputs: [],
  attempts: 5,
  history: [],

  setIsGameOver: (isGameOver) => set({ isGameOver }),
  setIsVictory: (isVictory) => set({ isVictory }),
  setWord: (word) => set({ word }),
  setAttempts: (attempts) => set({ attempts }),
  updateInput: (index, value) =>
    set((state) => {
      const newInputs = [...state.inputs];
      newInputs[index] = value;

      return { inputs: newInputs };
    }),
  reset: () =>
    set({
      isGameOver: false,
      isVictory: false,
      word: null,
      inputs: [],
      attempts: 5,
      history: [],
    }),
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
}));
