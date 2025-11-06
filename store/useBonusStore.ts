import { vanillaTrpcClient } from "@/lib/trpc/vanillaClient";
import { UseBonusStoreActions } from "@/types/store";
import { create } from "zustand";
import { useActionStore } from "./useActionStore";

export const useBonusStore = create<UseBonusStoreActions>((set, get) => ({
  openWord: [],
  setBonus: async (opt, setLoading) => {
    const word = useActionStore.getState().word;
    const { openWord } = get();
    if (!word) return;

    if (openWord.length >= word.length)
      return alert("Вы уже открыли все бонусы");

    setLoading(true);

    try {
      if (opt === "first") {
        const result = await vanillaTrpcClient.bonus.openFirst.mutate({
          word,
          alreadyOpened: openWord.map((char) => char.char),
        });

        set((state) => ({
          openWord: [
            ...state.openWord,
            {
              char: result.bonusChar,
              position: 0,
              isOpen: true,
            },
          ],
        }));

        return result;
      }
      if (opt === "last") {
        const result = await vanillaTrpcClient.bonus.openLast.mutate({
          word,
          alreadyOpened: openWord.map((char) => char.char),
        });

        set((state) => ({
          openWord: [
            ...state.openWord,
            {
              char: result.bonusChar,
              position: word.length - 1,
              isOpen: true,
            },
          ],
        }));

        return result;
      }
      if (opt === "all") {
        const result = await vanillaTrpcClient.bonus.openAll.mutate({
          word,
          alreadyOpened: openWord.map((char) => char.char),
        });

        set({
          openWord: result.bonusChar.map((char, index) => ({
            char,
            position: index,
            isOpen: true,
          })),
        });

        return result;
      }
      if (opt === "random") {
        const result = await vanillaTrpcClient.bonus.openRandom.mutate({
          word,
          alreadyOpened: openWord.map((char) => char.char),
        });

        const findPosition = word.indexOf(result.bonusChar);

        set((state) => ({
          openWord: [
            ...openWord,
            {
              char: result.bonusChar,
              position: findPosition,
              isOpen: true,
            },
          ],
        }));

        return result;
      }
    } catch (error) {
      alert("Ошибка при покупке бонуса или бонус уже куплен!");
      console.error(`Ошибка при покупке бонуса: ${error}`);
    } finally {
      setLoading(false);
    }
  },
  setOpenWord: (openWord) => set({ openWord }),
}));
