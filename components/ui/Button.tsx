import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group/btn";

const variants: Record<Variant, string> = {
  primary:
    "bg-ocean-600 text-white shadow-soft hover:bg-ocean-700 hover:shadow-lift active:translate-y-px ring-1 ring-inset ring-white/10",
  secondary:
    "bg-brass-300 text-ocean-700 shadow-soft hover:bg-brass-400 active:translate-y-px",
  ghost: "text-ocean-700 hover:bg-ocean-50",
  outline:
    "border border-line bg-white text-ocean-700 hover:bg-ocean-50 hover:border-ocean-200",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
