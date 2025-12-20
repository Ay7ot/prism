"use client";

import { cn } from "@/lib/utils";
import { getSeverityColor, getSeverityTextColor } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import type { AIAlert } from "@/lib/data/alerts";

interface AIAlertCardProps {
  alert: AIAlert;
  compact?: boolean;
}

export function AIAlertCard({ alert, compact = false }: AIAlertCardProps) {
  return (
    <div
      className={cn(
        "border-l-4 rounded-lg p-3",
        getSeverityColor(alert.severity)
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            alert.severity === "critical"
              ? "bg-[#ef4444]/20"
              : alert.severity === "warning"
              ? "bg-[#eeac1d]/20"
              : "bg-[#1dee4a]/20"
          )}
        >
          <AlertTriangle
            size={16}
            className={getSeverityTextColor(alert.severity)}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                "font-medium text-sm truncate",
                getSeverityTextColor(alert.severity)
              )}
            >
              {alert.title}
            </p>
            <span className="text-xs text-[#a5a4a4] flex-shrink-0">
              {alert.timeAgo}
            </span>
          </div>
          {!compact && (
            <p className="text-xs text-[#a5a4a4] mt-1 line-clamp-2">
              {alert.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface AIAlertsListProps {
  alerts: AIAlert[];
  title?: string;
  maxItems?: number;
}

export function AIAlertsList({
  alerts,
  title = "AI Alerts",
  maxItems = 6,
}: AIAlertsListProps) {
  const displayAlerts = alerts.slice(0, maxItems);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <div className="flex flex-col gap-2">
        {displayAlerts.map((alert) => (
          <AIAlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}

