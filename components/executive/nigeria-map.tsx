"use client";

import { cn } from "@/lib/utils";
import { plants } from "@/lib/data/plants";

interface NigeriaMapProps {
  onPlantClick?: (plantId: string) => void;
  selectedPlant?: string | null;
}

export function NigeriaMap({ onPlantClick, selectedPlant }: NigeriaMapProps) {
  // Simplified coordinates mapped to percentage positions on the map
  const plantPositions: Record<string, { x: number; y: number }> = {
    alaoji: { x: 72, y: 58 },
    olorunsogo: { x: 32, y: 48 },
    calabar: { x: 78, y: 62 },
    geregu: { x: 52, y: 42 },
    omotosho: { x: 28, y: 54 },
    omoku: { x: 58, y: 68 },
    gbarain: { x: 52, y: 72 },
    sapele: { x: 42, y: 62 },
    ihovbor: { x: 38, y: 58 },
  };

  return (
    <div className="relative w-full h-full bg-[#1e1e1e] rounded-2xl overflow-hidden">
      {/* Map Background - Simplified Nigeria outline */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Simplified Nigeria shape */}
        <path
          d="M20,25 L45,20 L65,22 L80,28 L85,40 L82,55 L78,70 L65,78 L50,80 L35,75 L25,65 L18,50 L15,35 Z"
          fill="none"
          stroke="#eeac1d"
          strokeWidth="0.5"
          opacity="0.3"
        />
        {/* Grid lines */}
        {[20, 40, 60, 80].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            stroke="#2c2c2c"
            strokeWidth="0.2"
          />
        ))}
        {[20, 40, 60, 80].map((y) => (
          <line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#2c2c2c"
            strokeWidth="0.2"
          />
        ))}
      </svg>

      {/* Plant Markers */}
      {plants.map((plant) => {
        const pos = plantPositions[plant.id];
        if (!pos) return null;

        const isSelected = selectedPlant === plant.id;
        const onlineTurbines = plant.turbines.filter(
          (t) => t.status === "online"
        ).length;

        return (
          <button
            key={plant.id}
            onClick={() => onPlantClick?.(plant.id)}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 group",
              "transition-all duration-200"
            )}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {/* Pulse Ring */}
            <div
              className={cn(
                "absolute inset-0 rounded-full animate-ping",
                plant.status === "online" ? "bg-[#1dee4a]" : "bg-[#ef4444]",
                isSelected ? "opacity-50" : "opacity-20"
              )}
              style={{ animationDuration: "2s" }}
            />

            {/* Marker */}
            <div
              className={cn(
                "relative w-4 h-4 rounded-full border-2 transition-all",
                plant.status === "online"
                  ? "bg-[#1dee4a] border-[#1dee4a]"
                  : "bg-[#ef4444] border-[#ef4444]",
                isSelected && "scale-150 ring-4 ring-[#eeac1d]/30"
              )}
            />

            {/* Tooltip */}
            <div
              className={cn(
                "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10",
                isSelected && "opacity-100"
              )}
            >
              <div className="bg-[#2c2c2c] rounded-lg p-3 shadow-lg whitespace-nowrap">
                <p className="text-sm font-medium text-white">{plant.name}</p>
                <p className="text-xs text-[#a5a4a4]">{plant.location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#1dee4a]">
                    {onlineTurbines}/{plant.turbines.length} Turbines
                  </span>
                  <span className="text-xs text-[#eeac1d]">
                    {plant.currentOutput} mW
                  </span>
                </div>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#2c2c2c]" />
            </div>
          </button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[#2c2c2c]/80 backdrop-blur rounded-lg p-3">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1dee4a]" />
            <span className="text-[#a5a4a4]">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span className="text-[#a5a4a4]">Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
}

