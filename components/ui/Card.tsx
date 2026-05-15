import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white p-6 md:p-8 shadow-soft",
        hover && "transition-shadow hover:shadow-lift",
        className
      )}
    >
      {children}
    </div>
  );
}
