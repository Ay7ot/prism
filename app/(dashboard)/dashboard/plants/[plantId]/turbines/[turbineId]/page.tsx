"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { getPlantById } from "@/lib/data/plants";
import { engineerAlerts } from "@/lib/data/alerts";
import { ArrowLeft, Zap, Thermometer, Activity, Gauge } from "lucide-react";
import { PrismIcon } from "@/components/ui/prism-logo";
import { AIAlertsList } from "@/components/dashboard/ai-alert-card";
import { AlertsTrendChart } from "@/components/dashboard/alerts-trend-chart";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function TurbineDetailPage({
    params,
}: {
    params: Promise<{ plantId: string; turbineId: string }>;
}) {
    const router = useRouter();
    const { plantId, turbineId } = use(params);
    const plant = getPlantById(plantId);

    if (!plant) {
        return (
            <div className="px-7 py-6">
                <p className="text-white">Plant not found</p>
            </div>
        );
    }

    const turbine = plant.turbines.find((t) => t.id === turbineId);

    if (!turbine) {
        return (
            <div className="px-7 py-6">
                <p className="text-white">Turbine not found</p>
            </div>
        );
    }

    const turbineIndex = plant.turbines.indexOf(turbine) + 1;
    const isGasTurbine = turbine.type === "Gas Turbine";

    const statusColor =
        turbine.status === "online"
            ? "#1dee4a"
            : turbine.status === "warning"
                ? "#f97316"
                : "#ef4444";

    const plantAlerts = engineerAlerts.filter(
        (a) => a.plantId === plant.id || !a.plantId
    );

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-[#111]">
                <div className="px-4 lg:px-7 pt-4 lg:pt-6 pb-6">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2.5 px-5.5 py-2 rounded-[50px] border-2 border-[#7d7878] text-[#7d7878] text-xs font-outfit mb-4 lg:mb-6 hover:bg-[#7d7878]/10 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 lg:mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#2c2c2c] flex items-center justify-center">
                                <Zap size={16} className="text-white" />
                            </div>
                            <h1 className="font-outfit text-2xl lg:text-[32px] text-white font-medium tracking-[-0.154px]">
                                Turbine {turbineIndex}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2 lg:gap-4">
                            <button className="flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2.5 lg:py-3.5 rounded-xl border-2 border-[#eeac1d] text-white text-sm lg:text-base font-medium font-outfit hover:bg-accent-gold-dim transition-colors">
                                <span className="hidden lg:inline">Info</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="lg:w-6 lg:h-6">
                                    <circle cx="12" cy="12" r="9" stroke="#EEAC1D" strokeWidth="1.5" />
                                    <path d="M12 16V12M12 8H12.01" stroke="#EEAC1D" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button className="flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2.5 lg:py-3.5 rounded-xl bg-[#eeac1d] text-[#2c2c2c] text-sm lg:text-base font-medium font-outfit hover:bg-[#ffc34d] transition-colors">
                                <PrismIcon color="white" size={24} className="text-[#2c2c2c] lg:w-[30px] lg:h-[30px]" />
                                <span className="hidden lg:inline">AI Alerts</span>
                            </button>
                        </div>
                    </div>

                    {/* Model & Status Info */}
                    <div className="flex items-start gap-4 mb-4 lg:mb-6">
                        <div className="flex flex-col gap-1.5">
                            <p className="text-white text-xs font-medium font-inter tracking-[-0.154px]">
                                {turbine.model}
                            </p>
                            <p className="text-[#eeac1d] text-[11px] font-light font-outfit">
                                {turbine.type}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <p className="text-white text-xs font-medium font-inter tracking-[-0.154px]">
                                Status
                            </p>
                            <p
                                className="text-[11px] font-light font-outfit capitalize"
                                style={{ color: statusColor }}
                            >
                                {turbine.status}
                            </p>
                        </div>
                    </div>

                    {/* Turbine Image with Indicators */}
                    <div className="relative border border-white/70 rounded-xl p-3 mb-4 lg:mb-6 h-[200px] lg:h-[359px] flex items-center justify-center overflow-hidden">
                        <Image
                            src="/turbine.png"
                            alt={`${turbine.name} - ${turbine.type}`}
                            width={598}
                            height={250}
                            className="object-contain max-w-full h-auto"
                        />

                        {/* Lube Oil Indicators - Hidden on mobile for cleaner view */}
                        <div className="hidden lg:flex absolute top-[60px] left-[205px] items-center gap-1.5 px-4 py-2 rounded-full bg-[rgba(255,195,77,0.4)] backdrop-blur-3xl">
                            <p className="text-white text-xs font-bold font-urbanist">Lube Oil</p>
                            <span className="bg-[#1dee4a] text-[#1e1e1e] text-[10px] font-bold font-urbanist px-1 py-0.5 rounded-[2px]">
                                77%
                            </span>
                        </div>

                        <div className="hidden lg:flex absolute top-[156px] right-[45px] items-center gap-1.5 px-4 py-2 rounded-full bg-[rgba(255,195,77,0.19)]">
                            <p className="text-white text-xs font-bold font-urbanist">Lube Oil</p>
                            <span className="bg-[#1dee4a] text-[#1e1e1e] text-[10px] font-bold font-urbanist px-1 py-0.5 rounded-[2px]">
                                77%
                            </span>
                        </div>

                        <div className="hidden lg:flex absolute top-[240px] right-[149px] items-center gap-1.5 px-4 py-2 rounded-full bg-[rgba(255,195,77,0.4)] backdrop-blur-3xl">
                            <p className="text-white text-xs font-bold font-urbanist">Lube Oil</p>
                            <span className="bg-[#1dee4a] text-[#1e1e1e] text-[10px] font-bold font-urbanist px-1 py-0.5 rounded-[2px]">
                                77%
                            </span>
                        </div>

                        <div className="hidden lg:flex absolute top-[291px] left-[46px] items-center gap-1.5 px-4 py-2 rounded-full bg-[rgba(255,195,77,0.4)]">
                            <p className="text-white text-xs font-bold font-urbanist">Lube Oil</p>
                            <span className="bg-[#1dee4a] text-[#1e1e1e] text-[10px] font-bold font-urbanist px-1 py-0.5 rounded-[2px]">
                                77%
                            </span>
                        </div>

                        <div className="hidden lg:flex absolute top-[300px] left-[380px] items-center gap-1.5 px-4 py-2 rounded-full bg-[rgba(255,195,77,0.4)]">
                            <p className="text-white text-xs font-bold font-urbanist">Lube Oil</p>
                            <span className="bg-[#1dee4a] text-[#1e1e1e] text-[10px] font-bold font-urbanist px-1 py-0.5 rounded-[2px]">
                                77%
                            </span>
                        </div>

                        <div className="hidden lg:flex absolute top-[306px] right-[88px] items-center gap-1.5 px-4 py-2 rounded-full bg-[rgba(255,195,77,0.4)]">
                            <p className="text-white text-xs font-bold font-urbanist">Lube Oil</p>
                            <span className="bg-[#1dee4a] text-[#1e1e1e] text-[10px] font-bold font-urbanist px-1 py-0.5 rounded-[2px]">
                                77%
                            </span>
                        </div>
                    </div>

                    {/* Metric Cards Grid */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* First Set of 4 Cards */}
                        <div className="flex flex-wrap gap-1.5 w-full lg:w-[346px]">
                            {/* Generation */}
                            <div className="w-full sm:w-[calc(50%-3px)] lg:w-[170px] h-[124px] bg-[#2c2c2c] rounded-xl p-3 flex flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Zap size={18} className="text-white" />
                                    <p className="text-white text-sm font-medium font-outfit tracking-[-0.154px]">
                                        Generation
                                    </p>
                                </div>
                                <p className="text-[#eeac1d] text-xl font-bold font-outfit">
                                    {turbine.metrics.generation.power}{" "}
                                    <span className="text-[#a5a4a4]">mW</span>
                                </p>
                                <div className="space-y-0">
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Power</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.generation.power}{" "}
                                            <span className="text-[#a5a4a4]">mW</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Current</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.generation.current}{" "}
                                            <span className="text-[#a5a4a4]">mA</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Voltage</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.generation.voltage}{" "}
                                            <span className="text-[#a5a4a4]">kV</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Temperature */}
                            <div className="w-full sm:w-[calc(50%-3px)] lg:w-[170px] h-[124px] bg-[#2c2c2c] rounded-xl p-3 flex flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Thermometer size={18} className="text-white" />
                                    <p className="text-white text-sm font-medium font-outfit tracking-[-0.154px]">
                                        Temperature
                                    </p>
                                </div>
                                <p className="font-bold font-outfit text-xl">
                                    <span className={cn(isGasTurbine ? "text-[#ee1d1d]" : "text-[#eeac1d]")}>
                                        {turbine.metrics.temperature.value}
                                    </span>{" "}
                                    <span className="text-[#a5a4a4]">°C</span>
                                </p>
                                <div className="space-y-0">
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">High</span>
                                        <span className="text-[#eeac1d]">
                                            <span className="text-[#a5a4a4]">&gt;</span>{" "}
                                            {turbine.metrics.temperature.high}{" "}
                                            <span className="text-[#a5a4a4]">°C</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Cool</span>
                                        <span className="text-[#eeac1d]">
                                            <span className="text-[#a5a4a4]">&lt;</span>{" "}
                                            {turbine.metrics.temperature.cool}{" "}
                                            <span className="text-[#a5a4a4]">°C</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Vibrations */}
                            <div className="w-full sm:w-[calc(50%-3px)] lg:w-[170px] h-[127px] bg-[#2c2c2c] rounded-xl p-3 flex flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Activity size={18} className="text-white" />
                                    <p className="text-white text-sm font-medium font-outfit tracking-[-0.154px]">
                                        Vibrations
                                    </p>
                                </div>
                                <p className="text-[#eeac1d] text-xl font-bold font-outfit">
                                    38 <span className="text-[#a5a4a4]">mm/s</span>
                                </p>
                                <div className="space-y-0">
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Sessmic</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.vibrations.seismic}{" "}
                                            <span className="text-[#a5a4a4]">m/s</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Acceleration</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.vibrations.acceleration}{" "}
                                            <span className="text-[#a5a4a4]">m/s²</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Displacement</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.vibrations.displacement}{" "}
                                            <span className="text-[#a5a4a4]">m</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Pressure */}
                            <div className="w-full sm:w-[calc(50%-3px)] lg:w-[170px] h-[127px] bg-[#2c2c2c] rounded-xl p-3 flex flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Gauge size={18} className="text-white" />
                                    <p className="text-white text-sm font-medium font-outfit tracking-[-0.154px]">
                                        Pressure
                                    </p>
                                </div>
                                <p className="text-[#eeac1d] text-xl font-bold font-outfit">
                                    38 <span className="text-[#a5a4a4]">mm/s</span>
                                </p>
                                <div className="space-y-0">
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Velocity</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.pressure.high}{" "}
                                            <span className="text-[#a5a4a4]">m/s</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Acceleration</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.pressure.low}{" "}
                                            <span className="text-[#a5a4a4]">m/s²</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Displacement</span>
                                        <span className="text-[#eeac1d]">
                                            50 <span className="text-[#a5a4a4]">m</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Second Set of 4 Cards (Duplicate) */}
                        <div className="flex flex-wrap gap-1.5 w-full lg:w-[346px]">
                            {/* Generation */}
                            <div className="w-full sm:w-[calc(50%-3px)] lg:w-[170px] h-[124px] bg-[#2c2c2c] rounded-xl p-3 flex flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Zap size={18} className="text-white" />
                                    <p className="text-white text-sm font-medium font-outfit tracking-[-0.154px]">
                                        Generation
                                    </p>
                                </div>
                                <p className="text-[#eeac1d] text-xl font-bold font-outfit">
                                    {turbine.metrics.generation.power}{" "}
                                    <span className="text-[#a5a4a4]">mW</span>
                                </p>
                                <div className="space-y-0">
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Power</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.generation.power}{" "}
                                            <span className="text-[#a5a4a4]">mW</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Current</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.generation.current}{" "}
                                            <span className="text-[#a5a4a4]">mA</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Voltage</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.generation.voltage}{" "}
                                            <span className="text-[#a5a4a4]">kV</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Temperature */}
                            <div className="w-full sm:w-[calc(50%-3px)] lg:w-[170px] h-[124px] bg-[#2c2c2c] rounded-xl p-3 flex flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Thermometer size={18} className="text-white" />
                                    <p className="text-white text-sm font-medium font-outfit tracking-[-0.154px]">
                                        Temperature
                                    </p>
                                </div>
                                <p className="font-bold font-outfit text-xl">
                                    <span className={cn(isGasTurbine ? "text-[#ee1d1d]" : "text-[#eeac1d]")}>
                                        {turbine.metrics.temperature.value}
                                    </span>{" "}
                                    <span className="text-[#a5a4a4]">°C</span>
                                </p>
                                <div className="space-y-0">
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">High</span>
                                        <span className="text-[#eeac1d]">
                                            <span className="text-[#a5a4a4]">&gt;</span>{" "}
                                            {turbine.metrics.temperature.high}{" "}
                                            <span className="text-[#a5a4a4]">°C</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Cool</span>
                                        <span className="text-[#eeac1d]">
                                            <span className="text-[#a5a4a4]">&lt;</span>{" "}
                                            {turbine.metrics.temperature.cool}{" "}
                                            <span className="text-[#a5a4a4]">°C</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Vibrations */}
                            <div className="w-full sm:w-[calc(50%-3px)] lg:w-[170px] h-[127px] bg-[#2c2c2c] rounded-xl p-3 flex flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Activity size={18} className="text-white" />
                                    <p className="text-white text-sm font-medium font-outfit tracking-[-0.154px]">
                                        Vibrations
                                    </p>
                                </div>
                                <p className="text-[#eeac1d] text-xl font-bold font-outfit">
                                    38 <span className="text-[#a5a4a4]">mm/s</span>
                                </p>
                                <div className="space-y-0">
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Sessmic</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.vibrations.seismic}{" "}
                                            <span className="text-[#a5a4a4]">m/s</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Acceleration</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.vibrations.acceleration}{" "}
                                            <span className="text-[#a5a4a4]">m/s²</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Displacement</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.vibrations.displacement}{" "}
                                            <span className="text-[#a5a4a4]">m</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Pressure */}
                            <div className="w-full sm:w-[calc(50%-3px)] lg:w-[170px] h-[127px] bg-[#2c2c2c] rounded-xl p-3 flex flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Gauge size={18} className="text-white" />
                                    <p className="text-white text-sm font-medium font-outfit tracking-[-0.154px]">
                                        Pressure
                                    </p>
                                </div>
                                <p className="text-[#eeac1d] text-xl font-bold font-outfit">
                                    38 <span className="text-[#a5a4a4]">mm/s</span>
                                </p>
                                <div className="space-y-0">
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Velocity</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.pressure.high}{" "}
                                            <span className="text-[#a5a4a4]">m/s</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Acceleration</span>
                                        <span className="text-[#eeac1d]">
                                            {turbine.metrics.pressure.low}{" "}
                                            <span className="text-[#a5a4a4]">m/s²</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3.5 text-xs font-medium font-outfit">
                                        <span className="text-[#a5a4a4]">Displacement</span>
                                        <span className="text-[#eeac1d]">
                                            50 <span className="text-[#a5a4a4]">m</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block w-[389px] bg-[#1e1e1e] border-l border-white/10 h-full overflow-y-auto">
                <div className="px-7 py-6">
                    {/* Alert Trends Chart */}
                    <AlertsTrendChart />

                    {/* AI Alerts */}
                    <div className="mb-6">
                        <p className="text-[#eeac1d] font-lato font-bold text-base mb-3">
                            AI Alerts
                        </p>
                        <AIAlertsList alerts={plantAlerts} title="" maxItems={5} />
                    </div>
                </div>
            </aside>
        </div>
    );
}

