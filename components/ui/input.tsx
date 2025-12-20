"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#a5a4a4] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "w-full px-4 py-3 bg-[#2c2c2c] rounded-xl",
              "text-white placeholder:text-white/50",
              "border border-transparent",
              "focus:outline-none focus:border-[#eeac1d]/50",
              "transition-colors duration-200",
              error && "border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

