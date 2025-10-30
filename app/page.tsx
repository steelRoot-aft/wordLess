"use client";

import { Buttons } from "@/components/Buttons";
import { Input } from "@/components/Input";
import { Result } from "@/components/Result";
import { Title } from "@/components/Title";
import { HistoryItem } from "@/types/other";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RUWORDS } from "@/public/russian";
import { Loading } from "@/components/Loading";
import { GameOver } from "@/components/GameOver";

export default function Home() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [word, setWord] = useState<string | null>(null);
  const [inputs, setInputs] = useState([""]);
  const [attempts, setAttempts] = useState(5);
  const [history, setHistory] = useState<HistoryItem>([]);

  useEffect(() => {
    if (word !== null) return;
    const randomWord = RUWORDS[Math.floor(Math.random() * RUWORDS.length)];

    setWord(randomWord.toLowerCase());
  }, [word]);

  console.log(word);

  return (
    <main className="grid h-full grid-cols-[minmax(auto,auto)] items-center justify-center">
      <div className="flex flex-col gap-y-5 sm:rounded-lg sm:border-2 px-3 sm:px-10 py-3">
        <Title />
        {word ? (
          <>
            <Input inputs={inputs} setInputs={setInputs} length={word.length} />
            <Result
              attempts={attempts}
              length={word.length}
              history={history}
              words={word}
            />
            <Buttons
              inputs={inputs}
              setInputs={setInputs}
              history={history}
              setHistory={setHistory}
              attempts={attempts}
              length={word?.length}
              setIsGameOver={setIsGameOver}
              setIsVictory={setIsVictory}
              word={word}
            />
          </>
        ) : (
          <Loading />
        )}
      </div>
      {isGameOver && (
        <GameOver
          isOpen={isGameOver}
          word={word}
          isVicroty={isVictory}
          setIsOpen={setIsGameOver}
          setIsVictory={setIsVictory}
          setInputs={setInputs}
          setHistory={setHistory}
          setWord={setWord}
        />
      )}
    </main>
  );
}
