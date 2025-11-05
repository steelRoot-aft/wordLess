"use client";

import { BonusBtnProps } from "@/types/button";
import { CircleDollarSign } from "lucide-react";
import { useBonusStore } from "@/store/useBonusStore";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/useUserStore";

export const BonusBtn = ({ label, opt, price }: BonusBtnProps) => {
  const { setBonus } = useBonusStore();
  const { setCoins } = useUserStore();

  const handleBuyBonus = async () => {
    const result = await setBonus(opt);

    setCoins(result.coins);
  };

  return (
    <div className="grid grid-cols-[3fr_1fr] gap-2">
      <button className="btn-bonus" onClick={() => handleBuyBonus()}>
        {label}
      </button>
      <span className="flex items-center sm:text-base justify-center gap-x-1 bg-yellow-600 px-3 text-xs">
        {price}
        <CircleDollarSign size={17} />
      </span>
    </div>
  );
};
