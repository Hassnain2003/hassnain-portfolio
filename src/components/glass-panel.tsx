export function GlassPanel({
  children,
  className = "",
  padding = "p-6",
}: {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}) {
  return (
    <div
      className={`glass ${padding} ${className}`}
    >
      {children}
    </div>
  );
}