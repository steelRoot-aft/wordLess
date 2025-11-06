"use client";

import { BonusBtnProps } from "@/types/button";
import { CircleDollarSign } from "lucide-react";
import { useBonusStore } from "@/store/useBonusStore";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";

export const BonusBtn = ({ label, opt, price }: BonusBtnProps) => {
  const [loading, setLoading] = useState(false);

  const { setBonus } = useBonusStore();
  const { setCoins } = useUserStore();

  const handleBuyBonus = async () => {
    const result = await setBonus(opt, setLoading);

    setCoins(result.coins);
  };

  return (
    <div className="grid grid-cols-[3fr_1fr] gap-2">
      <button
        className="btn-bonus"
        onClick={() => handleBuyBonus()}
        disabled={loading}
      >
        {loading ? "Покупка..." : label}
      </button>
      <span className="flex items-center justify-center gap-x-1 bg-yellow-600 px-3 text-xs sm:text-base">
        {price}
        <CircleDollarSign size={17} />
      </span>
    </div>
  );
};
