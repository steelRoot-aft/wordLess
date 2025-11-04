"use client";

import { useActionStore } from "@/store/useActionStore";
import { GameOverProps } from "@/types/modal";

export const GameOver = () => {

  const {reset, isVictory, word} = useActionStore()

  return (
    <article className="fixed top-0 left-0 grid h-full w-full grid-cols-[minmax(auto,400px)] items-center justify-center bg-black/70">
      <div className="flex grid flex-col gap-y-5 rounded-lg bg-white p-3">
        <h2 className="text-center text-5xl font-bold text-black sm:text-6xl">
          {isVictory ? "Победа!" : "Поражение!"}
        </h2>
        <p className="text-xl text-black">
          Верное слово: <span className="capitalize">{word}</span>
        </p>
        <button
          className="h-15 rounded-sm bg-black text-2xl duration-300 hover:opacity-70 sm:h-20"
          onClick={reset}
        >
          Заново
        </button>
      </div>
    </article>
  );
};
