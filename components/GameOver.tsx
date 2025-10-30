"use client";

import { GameOverProps } from "@/types/modal";

export const GameOver = ({
  isOpen,
  setIsOpen,
  isVicroty,
  setIsVictory,
  setInputs,
  setHistory,
  setWord,
  word,
}: GameOverProps) => {
  const handleReset = () => {
    setInputs([""]);
    setHistory([]);
    setWord(null);
    setIsVictory(false);
    setIsOpen(false);
  };

  return (
    <article className="fixed top-0 left-0 grid h-full w-full grid-cols-[minmax(auto,400px)] items-center justify-center bg-black/70">
      <div className="flex grid flex-col gap-y-5 rounded-lg bg-white p-3">
        <h2 className="text-center text-5xl font-bold text-black sm:text-6xl">
          {isVicroty ? "Победа!" : "Поражение!"}
        </h2>
        <p className="text-xl text-black">
          Верное слово: <span className="capitalize">{word}</span>
        </p>
        <button
          className="h-15 rounded-sm bg-black text-2xl duration-300 hover:opacity-70 sm:h-20"
          onClick={handleReset}
        >
          Заново
        </button>
      </div>
    </article>
  );
};
