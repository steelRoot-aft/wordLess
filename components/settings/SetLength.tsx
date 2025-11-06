"use client";

import { SetLengthSettingsProps } from "@/types/other";
import { LengthItem } from "@/types/settings";

export const SetLength = ({ setLength, length }: SetLengthSettingsProps) => {
  // Длинна слова
  const lengthData: LengthItem[] = [
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
  ];

  return (
    <section className="flex items-end justify-between gap-3 text-xs">
      <h4>Длинна слова:</h4>
      <div className="flex gap-1">
        {lengthData.map((item) => (
          <button
            key={item.label}
            className={`aspect-square w-5 duration-300 ${item.value === length ? "scaling text-black-900 bg-white" : "bg-black-900 text-white-50 hover:bg-gray-700"}`}
            onClick={() => setLength(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
};
