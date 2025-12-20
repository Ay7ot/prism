"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  valueSecondary?: string | number;
  subtitle?: string;
  subtitleSecondary?: string;
  valueColor?: "gold" | "green" | "white";
  className?: string;
}

export function StatCard({
  title,
  value,
  valueSecondary,
  subtitle,
  subtitleSecondary,
  valueColor = "gold",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-[#1e1e1e] rounded-xl p-3 h-[89px] min-w-[160px] flex-1 lg:flex-none lg:w-[170px] flex flex-col justify-between",
        className
      )}
    >
      <p
        className="text-sm font-medium text-white tracking-tight"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline">
          <span
            className={cn(
              "text-2xl font-bold",
              valueColor === "gold" && "text-[#eeac1d]",
              valueColor === "green" && "text-[#1dee4a]",
              valueColor === "white" && "text-white"
            )}
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {value}
          </span>
          {valueSecondary !== undefined && (
            <span
              className="text-2xl font-bold text-[#a5a4a4]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              /{valueSecondary}
            </span>
          )}
          {subtitle && (
            <span
              className="text-2xl font-bold text-[#a5a4a4] ml-1"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {subtitle}
            </span>
          )}
        </div>
        {subtitleSecondary && (
          <span
            className="text-xs font-medium"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <span className="text-[#1dee4a]">Online</span>
            <span className="text-white"> / Total</span>
          </span>
        )}
      </div>
    </div>
  );
}

interface LargeStatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function LargeStatCard({
  title,
  value,
  unit,
  subtitle,
  icon,
  className,
}: LargeStatCardProps) {
  return (
    <div
      className={cn(
        "bg-[#1e1e1e] rounded-xl p-4 flex flex-col justify-between h-[89px]",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm font-medium text-white tracking-tight">{title}</p>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-[#eeac1d]">{value}</span>
        {unit && <span className="text-[#a5a4a4]">{unit}</span>}
      </div>
      {subtitle && (
        <p className="text-xs text-[#a5a4a4]">{subtitle}</p>
      )}
    </div>
  );
}
