"use client";

import { plants } from "@/lib/data/plants";
import { cn } from "@/lib/utils";

interface NigeriaMapSimpleProps {
  onPlantClick?: (plantId: string) => void;
  selectedPlant?: string | null;
  className?: string;
}

// Simplified Nigeria map SVG outline
export function NigeriaMapSimple({
  onPlantClick,
  selectedPlant,
  className,
}: NigeriaMapSimpleProps) {
  // Plant positions on the map (percentage based)
  const plantPositions: Record<string, { x: number; y: number }> = {
    alaoji: { x: 60, y: 78 }, // Abia - Southeast
    olorunsogo: { x: 28, y: 72 }, // Ogun - Southwest
    calabar: { x: 65, y: 88 }, // Cross River - South-south
    geregu: { x: 42, y: 58 }, // Kogi - North-central
    omotosho: { x: 25, y: 78 }, // Ondo - Southwest
    omoku: { x: 52, y: 85 }, // Rivers - South-south
    gbarain: { x: 48, y: 92 }, // Bayelsa - South-south
    sapele: { x: 38, y: 82 }, // Delta - South-south
    ihovbor: { x: 35, y: 75 }, // Edo - South-south
  };

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Map Background */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified Nigeria outline */}
        <path
          d="M30,10 L70,10 L75,20 L80,30 L82,40 L80,50 L78,60 L75,70 L70,80 L65,88 L60,92 L55,95 L45,95 L40,92 L35,88 L30,82 L25,75 L22,68 L20,60 L18,50 L20,40 L22,30 L25,20 Z"
          fill="transparent"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
        {/* Road lines */}
        <path
          d="M40,20 L60,40 M50,15 L50,50 M30,60 L70,60 M45,70 L65,85"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.3"
        />
      </svg>

      {/* Plant Markers */}
      {plants.map((plant) => {
        const pos = plantPositions[plant.id];
        if (!pos) return null;

        const isSelected = selectedPlant === plant.id;
        const isOnline = plant.status === "online";

        return (
          <button
            key={plant.id}
            onClick={() => onPlantClick?.(plant.id)}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
              "group hover:scale-125"
            )}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
          >
            {/* Marker Pulse Animation */}
            {isOnline && (
              <span
                className={cn(
                  "absolute inset-0 rounded-full animate-ping opacity-75",
                  isSelected ? "bg-[#eeac1d]" : "bg-[#1dee4a]"
                )}
              />
            )}

            {/* Marker */}
            <div
              className={cn(
                "relative w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center",
                "border-2 transition-all duration-200",
                isSelected
                  ? "bg-[#eeac1d] border-[#eeac1d] scale-125"
                  : isOnline
                  ? "bg-[#1dee4a] border-[#1dee4a]"
                  : "bg-[#ef4444] border-[#ef4444]"
              )}
            >
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-full" />
            </div>

            {/* Plant Name Label (on hover) */}
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 top-full mt-2",
                "bg-[#1e1e1e] px-2 py-1 rounded-lg whitespace-nowrap",
                "text-xs text-white font-medium",
                "opacity-0 group-hover:opacity-100 transition-opacity",
                "pointer-events-none z-10"
              )}
            >
              {plant.shortName}
            </div>
          </button>
        );
      })}
    </div>
  );
}

