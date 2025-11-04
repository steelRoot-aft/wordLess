import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { SessionProviders } from "@/providers/SessionProviders";
import { GameField } from "@/sections/GameField";
import { Settings } from "@/sections/Settings";

export default function Home() {
  return (
    <main className="grid h-full grid-rows-[auto_1fr]">
      <SessionProviders>
        <Header />
      </SessionProviders>
      <div className="grid py-10 justify-center md:grid-cols-[repeat(3,1fr)] items-center gap-5 px-3">
        <Settings />
        <GameField />
      </div>
    </main>
  );
}
