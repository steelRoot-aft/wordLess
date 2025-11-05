import prisma from "@/lib/prisma";
import { vanillaTrpcClient } from "@/lib/trpc/vanillaClient";
import { RUWORDS } from "@/public/russian";
import { UseActionStoreActions } from "@/types/store";
import { create } from "zustand";
import { useBonusStore } from "./useBonusStore";
import { useUserStore } from "./useUserStore";

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
      newInputs[index] = value.toLowerCase();

      return { inputs: newInputs };
    }),
  reset: () => {
    const setOpenWord = useBonusStore.getState().setOpenWord;

    set({
      isGameOver: false,
      isVictory: false,
      inputs: [],
      history: [],
    });

    setOpenWord([]);
    get().setWord();
  },
  check: async () => {
    const { inputs, word, attempts, history, difficulty } = get();
    const setOpenWord = useBonusStore.getState().setOpenWord;
    const setCoins = useUserStore.getState().setCoins;

    if (!word) return;

    if (inputs.length !== word?.length) {
      return alert("Введите все буквы!");
    }

    if (inputs.join("").toLowerCase() === word.toLowerCase()) {
      try {
        set({ isVictory: true, isGameOver: true });
        const result = await vanillaTrpcClient.user.addCoin.mutate({
          difficulty,
        });
        setCoins(result.coins);
        setOpenWord([]);
      } catch (error) {
        console.error(error);
      }

      return;
    }

    set((prev) => ({
      history: [...prev.history, { words: inputs }],
      inputs: [""],
    }));

    if (history.length + 1 >= attempts) {
      set({ isGameOver: true });
      setOpenWord([]);
    }
  },
  setSettings: (lengthW, attempts, difficulty) => {
    const setOpenWord = useBonusStore.getState().setOpenWord;

    set({
      lengthW,
      attempts,
      difficulty,
      isGameOver: false,
      isVictory: false,
      inputs: [],
      history: [],
    });
    setOpenWord([]);
    get().setWord();
  },
  resetSettings: () => {
    const setOpenWord = useBonusStore.getState().setOpenWord;

    set({
      attempts: 5,
      lengthW: 5,
      difficulty: "medium",
      inputs: [],
      history: [],
      isGameOver: false,
      isVictory: false,
    });
    setOpenWord([]);
    get().setWord();
  },
}));
