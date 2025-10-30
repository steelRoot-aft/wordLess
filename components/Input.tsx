"use client";

import { InputBlockProps } from "@/types/input";
import React, { useRef, useState } from "react";

export const Input = ({ inputs, setInputs, length }: InputBlockProps) => {
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const arr = Array.from({ length });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    e.preventDefault();

    setInputs((prev) => {
      const newInput = [...prev];
      newInput[i] = e.target.value.toLowerCase();
      return newInput;
    });

    inputRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number,
  ) => {
    if (e.key === "Backspace") {
      if (inputs[i]) {
        // если в текущем input есть символ — просто очищаем
        setInputs((prev) => {
          const arr = [...prev];
          arr[i] = "";
          return arr;
        });
        // НЕ смещаем фокус!
      } else if (i > 0) {
        // если текущий пустой — смещаем фокус
        inputRef.current[i - 1]?.focus();
        setInputs((prev) => {
          const arr = [...prev];
          arr[i - 1] = ""; // еще можно сразу очистить предыдущий
          return arr;
        });
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      inputRef.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      inputRef.current[i + 1]?.focus();
    }
  };

  return (
    <article>
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
            className="aspect-square w-10 min-w-0 border-2 text-center text-2xl font-black uppercase sm:w-15 sm:text-4xl"
          />
        ))}
      </div>
    </article>
  );
};
