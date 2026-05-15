import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "tight" | "default" | "wide";
}) {
  const max =
    size === "tight" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-6xl";
  return (
    <div className={cn("mx-auto px-5 md:px-8", max, className)}>{children}</div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  variant = "accent",
  className,
}: {
  children: React.ReactNode;
  variant?: "accent" | "muted";
  className?: string;
}) {
  return (
    <span
      className={cn(variant === "accent" ? "eyebrow" : "eyebrow-muted", className)}
    >
      {children}
    </span>
  );
}
