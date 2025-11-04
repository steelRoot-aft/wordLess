"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { CircleDollarSign } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isOpenModla, setIsOpenModla] = useState(false);

  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="font-pixels border-b-2 border-gray-400 px-3 py-5">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h1 className="pointer-events-none mx-auto text-xl sm:mx-0 sm:text-3xl">
          WordLess|Game
        </h1>
        {session.data ? (
          <div
            className="relative mx-auto flex cursor-pointer items-center gap-x-3 sm:mx-0"
            onClick={() => setIsOpenModla(!isOpenModla)}
          >
            <div className="flex items-center gap-x-1 border-r-2 pr-3">
              <CircleDollarSign size={15} />
              <span className="text-xs">{user?.coins}</span>
            </div>
            <h6 className="text-xs sm:text-sm">{user?.name}</h6>
            {isOpenModla && (
              <button
                className="btn-sign absolute top-full right-0 z-100 w-full translate-y-2"
                onClick={() => signOut()}
              >
                Выйти
              </button>
            )}
          </div>
        ) : (
          <div className="">
            <button
              className="btn-sign"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Войти
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
