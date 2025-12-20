"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "gold";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-[#2c2c2c] text-[#a5a4a4]": variant === "default",
          "bg-[#1dee4a]/20 text-[#1dee4a]": variant === "success",
          "bg-[#f97316]/20 text-[#f97316]": variant === "warning",
          "bg-[#ef4444]/20 text-[#ef4444]": variant === "danger",
          "bg-[#eeac1d]/20 text-[#eeac1d]": variant === "gold",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

