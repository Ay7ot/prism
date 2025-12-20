"use client";

import { plants } from "@/lib/data/plants";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface NigeriaMapRealProps {
    selectedPlant: string | null;
    onPlantClick: (plantId: string) => void;
    className?: string;
}

export function NigeriaMapReal({
    selectedPlant,
    onPlantClick,
    className,
}: NigeriaMapRealProps) {
    return (
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            {/* Dark street map background */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 600"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Background */}
                <rect width="1000" height="600" fill="#1a1a1a" />

                {/* Street grid pattern */}
                <g opacity="0.3">
                    {/* Horizontal lines */}
                    {Array.from({ length: 30 }).map((_, i) => (
                        <line
                            key={`h-${i}`}
                            x1="0"
                            y1={i * 20}
                            x2="1000"
                            y2={i * 20}
                            stroke="#2a2a2a"
                            strokeWidth="1"
                        />
                    ))}
                    {/* Vertical lines */}
                    {Array.from({ length: 50 }).map((_, i) => (
                        <line
                            key={`v-${i}`}
                            x1={i * 20}
                            y1="0"
                            x2={i * 20}
                            y2="600"
                            stroke="#2a2a2a"
                            strokeWidth="1"
                        />
                    ))}
                </g>

                {/* Roads/waterways pattern */}
                <g opacity="0.2">
                    <path
                        d="M 100 50 Q 200 100 300 80 T 500 120 L 700 200 Q 800 250 900 240"
                        stroke="#3a3a3a"
                        strokeWidth="3"
                        fill="none"
                    />
                    <path
                        d="M 50 200 Q 150 220 250 200 T 450 240 L 650 300 Q 750 320 850 310"
                        stroke="#3a3a3a"
                        strokeWidth="2"
                        fill="none"
                    />
                    <path
                        d="M 200 350 Q 300 380 400 360 T 600 400 L 800 450"
                        stroke="#3a3a3a"
                        strokeWidth="2"
                        fill="none"
                    />
                </g>

                {/* Nigeria country outline (simplified shape) */}
                <g>
                    <path
                        d="M 450 150 
               L 480 140 L 520 145 L 560 155 L 590 170 
               L 610 190 L 620 220 L 625 260 L 620 300 
               L 610 340 L 590 370 L 560 390 L 520 400 
               L 480 395 L 440 380 L 410 360 L 390 330 
               L 380 300 L 375 260 L 380 220 L 395 190 
               L 415 170 L 435 160 Z"
                        fill="#eeac1d"
                        fillOpacity="0.6"
                        stroke="#ffc34d"
                        strokeWidth="2"
                    />
                    {/* Inner shadow effect */}
                    <path
                        d="M 450 150 
               L 480 140 L 520 145 L 560 155 L 590 170 
               L 610 190 L 620 220 L 625 260 L 620 300 
               L 610 340 L 590 370 L 560 390 L 520 400 
               L 480 395 L 440 380 L 410 360 L 390 330 
               L 380 300 L 375 260 L 380 220 L 395 190 
               L 415 170 L 435 160 Z"
                        fill="none"
                        stroke="#ffc34d"
                        strokeWidth="1"
                        opacity="0.8"
                    />
                </g>

                {/* Additional terrain/parks */}
                <g opacity="0.15">
                    <circle cx="200" cy="150" r="40" fill="#1dee4a" />
                    <circle cx="750" cy="250" r="35" fill="#1dee4a" />
                    <circle cx="300" cy="450" r="50" fill="#1dee4a" />
                </g>
            </svg>

            {/* Plant Markers */}
            {plants.map((plant) => {
                // Calculate position based on actual coordinates
                // Nigeria roughly spans: Lat 4°N to 14°N, Long 3°E to 15°E
                const latRange = { min: 4, max: 14 };
                const lngRange = { min: 3, max: 15 };

                const xPercent = ((plant.coordinates.lng - lngRange.min) / (lngRange.max - lngRange.min)) * 100;
                const yPercent = ((latRange.max - plant.coordinates.lat) / (latRange.max - latRange.min)) * 100;

                // Adjust to fit within the Nigeria shape overlay (centered around 50%, 50%)
                const adjustedX = 37.5 + (xPercent * 0.25); // Scale to roughly 37.5% to 62.5%
                const adjustedY = 15 + (yPercent * 0.65); // Scale to roughly 15% to 80%

                return (
                    <button
                        key={plant.id}
                        className={cn(
                            "absolute flex items-center justify-center rounded-full p-1 transition-all duration-200 z-10",
                            selectedPlant === plant.id
                                ? "bg-[#eeac1d] text-[#111] shadow-lg scale-110 ring-2 ring-[#ffc34d]"
                                : "bg-[#1dee4a] text-white hover:scale-105",
                            plant.status === "offline" && "bg-[#ef4444]",
                            plant.status === "maintenance" && "bg-[#f97316]"
                        )}
                        style={{
                            left: `${adjustedX}%`,
                            top: `${adjustedY}%`,
                            width: "24px",
                            height: "24px",
                        }}
                        onClick={() => onPlantClick(plant.id)}
                        title={plant.name}
                    >
                        <MapPin size={16} />
                    </button>
                );
            })}
        </div>
    );
}

