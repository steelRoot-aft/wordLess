"use client";

import { useActionStore } from "@/store/useActionStore";

export const Result = () => {
  const { attempts, history, word } = useActionStore();

  const length = word ? word.length : 0;

  const getColors = (guess: string[], answer: string[]) => {
    const colors = Array(guess.length).fill("gray");
    const used = Array(answer.length).fill(false);

    // Green pass
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === answer[i]) {
        colors[i] = "green";
        used[i] = true;
      }
    }

    // Yellow pass
    for (let i = 0; i < guess.length; i++) {
      if (colors[i] !== "green") {
        const idx = answer.findIndex(
          (char, j) => char === guess[i] && !used[j],
        );
        if (idx !== -1) {
          colors[i] = "yellow";
          used[idx] = true;
        }
      }
    }

    return colors;
  };

  return (
    <article className="grid">
      <div className="grid justify-center gap-2">
        {Array.from({ length: attempts }).map((_, i) => (
          <div key={i} className="flex gap-2">
            {Array.from({ length }).map((_, j) => {
              const currentWord = history[i]?.words[j];
              const currentGuess = history[i]?.words || [""];
              const colors = getColors(currentGuess, word!.split(""));

              return (
                <div
                  key={j}
                  className={`flex aspect-square w-11 items-center justify-center text-2xl font-bold uppercase duration-700 sm:w-15 sm:text-4xl ${
                    colors[j] === "green"
                      ? "scaling bg-green-600"
                      : colors[j] === "yellow"
                        ? "scaling bg-yellow-400 text-black"
                        : "bg-gray-400"
                  } `}
                >
                  {currentWord}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </article>
  );
};
