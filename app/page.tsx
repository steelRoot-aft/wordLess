import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { UserInit } from "@/components/UserInit";
import { SessionProviders } from "@/providers/SessionProviders";
import { Bonus } from "@/sections/Bonus";
import { GameField } from "@/sections/GameField";
import { Settings } from "@/sections/Settings";

export default function Home() {
  return (
    <SessionProviders>
      <main className="grid h-full grid-rows-[auto_1fr]">
        <Header />
        <UserInit />
        <div className="grid items-start justify-center gap-5 px-3 py-10 md:grid-cols-[repeat(3,1fr)]">
          <div className="grid gap-y-2">
            <Bonus />
            <Settings />
          </div>
          <GameField />
        </div>
      </main>
    </SessionProviders>
  );
}
