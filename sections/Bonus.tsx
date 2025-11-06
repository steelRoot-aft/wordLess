"use client";

import { BonusBtn } from "@/components/bonus/BonusBtn";
import { ComponentTitle } from "@/components/ComponentTitle";
import { ComponentProvoders } from "@/providers/ComponentProvoders";
import { HiddenProvider } from "@/providers/HiddenProvider";
import { SessionProviders } from "@/providers/SessionProviders";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const Bonus = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  if (!session) return null;

  return (
    <ComponentProvoders isOpen={isOpen}>
      <ComponentTitle title="Бонус" isOpen={isOpen} setIsOpen={setIsOpen} />
      <HiddenProvider isOpen={isOpen}>
        {/* Первый бонус */}
        <BonusBtn label="Открыть первую букву" price={25} opt="first" />
        {/* Второй бонус */}
        <BonusBtn label="Открыть последнюю букву" price={15} opt="last" />
        {/* Третий бонус */}
        <BonusBtn label="Открыть все буквы" price={55} opt="all" />
        {/* Четвертый бонус */}
        <BonusBtn label="Открыть случайную букву" price={10} opt="random" />
      </HiddenProvider>
    </ComponentProvoders>
  );
};
