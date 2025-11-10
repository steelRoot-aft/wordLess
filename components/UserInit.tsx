"use client";

import { useUserStore } from "@/store/useUserStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const UserInit = () => {
  const { data: session } = useSession();
  const { setCoins, setInitialUser } = useUserStore();

  useEffect(() => {
    if (!session?.user) return;

    setInitialUser();
    if (session?.user.coins) {
      setCoins(session.user.coins);
    }
  }, [session?.user.coins]);

  return null;
};
