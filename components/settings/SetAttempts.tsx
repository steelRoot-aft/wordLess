import { SetAttemptsSettingsProps } from "@/types/other";
import { AttemptsItem } from "@/types/settings";

export const SetAttempts = ({
  attempts,
  setAttempts,
}: SetAttemptsSettingsProps) => {
  // Количество попыток
  const attemptsData: AttemptsItem[] = [
    { label: "3", value: 3 },
    { label: "5", value: 5 },
    { label: "7", value: 7 },
    { label: "9", value: 9 },
  ];

  return (
    <section className="flex items-end justify-between gap-3 text-xs">
      <h4>Количество попыток:</h4>
      <div className="flex gap-x-1">
        {attemptsData.map((item) => (
          <button
            key={item.label}
            className={`aspect-square w-5 duration-300 ${item.value === attempts ? "scaling text-black-900 bg-white" : "bg-black-900 text-white-50 hover:bg-gray-700"}`}
            onClick={() => setAttempts(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
};
