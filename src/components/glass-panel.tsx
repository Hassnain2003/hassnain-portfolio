export function GlassPanel({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "sm" | "lg" | "raised";
}) {
  const variantClasses = {
    default: "glass-panel",
    sm: "glass-panel-sm",
    lg: "glass-panel-lg",
    raised: "glass-raised p-7",
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}