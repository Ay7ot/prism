"use client";

import { cn } from "@/lib/utils";
import { Building2, Settings } from "lucide-react";
import Link from "next/link";
import type { Plant } from "@/lib/data/plants";

interface PlantListCardProps {
    plant: Plant;
    index: number;
    className?: string;
}

export function PlantListCard({ plant, index, className }: PlantListCardProps) {
    const gasTurbines = plant.turbines.filter(t => t.type === "Gas Turbine").length;
    const steamTurbines = plant.turbines.filter(t => t.type === "Steam Turbine").length;

    return (
        <div className={cn("bg-[#1e1e1e] rounded-xl p-2 lg:p-3", className)}>
            <div className="border border-[#a5a4a4] rounded-xl p-2 lg:p-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-4">
                {/* Plant Info */}
                <div className="flex items-center gap-3 lg:gap-4">
                    <Building2 size={20} className="text-[#a5a4a4] shrink-0 lg:w-6 lg:h-6" />
                    <div className="flex flex-col">
                        <span
                            className="text-sm font-medium text-white tracking-tight"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            Plant {index + 1}
                        </span>
                        <span
                            className={cn(
                                "text-[11px] font-light",
                                plant.status === "online" ? "text-[#1dee4a]" : "text-[#ef4444]"
                            )}
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            {plant.status === "online" ? "Online" : "Offline"}
                        </span>
                    </div>
                </div>

                {/* Plant Name & Location */}
                <div className="flex flex-col gap-1.5 min-w-[100px] lg:min-w-[123px]">
                    <span
                        className="text-xs font-medium text-white tracking-tight"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        {plant.name}
                    </span>
                    <span
                        className="text-[11px] font-light text-[#eeac1d]"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        {plant.state}
                    </span>
                </div>

                {/* Turbines */}
                <div className="flex flex-col gap-1.5">
                    <span
                        className="text-xs font-medium text-white tracking-tight"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        Turbines
                    </span>
                    {gasTurbines > 0 && (
                        <span
                            className="text-[11px] font-light"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            <span className="text-[#eeac1d]">{gasTurbines} </span>
                            <span className="text-[#a5a4a4]">GE Frame 9E Gas Turbines</span>
                        </span>
                    )}
                    {steamTurbines > 0 && (
                        <span
                            className="text-[11px] font-light"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            <span className="text-[#eeac1d]">{steamTurbines} </span>
                            <span className="text-[#a5a4a4]">GE Steam Turbines</span>
                        </span>
                    )}
                </div>

                {/* Manage Button */}
                <Link
                    href={`/dashboard/plants/${plant.id}`}
                    className="flex items-center justify-center gap-2 lg:gap-3 px-4 lg:px-6 py-2.5 lg:py-3 border-2 border-[#eeac1d] rounded-xl text-[#d8d8d8] hover:bg-[#eeac1d]/10 transition-colors shrink-0"
                >
                    <span
                        className="text-sm lg:text-base font-medium"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        Manage
                    </span>
                    <Settings size={18} className="text-[#eeac1d] lg:w-5 lg:h-5" />
                </Link>
            </div>
        </div>
    );
}

