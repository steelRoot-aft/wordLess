"use client";

import { BonusBtn } from "@/components/bonus/BonusBtn";
import { ComponentTitle } from "@/components/ComponentTitle";
import { SessionProviders } from "@/providers/SessionProviders";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const Bonus = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  if (!session) return null;

  return (
    <article className="font-pixels">
      <div className="grid border-2 p-3">
        <ComponentTitle title="Бонус" isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={`grid gap-y-2 overflow-hidden duration-700 ${isOpen ? `max-h-100 pt-3` : "max-h-0"}`}
        >
          <SessionProviders>
            {/* Первый бонус */}
            <BonusBtn label="Открыть первую букву" price={25} opt="first" />
            {/* Второй бонус */}
            <BonusBtn label="Открыть последнюю букву" price={15} opt="last" />
            {/* Третий бонус */}
            <BonusBtn label="Открыть все буквы" price={55} opt="all" />
            {/* Четвертый бонус */}
            <BonusBtn label="Открыть случайную букву" price={10} opt="random" />
          </SessionProviders>
        </div>
      </div>
    </article>
  );
};
