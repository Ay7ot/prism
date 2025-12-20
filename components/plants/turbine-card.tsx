"use client";

import { cn } from "@/lib/utils";
import {
  Zap,
  Thermometer,
  Activity,
  Gauge,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { Turbine } from "@/lib/data/plants";

interface TurbineCardProps {
  turbine: Turbine;
  onClick?: () => void;
}

export function TurbineCard({ turbine, onClick }: TurbineCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#1e1e1e] rounded-xl p-4 text-left w-full hover:bg-[#252525] transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-medium">{turbine.name}</h4>
        <div
          className={cn(
            "px-2 py-0.5 rounded text-xs font-medium",
            turbine.status === "online"
              ? "bg-[#1dee4a]/20 text-[#1dee4a]"
              : turbine.status === "warning"
              ? "bg-[#f97316]/20 text-[#f97316]"
              : "bg-[#ef4444]/20 text-[#ef4444]"
          )}
        >
          {turbine.status}
        </div>
      </div>

      <p className="text-xs text-[#a5a4a4] mb-4">{turbine.type}</p>

      <div className="grid grid-cols-2 gap-3">
        <MetricBox
          icon={<Zap size={14} />}
          label="Generation"
          value={`${turbine.metrics.generation.power}`}
          unit="mW"
          color="gold"
        />
        <MetricBox
          icon={<Thermometer size={14} />}
          label="Temperature"
          value={`${turbine.metrics.temperature.value}`}
          unit="°F"
          color={turbine.metrics.temperature.value > 5000 ? "red" : "green"}
        />
        <MetricBox
          icon={<Activity size={14} />}
          label="Vibrations"
          value={`${turbine.metrics.vibrations.seismic}`}
          unit="mm/s"
          color="blue"
        />
        <MetricBox
          icon={<Gauge size={14} />}
          label="Pressure"
          value={`${turbine.metrics.pressure.high}`}
          unit="Pa"
          color="purple"
        />
      </div>
    </button>
  );
}

interface MetricBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  color: "gold" | "green" | "red" | "blue" | "purple";
}

function MetricBox({ icon, label, value, unit, color }: MetricBoxProps) {
  const colorMap = {
    gold: "text-[#eeac1d]",
    green: "text-[#1dee4a]",
    red: "text-[#ef4444]",
    blue: "text-[#3b82f6]",
    purple: "text-[#8b5cf6]",
  };

  return (
    <div className="bg-[#2c2c2c] rounded-lg p-2.5">
      <div className="flex items-center gap-1.5 text-[#a5a4a4] mb-1">
        {icon}
        <span className="text-[10px]">{label}</span>
      </div>
      <p className={cn("text-sm font-semibold", colorMap[color])}>
        {value}
        <span className="text-[10px] text-[#a5a4a4] ml-1">{unit}</span>
      </p>
    </div>
  );
}

interface TurbineMetricCardProps {
  title: string;
  icon: React.ReactNode;
  metrics: {
    label: string;
    value: string | number;
    unit?: string;
    trend?: "up" | "down";
  }[];
  color: "gold" | "red" | "green" | "blue";
}

export function TurbineMetricCard({
  title,
  icon,
  metrics,
  color,
}: TurbineMetricCardProps) {
  const colorMap = {
    gold: {
      bg: "bg-[#eeac1d]/10",
      text: "text-[#eeac1d]",
      border: "border-[#eeac1d]/30",
    },
    red: {
      bg: "bg-[#ef4444]/10",
      text: "text-[#ef4444]",
      border: "border-[#ef4444]/30",
    },
    green: {
      bg: "bg-[#1dee4a]/10",
      text: "text-[#1dee4a]",
      border: "border-[#1dee4a]/30",
    },
    blue: {
      bg: "bg-[#3b82f6]/10",
      text: "text-[#3b82f6]",
      border: "border-[#3b82f6]/30",
    },
  };

  return (
    <div
      className={cn(
        "rounded-xl p-4 border",
        colorMap[color].bg,
        colorMap[color].border
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={cn("p-2 rounded-lg", colorMap[color].bg)}>
          <span className={colorMap[color].text}>{icon}</span>
        </div>
        <h4 className={cn("font-medium", colorMap[color].text)}>{title}</h4>
      </div>

      <div className="space-y-3">
        {metrics.map((metric, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm text-[#a5a4a4]">{metric.label}</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-white font-medium">
                {metric.value}
                {metric.unit && (
                  <span className="text-xs text-[#a5a4a4] ml-1">
                    {metric.unit}
                  </span>
                )}
              </span>
              {metric.trend && (
                <span
                  className={cn(
                    metric.trend === "up" ? "text-[#1dee4a]" : "text-[#ef4444]"
                  )}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

