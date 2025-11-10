"use client";
import { Buttons } from "@/components/info/Buttons";
import { GeneralInfo } from "@/components/info/GeneralInfo";
import { PersonalInfo } from "@/components/info/PersonalInfo";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const Info = () => {
  const [typeInfo, setTypeInfo] = useState<"personal" | "general">("general");
  const { data: session } = useSession();

  return (
    <article className="font-pixels grid">
      <div className="flex flex-col gap-y-3 border-2 p-3">
        {session && <Buttons typeInfo={typeInfo} setTypeInfo={setTypeInfo} />}
        {typeInfo === "general" && <GeneralInfo />}
        {typeInfo === "personal" && session && <PersonalInfo />}
      </div>
    </article>
  );
};
