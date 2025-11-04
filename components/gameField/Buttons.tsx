"use client";

import { useActionStore } from "@/store/useActionStore";
import { useState } from "react";

export const Buttons = () => {
  const [disabled, setDisabled] = useState(false);

  const { check, reset } = useActionStore();

  // const handleReset = () => {
  //   setInputs([""]);
  //   setHistory([]);
  //   setDisabled(false);
  //   setWord(null);
  // };

  // const handleCheck = () => {
  //   if (inputs.length !== length) return alert("Введите все буквы!");

  //   if (inputs.join("") === word) {
  //     setIsVictory(true);
  //     setIsGameOver(true);
  //     return;
  //   }

  //   setHistory((prev) => [...prev, { words: inputs }]);
  //   setInputs([""]);

  //   if (history.length + 1 >= attempts) {
  //     setDisabled(true);
  //     setIsGameOver(true);
  //   }
  // };

  return (
    <article className="grid grid-cols-2 gap-2">
      <button
        onClick={() => check(setDisabled)}
        disabled={disabled}
        className={`h-10 border-1 border-white bg-gray-700 text-white duration-300 hover:bg-gray-800 active:bg-gray-900 ${
          disabled ? "opacity-50" : ""
        }`}
      >
        Проверить
      </button>
      <button
        onClick={reset}
        className="h-10 border-1 border-white bg-gray-700 text-white duration-300 hover:bg-gray-800 active:bg-gray-900"
      >
        Заново
      </button>
    </article>
  );
};
