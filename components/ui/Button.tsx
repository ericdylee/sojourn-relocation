import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";

export function Button({ variant = "primary", className = "", ...props }:
  { variant?: Variant } & ComponentProps<"a">) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-6 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500";
  const styles = variant === "primary"
    ? "bg-steel-500 text-white hover:bg-navy-900"
    : "bg-transparent text-navy-900 ring-1 ring-navy-900/20 hover:bg-navy-900/5";
  return <a className={`${base} ${styles} ${className}`} {...props} />;
}
