"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ExecutiveKPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down";
  trendValue?: string;
  icon?: React.ReactNode;
  color?: "gold" | "green" | "red" | "blue";
  className?: string;
}

export function ExecutiveKPICard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  color = "gold",
  className,
}: ExecutiveKPICardProps) {
  const colorMap = {
    gold: "text-[#eeac1d]",
    green: "text-[#1dee4a]",
    red: "text-[#ef4444]",
    blue: "text-[#3b82f6]",
  };

  return (
    <div
      className={cn(
        "bg-[#1e1e1e] rounded-xl p-4 flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#a5a4a4]">{title}</p>
          <p className={cn("text-2xl font-bold mt-1", colorMap[color])}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-[#a5a4a4] mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={cn("p-2 rounded-lg bg-[#2c2c2c]", colorMap[color])}>
            {icon}
          </div>
        )}
      </div>

      {trend && trendValue && (
        <div className="flex items-center gap-1 mt-3">
          {trend === "up" ? (
            <TrendingUp size={14} className="text-[#1dee4a]" />
          ) : (
            <TrendingDown size={14} className="text-[#ef4444]" />
          )}
          <span
            className={cn(
              "text-xs",
              trend === "up" ? "text-[#1dee4a]" : "text-[#ef4444]"
            )}
          >
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
}

interface RiskIndicatorProps {
  value: number;
  label: string;
}

export function RiskIndicator({ value, label }: RiskIndicatorProps) {
  const isHigh = value > 50;

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4">
      <p className="text-sm text-[#a5a4a4] mb-3">{label}</p>
      <div className="relative">
        <div className="w-full h-2 bg-[#2c2c2c] rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isHigh ? "bg-[#ef4444]" : "bg-[#1dee4a]"
            )}
            style={{ width: `${value}%` }}
          />
        </div>
        <p
          className={cn(
            "text-3xl font-bold mt-2",
            isHigh ? "text-[#ef4444]" : "text-[#1dee4a]"
          )}
        >
          {value.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

