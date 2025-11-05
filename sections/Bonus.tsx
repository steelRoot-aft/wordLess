import { BonusBtn } from "@/components/bonus/BonusBtn";
import { ComponentTitle } from "@/components/ComponentTitle";
import { SessionProviders } from "@/providers/SessionProviders";

export const Bonus = () => {
  return (
    <article className="font-pixels">
      <div className="grid gap-y-5 border-2 p-3">
        <ComponentTitle title="Бонус" />
        <div className="grid gap-y-2">
          <SessionProviders>
            {/* Первый бонус */}
            <BonusBtn label="Открыть первую букву" price={25} opt="first" />
            {/* Второй бонус */}
            <BonusBtn label="Открыть последнюю букву" price={15} opt="last" />
            {/* Третий бонус */}
            <BonusBtn label="Открыть все буквы" price={55} opt="all" />
          </SessionProviders>
        </div>
      </div>
    </article>
  );
};
