"use client";

import { InfoTypeBtnProps } from "@/types/button";

export const Buttons = ({ typeInfo, setTypeInfo }: InfoTypeBtnProps) => {
  return (
    <div className="grid gap-1 sm:grid-cols-[1fr_1fr]">
      <button
        className={`btn-info ${typeInfo === "personal" ? "bg-gray-400 hover:bg-gray-500" : "bg-gray-600"}`}
        onClick={() => setTypeInfo("personal")}
      >
        Личная статистика
      </button>
      <button
        className={`btn-info ${typeInfo === "general" ? "bg-gray-400 hover:bg-gray-500" : "bg-gray-600"}`}
        onClick={() => setTypeInfo("general")}
      >
        Общая статистика
      </button>
    </div>
  );
};
