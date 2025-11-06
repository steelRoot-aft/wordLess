import { ComponentTitleProps } from "@/types/button";
import { ChevronDown } from "lucide-react";

export const ComponentTitle = ({
  title,
  isOpen,
  setIsOpen,
}: ComponentTitleProps) => {
  return (
    <button
      className={`flex items-center justify-between ${isOpen ? "border-b-2 pb-3" : "border-none pb-0"}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <h2 className="underline underline-offset-2">{title}</h2>
      <ChevronDown className={`duration-300 ${isOpen && "rotate-180"}`} />
    </button>
  );
};
