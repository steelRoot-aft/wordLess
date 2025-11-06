"use client";

import { ComponentTitle } from "@/components/ComponentTitle";
import { SetAttempts } from "@/components/settings/SetAttempts";
import { SetDifficulty } from "@/components/settings/SetDifficulty";
import { SetLength } from "@/components/settings/SetLength";
import { Difficulty } from "@/lib/generated/enums";
import { ComponentProvoders } from "@/providers/ComponentProvoders";
import { HiddenProvider } from "@/providers/HiddenProvider";
import { useActionStore } from "@/store/useActionStore";
import { AttemptsItem, DifficultyItem, LengthItem } from "@/types/settings";
import { useState } from "react";

export const Settings = () => {
  const [length, setLength] = useState(5); // Длинна слова
  const [attempts, setAttempts] = useState(5); // Количество попыток
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM); // Сложность
  const [isOpen, setIsOpen] = useState(false);

  const { setSettings, resetSettings } = useActionStore();

  return (
    <ComponentProvoders isOpen={isOpen}>
      <ComponentTitle title="Настройки" isOpen={isOpen} setIsOpen={setIsOpen} />
      <HiddenProvider isOpen={isOpen}>
        <div className="grid gap-y-3">
          {/* Длинна слова */}
          <SetLength length={length} setLength={setLength} />
          {/* Количество попыток */}
          <SetAttempts attempts={attempts} setAttempts={setAttempts} />
          {/* Сложность слова */}
          <SetDifficulty
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </div>
        <div className="grid gap-1 sm:grid-cols-[repeat(2,1fr)]">
          <button
            className="btn-settings"
            onClick={() => {
              setSettings(length, attempts, difficulty);
              setIsOpen(false);
            }}
          >
            Применить
          </button>
          <button className="btn-settings" onClick={() => resetSettings()}>
            Сбросить
          </button>
        </div>
      </HiddenProvider>
    </ComponentProvoders>
  );
};
