import { UseUserStoreActions } from "@/types/store";
import { create } from "zustand";

export const useUserStore = create<UseUserStoreActions>((set, get) => ({
  coins: 0,
  setCoins: (coins) => set({ coins }),
}));
