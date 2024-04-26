export function GridLayout({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className={`relative p-4 ${index !== 0 ? "after:absolute after:left-1/2 after:top-0 after:block after:h-[1px] after:w-[calc(328/360*100%)] after:-translate-x-1/2 after:bg-gray-100" : ""}`}
    >
      {children}
    </div>
  );
}
