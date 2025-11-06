import { Role } from "@/lib/generated/enums";
import { vanillaTrpcClient } from "@/lib/trpc/vanillaClient";
import { UseUserStoreActions } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<UseUserStoreActions>()(
  persist(
    (set, get) => ({
      id: null,
      name: null,
      email: null,
      avatar: null,
      createdAt: null,
      role: Role.USER,
      coins: 0,
      wins: 0,
      losses: 0,
      games: 0,
      score: 0,
      words: 0,

      setCoins: (coins) => set({ coins }),
      setInitialUser: async () => {
        const result = await vanillaTrpcClient.user.getUserInfo.query();

        set({ ...result, words: result?.words.length });
      },
      setName: (name) => set({ name }),
    }),
    {
      name: "user",
    },
  ),
);
