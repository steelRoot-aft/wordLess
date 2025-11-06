export const HiddenProvider = ({
  isOpen,
  children,
  className,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`grid gap-y-3 overflow-hidden duration-700 ${isOpen ? "max-h-100 pt-3" : "max-h-0"} ${className}`}
    >
      {children}
    </div>
  );
};
