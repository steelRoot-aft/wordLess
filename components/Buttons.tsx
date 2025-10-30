"use client";

import { ButtonsBlockProps } from "@/types/button";
import { useState } from "react";

export const Buttons = ({
  inputs,
  history,
  attempts,
  word,
  length,
  setIsGameOver,
  setInputs,
  setHistory,
  setIsVictory,
}: ButtonsBlockProps) => {
  const [disabled, setDisabled] = useState(false);

  const handleReset = () => {
    setInputs([""]);
    setHistory([]);
    setDisabled(false);
  };

  const handleCheck = () => {
    if (inputs.length !== length) return alert("Введите все буквы!");

    if (inputs.join("") === word) {
      setIsVictory(true);
      setIsGameOver(true);
      return;
    }

    setHistory((prev) => [...prev, { words: inputs }]);
    setInputs([""]);

    if (history.length + 1 >= attempts) {
      setDisabled(true);
    }
  };

  return (
    <article className="grid grid-cols-2 gap-2">
      <button
        onClick={handleCheck}
        disabled={disabled}
        className={`h-10 border-1 border-white bg-gray-700 text-white duration-300 hover:bg-gray-800 active:bg-gray-900 ${
          disabled ? "opacity-50" : ""
        }`}
      >
        Проверить
      </button>
      <button
        onClick={handleReset}
        className="h-10 border-1 border-white bg-gray-700 text-white duration-300 hover:bg-gray-800 active:bg-gray-900"
      >
        Заново
      </button>
    </article>
  );
};
