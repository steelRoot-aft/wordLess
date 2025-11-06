import { Difficulty } from "@/lib/generated/enums";
import { SetDifficultySettingsProps } from "@/types/other";
import { DifficultyItem } from "@/types/settings";

export const SetDifficulty = ({
  difficulty,
  setDifficulty,
}: SetDifficultySettingsProps) => {
  // Сложность
  const difficultyData: DifficultyItem[] = [
    { label: "Легко", value: Difficulty.EASY },
    { label: "Средне", value: Difficulty.MEDIUM },
    { label: "Сложно", value: Difficulty.HARD },
  ];

  return (
    <section className="flex flex-col gap-y-1 text-xs">
      <h4>Сложность слова:</h4>
      <div className="flex gap-1">
        {difficultyData.map((item) => (
          <button
            key={item.label}
            className={`h-7 flex-1 px-1 text-xs duration-300 ${item.value === difficulty ? "scaling text-black-900 bg-white" : "bg-black-900 text-white-50 hover:bg-gray-700"}`}
            onClick={() => setDifficulty(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
};
