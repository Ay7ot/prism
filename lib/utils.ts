import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-NG").format(num);
}

export function formatCurrency(num: number): string {
  if (num >= 1000000) {
    return `₦${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `₦${(num / 1000).toFixed(1)}K`;
  }
  return `₦${num}`;
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`;
}

export function getStatusColor(status: "online" | "offline" | "warning" | "maintenance"): string {
  switch (status) {
    case "online":
      return "text-[#1dee4a]";
    case "offline":
      return "text-[#ef4444]";
    case "warning":
      return "text-[#f97316]";
    case "maintenance":
      return "text-[#eeac1d]";
    default:
      return "text-[#a5a4a4]";
  }
}

export function getSeverityColor(severity: "critical" | "warning" | "info"): string {
  switch (severity) {
    case "critical":
      return "border-l-[#ef4444] bg-[#ef4444]/10";
    case "warning":
      return "border-l-[#eeac1d] bg-[#eeac1d]/10";
    case "info":
      return "border-l-[#1dee4a] bg-[#1dee4a]/10";
    default:
      return "border-l-[#a5a4a4] bg-[#a5a4a4]/10";
  }
}

export function getSeverityTextColor(severity: "critical" | "warning" | "info"): string {
  switch (severity) {
    case "critical":
      return "text-[#ef4444]";
    case "warning":
      return "text-[#eeac1d]";
    case "info":
      return "text-[#1dee4a]";
    default:
      return "text-[#a5a4a4]";
  }
}

