"use client";

import { Check, Pen } from "lucide-react";
import { Tr } from "./Tr";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import { vanillaTrpcClient } from "@/lib/trpc/vanillaClient";

export const PersonalInfo = () => {
  const { name, email, games, score, wins, losses, words, setName } =
    useUserStore();

  const [isEdit, setIsEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [inputName, setInputName] = useState<string | null>(name);

  const handleChangeName = async () => {
    if (!inputName) return;
    if (!isEdit) return;

    const filteredName = inputName.replace(/[^a-zA-Zа-яА-Я ]/g, "");

    if (filteredName.length > 30)
      return alert("Длина имени не должна превышать 30 символов");

    if (filteredName.length < 3)
      return alert("Длина имени не должна быть меньше 3 символов");

    setLoading(true);

    try {
      const result = await vanillaTrpcClient.user.changeName.mutate({
        name: filteredName,
      });
      alert("Имя успешно изменено");

      setName(result.name);
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка");
    } finally {
      setIsEdit(false);
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="grid gap-y-3">
        <h2>Личная информация</h2>
        <table className="w-full table-auto border-collapse text-[0.6rem]">
          <tbody>
            <Tr
              label="Имя"
              value={name!}
              icon={isEdit ? <Check /> : <Pen />}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              onClick={handleChangeName}
              inputName={inputName}
              setInputName={setInputName}
            />
            <Tr label="Email" value={email!} />
            <Tr label="Игр" value={games} />
            <Tr label="Очков" value={score} />
            <Tr label="Побед" value={wins} />
            <Tr label="Поражений" value={losses} />
            <Tr label="Слов" value={words} />
          </tbody>
        </table>
      </div>
    </section>
  );
};
