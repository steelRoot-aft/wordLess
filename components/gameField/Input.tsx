"use client";

import { useActionStore } from "@/store/useActionStore";
import { useBonusStore } from "@/store/useBonusStore";
import { InputBlockProps } from "@/types/input";
import React, { useRef, useState } from "react";

export const Input = () => {
  const { inputs, updateInput, word } = useActionStore();
  const { openWord } = useBonusStore();

  const length = word ? word.length : 0;

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const arr = Array.from({ length });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    e.preventDefault();

    updateInput(i, e.target.value);

    inputRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number,
  ) => {
    if (e.key === "Backspace") {
      if (inputs[i]) {
        // если в текущем input есть символ — просто очищаем
        updateInput(i, "");
        // НЕ смещаем фокус!
      } else if (i > 0) {
        // если текущий пустой — смещаем фокус
        inputRef.current[i - 1]?.focus();
        updateInput(i, "");
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      inputRef.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      inputRef.current[i + 1]?.focus();
    }
  };

  return (
    <article className="grid gap-y-3">
      {openWord.length > 0 && (
        <div className="flex justify-center gap-2">
          {arr.map((char, i) => (
            <span
              key={i}
              className="flex aspect-square w-11 items-center justify-center bg-gray-400 text-2xl font-bold uppercase duration-700 sm:w-15 sm:text-4xl"
            >
              {openWord.find((el) => el.position === i)?.char || ""}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-center gap-2">
        {arr.map((char, i) => (
          <input
            key={i}
            value={inputs[i] || ""}
            ref={(el) => {
              inputRef.current[i] = el;
            }}
            minLength={1}
            maxLength={1}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="aspect-square w-11 min-w-0 border-2 text-center text-2xl font-black uppercase sm:w-15 sm:text-4xl"
          />
        ))}
      </div>
    </article>
  );
};
