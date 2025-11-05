"use client";

import { useEffect, useState } from "react";

import { Buttons } from "@/components/gameField/Buttons";
import { Input } from "@/components/gameField/Input";
import { Result } from "@/components/gameField/Result";
import { Loading } from "@/components/gameField/Loading";
import { GameOver } from "@/components/gameField/GameOver";
import { useActionStore } from "@/store/useActionStore";

export const GameField = () => {
  const { setWord, word, isGameOver } = useActionStore();

  useEffect(() => {
    setWord();
  }, []);

  return (
    <article className="grid">
      <div className="flex flex-col gap-y-5 px-3 py-3 sm:px-10">
        {word ? (
          <>
            <Input />
            <Result />
            <Buttons />
          </>
        ) : (
          <Loading />
        )}
      </div>
      {isGameOver && <GameOver />}
    </article>
  );
};
