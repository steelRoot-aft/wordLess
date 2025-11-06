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
    <article className="flex justify-center">
      <div className="grid gap-y-3">
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
