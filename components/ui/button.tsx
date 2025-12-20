"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#eeac1d]/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            // Variants
            "bg-[#ffc34d] text-black hover:bg-[#eeac1d]": variant === "primary",
            "bg-[#2c2c2c] text-white hover:bg-[#3c3c3c]": variant === "secondary",
            "border-2 border-[#eeac1d] text-[#d8d8d8] hover:bg-[#eeac1d]/10": variant === "outline",
            "text-[#a5a4a4] hover:text-white hover:bg-[#2c2c2c]": variant === "ghost",
            // Sizes
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

