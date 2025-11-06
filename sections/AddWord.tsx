"use client";

import { ComponentTitle } from "@/components/ComponentTitle";
import { Difficulty } from "@/lib/generated/enums";
import { vanillaTrpcClient } from "@/lib/trpc/vanillaClient";
import { ComponentProvoders } from "@/providers/ComponentProvoders";
import { HiddenProvider } from "@/providers/HiddenProvider";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const AddWord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputWord, setInputWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDifficult, setSelectedDifficult] = useState<Difficulty>(
    Difficulty.EASY,
  );

  const { data: session } = useSession();

  const handleAddWord = async () => {
    setLoading(true);
    // Проверка на длину слова больше 7
    if (inputWord.length > 7) {
      alert("Длина слова не должна превышать 7 букв");
      setLoading(false);
      setInputWord("");
      return;
    }
    // Проверка на длину слова меньше 3
    if (inputWord.length < 3) {
      alert("Длина слова не должна быть меньше 3 букв");
      setLoading(false);
      setInputWord("");
      return;
    }
    // Проверка на русские буквы и спецсимволы
    if (/[^а-яё]/gi.test(inputWord)) {
      alert("Должны быть только русские буквы цифр, спецсимволов и прбелов");
      setLoading(false);
      setInputWord("");
      return;
    }

    try {
      const formatText = inputWord.replace(/[^а-яё]/gi, "");

      await vanillaTrpcClient.user.addWord.mutate({
        word: formatText.toLowerCase(),
        difficulty: selectedDifficult,
      });

      alert(
        "Слово успешно добавлено! Как только оно будет проверено, оно будет доступно в списке слов!",
      );

      setInputWord("");
      setSelectedDifficult(Difficulty.EASY);
      setIsOpen(false);
      return;
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        if (error.message === "Word already exists") {
          alert("Такое слово уже существует!");
        }
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const difficultys: { value: Difficulty; label: string }[] = [
    { value: Difficulty.EASY, label: "Легко" },
    { value: Difficulty.MEDIUM, label: "Средне" },
    { value: Difficulty.HARD, label: "Сложно" },
  ];

  if (!session) return null;

  return (
    <ComponentProvoders isOpen={isOpen}>
      <ComponentTitle
        title="Добавить слово"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <HiddenProvider isOpen={isOpen} className="text-xs sm:text-base">
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          placeholder="Введите слово"
          className="bg-black-900 border-2 p-2"
        />
        <div className="flex gap-1">
          {difficultys.map((item) => (
            <button
              key={item.value}
              onClick={() => setSelectedDifficult(item.value)}
              className={`text-black-900 flex-1 p-2 duration-300 ${item.value === selectedDifficult ? "scaling text-black-900 bg-white" : "bg-black-900 text-white-50 hover:bg-gray-700"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          className="btn-settings"
          onClick={handleAddWord}
          disabled={loading}
        >
          {loading ? "Загрузка..." : "Добавить"}
        </button>
      </HiddenProvider>
    </ComponentProvoders>
  );
};
