"use client";

import { ComponentTitle } from "@/components/ComponentTitle";
import { useActionStore } from "@/store/useActionStore";
import {
  AttemptsItem,
  Difficulty,
  DifficultyItem,
  LengthItem,
} from "@/types/settings";
import { useState } from "react";

export const Settings = () => {
  const [length, setLength] = useState(5); // Длинна слова
  const [attempts, setAttempts] = useState(5); // Количество попыток
  const [difficulty, setDifficulty] = useState<Difficulty>("medium"); // Сложность
  const [isOpen, setIsOpen] = useState(false);

  const { setSettings, resetSettings } = useActionStore();

  // Длинна слова
  const lengthData: LengthItem[] = [
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
  ];
  // Количество попыток
  const attemptsData: AttemptsItem[] = [
    { label: "3", value: 3 },
    { label: "5", value: 5 },
    { label: "7", value: 7 },
    { label: "9", value: 9 },
  ];
  // Сложность
  const difficultyData: DifficultyItem[] = [
    { label: "Легко", value: "easy" },
    { label: "Средне", value: "medium" },
    { label: "Сложно", value: "hard" },
  ];

  return (
    <article className="font-pixels grid">
      <div className="grid border-2 p-3">
        <ComponentTitle
          title="Настройки"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div
          className={`grid gap-y-3 overflow-hidden duration-700 ${isOpen ? "max-h-100 pt-3" : "max-h-0"}`}
        >
          <div className="grid gap-y-3">
            {/* Длинна слова */}
            <section className="flex items-end justify-between gap-3 text-xs">
              <h4>Длинна слова:</h4>
              <div className="flex gap-1">
                {lengthData.map((item) => (
                  <button
                    key={item.label}
                    className={`text-black-900 aspect-square w-5 duration-30 ${item.value === length ? "scaling bg-white" : "0 bg-gray-400 hover:bg-gray-500"}`}
                    onClick={() => setLength(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </section>
            {/* Количество попыток */}
            <section className="flex items-end justify-between gap-3 text-xs">
              <h4>Количество попыток:</h4>
              <div className="flex gap-x-1">
                {attemptsData.map((item) => (
                  <button
                    key={item.label}
                    className={`text-black-900 aspect-square w-5 duration-30 ${item.value === attempts ? "scaling bg-white" : "0 bg-gray-400 hover:bg-gray-500"}`}
                    onClick={() => setAttempts(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </section>
            {/* Сложность слова */}
            <section className="flex flex-col gap-y-1 text-xs">
              <h4>Сложность слова:</h4>
              <div className="flex gap-1">
                {difficultyData.map((item) => (
                  <button
                    key={item.label}
                    className={`text-black-900 h-7 flex-1 px-1 text-xs duration-30 ${item.value === difficulty ? "scaling bg-white" : "0 bg-gray-400 hover:bg-gray-500"}`}
                    onClick={() => setDifficulty(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </section>
          </div>
          <div className="grid gap-1 sm:grid-cols-[repeat(2,1fr)]">
            <button
              className="btn-settings"
              onClick={() => setSettings(length, attempts, difficulty)}
            >
              Применить
            </button>
            <button className="btn-settings" onClick={() => resetSettings()}>
              Сбросить
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
