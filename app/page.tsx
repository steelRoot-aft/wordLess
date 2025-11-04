import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { GameField } from "@/sections/GameField";
import { Settings } from "@/sections/Settings";

export default function Home() {
  return (
    <main className="grid">
      <Header />
      <div className="grid grid-cols-[repeat(3,1fr)]">
        <Settings />
        <GameField />
      </div>
    </main>
  );
}
