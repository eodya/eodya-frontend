export function SnsBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: React.ReactNode;
}) {
  return (
    <div
      className={`relative flex h-11 w-11 flex-none items-center justify-center ${className ? className : ""}`}
    >
      {children}
    </div>
  );
}
