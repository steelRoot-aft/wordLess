"use client";

export const ComponentProvoders = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) => {
  return (
    <article className="font-pixels grid">
      <div
        className={`grid border-2 p-3 duration-300 ${isOpen ? "bg-gray-400/50" : "bg-transparent"}`}
      >
        {children}
      </div>
    </article>
  );
};
