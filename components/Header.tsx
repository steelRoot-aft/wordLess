"use client";
import { signIn } from "next-auth/react";

export const Header = () => {
  return (
    <header className="px-3 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-jersey pointer-events-none text-5xl">
          WordLess | Game
        </h1>
        <div className="">
          <button onClick={() => signIn("google", { callbackUrl: "/" })}>
            Войти
          </button>
        </div>
      </div>
    </header>
  );
};
