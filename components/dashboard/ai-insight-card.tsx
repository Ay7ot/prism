"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, AlertCircle, Info } from "lucide-react";
import type { AIInsight } from "@/lib/data/alerts";

interface AIInsightCardProps {
  insight: AIInsight;
}

export function AIInsightCard({ insight }: AIInsightCardProps) {
  const iconMap = {
    "trending-up": TrendingUp,
    "trending-down": TrendingDown,
    alert: AlertCircle,
    info: Info,
  };

  const Icon = iconMap[insight.icon];

  return (
    <div
      className={cn(
        "border-l-4 rounded-lg p-3",
        insight.type === "positive"
          ? "border-l-[#1dee4a] bg-[#1dee4a]/10"
          : insight.type === "negative"
          ? "border-l-[#ef4444] bg-[#ef4444]/10"
          : "border-l-[#eeac1d] bg-[#eeac1d]/10"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            insight.type === "positive"
              ? "bg-[#1dee4a]/20"
              : insight.type === "negative"
              ? "bg-[#ef4444]/20"
              : "bg-[#eeac1d]/20"
          )}
        >
          <Icon
            size={16}
            className={cn(
              insight.type === "positive"
                ? "text-[#1dee4a]"
                : insight.type === "negative"
                ? "text-[#ef4444]"
                : "text-[#eeac1d]"
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white/90 leading-relaxed">
            {insight.message}
          </p>
          <span className="text-xs text-[#a5a4a4] mt-1 block">
            {insight.timeAgo}
          </span>
        </div>
      </div>
    </div>
  );
}

interface AIInsightsListProps {
  insights: AIInsight[];
  title?: string;
}

export function AIInsightsList({
  insights,
  title = "AI Insights",
}: AIInsightsListProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <div className="flex flex-col gap-2">
        {insights.map((insight) => (
          <AIInsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}

