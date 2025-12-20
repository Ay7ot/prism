"use client";

import { cn } from "@/lib/utils";
import { Building2, Zap, MapPin } from "lucide-react";
import Link from "next/link";
import type { Plant } from "@/lib/data/plants";

interface PlantCardProps {
  plant: Plant;
  variant?: "grid" | "list";
}

export function PlantCard({ plant, variant = "grid" }: PlantCardProps) {
  const onlineTurbines = plant.turbines.filter(
    (t) => t.status === "online"
  ).length;
  const totalTurbines = plant.turbines.length;

  if (variant === "list") {
    return (
      <div className="bg-[#1e1e1e] rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-[#2c2c2c] flex items-center justify-center">
            <Building2 size={28} className="text-[#eeac1d]" />
          </div>
          <div>
            <h3 className="text-white font-medium">{plant.name}</h3>
            <p className="text-sm text-[#a5a4a4] flex items-center gap-1 mt-1">
              <MapPin size={12} />
              {plant.location}, {plant.state}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="text-[#1dee4a]">
                {onlineTurbines}/{totalTurbines} Turbines Online
              </span>
              <span className="text-[#a5a4a4]">
                {plant.currentOutput} mW / {plant.totalCapacity} mW
              </span>
            </div>
          </div>
        </div>
        <Link
          href={`/dashboard/plants/${plant.id}`}
          className="px-6 py-2.5 bg-[#ffc34d] text-[#111] rounded-xl font-medium hover:bg-[#eeac1d] transition-colors"
        >
          Manage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-xl bg-[#2c2c2c] flex items-center justify-center flex-shrink-0">
          <Building2 size={24} className="text-[#eeac1d]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate">{plant.name}</h3>
          <p className="text-xs text-[#a5a4a4] flex items-center gap-1 mt-1">
            <MapPin size={10} />
            {plant.location}, {plant.state}
          </p>
        </div>
        <div
          className={cn(
            "w-2 h-2 rounded-full flex-shrink-0",
            plant.status === "online" ? "bg-[#1dee4a]" : "bg-[#ef4444]"
          )}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-[#2c2c2c] rounded-lg p-2.5">
          <p className="text-[10px] text-[#a5a4a4]">Turbines</p>
          <p className="text-sm text-white font-medium mt-0.5">
            <span className="text-[#1dee4a]">{onlineTurbines}</span>
            <span className="text-[#a5a4a4]">/{totalTurbines}</span>
          </p>
        </div>
        <div className="bg-[#2c2c2c] rounded-lg p-2.5">
          <p className="text-[10px] text-[#a5a4a4]">Output</p>
          <p className="text-sm text-[#eeac1d] font-medium mt-0.5">
            {plant.currentOutput} mW
          </p>
        </div>
      </div>

      <Link
        href={`/dashboard/plants/${plant.id}`}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ffc34d] text-[#111] rounded-xl font-medium hover:bg-[#eeac1d] transition-colors"
      >
        <Zap size={16} />
        Manage
      </Link>
    </div>
  );
}

