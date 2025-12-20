"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPlantById } from "@/lib/data/plants";
import { engineerAlerts } from "@/lib/data/alerts";
import { TurbineInfoModal } from "@/components/plants/turbine-info-modal";
import {
  ArrowLeft,
  Chrome,
  Zap,
  Thermometer,
  Activity,
  Gauge,
  Settings,
  Info,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import type { Turbine } from "@/lib/data/plants";
import type { AIAlert } from "@/lib/data/alerts";
import { AlertsTrendChart } from "@/components/dashboard/alerts-trend-chart";

export default function PlantDetailPage({
  params,
}: {
  params: Promise<{ plantId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const plant = getPlantById(resolvedParams.plantId);
  const [selectedTurbine, setSelectedTurbine] = useState<{
    turbine: Turbine;
    index: number;
  } | null>(null);

  if (!plant) {
    return (
      <div className="px-7 py-6">
        <p className="text-white">Plant not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-[#eeac1d] text-[#111] rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const onlineTurbines = plant.turbines.filter(
    (t) => t.status === "online"
  ).length;
  const totalTurbines = plant.turbines.length;

  const plantAlerts = engineerAlerts.filter(
    (a) => a.plantId === plant.id || !a.plantId
  );

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 lg:px-7 pt-6 pb-6">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-4 lg:mb-6 px-3.5 py-2 rounded-lg border border-[#a5a4a4]/30 hover:bg-[#2c2c2c] transition-colors"
          >
            <ArrowLeft size={16} className="text-white" />
            <span className="font-outfit text-sm text-white font-medium">
              Back
            </span>
          </button>

          {/* Plant Title */}
          <h1 className="font-poppins text-[28px] lg:text-[36px] text-white font-normal mb-2">
            {plant.name}
          </h1>

          {/* System Status */}
          <div className="flex items-center gap-2 text-base lg:text-lg mb-6">
            <span className="text-white font-outfit">Turbines</span>
            <span className="text-[#eeac1d] font-outfit font-semibold">
              {onlineTurbines}/{totalTurbines}
            </span>
            <span className="text-[#1dee4a] font-outfit">Online/Total</span>
          </div>

          {/* Turbines Grid */}
          <div className="space-y-6">
            {plant.turbines.map((turbine, index) => (
              <TurbineSection
                key={turbine.id}
                turbine={turbine}
                index={index + 1}
                onInfoClick={() => setSelectedTurbine({ turbine, index: index + 1 })}
                plantId={plant.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Turbine Info Modal */}
      <TurbineInfoModal
        turbine={selectedTurbine?.turbine || null}
        isOpen={!!selectedTurbine}
        onClose={() => setSelectedTurbine(null)}
        turbineIndex={selectedTurbine?.index || 1}
      />

      {/* Right Sidebar - Fixed, Full Height, Scrollable Content */}
      <aside className="hidden lg:block w-[389px] bg-[#1e1e1e] border-l border-white/10 shrink-0 overflow-hidden">
        <div className="h-full overflow-y-auto px-7 py-6">
          {/* Top Section - Map & Location */}
          <div className="mb-8">
            {/* Map Placeholder */}
            <div className="bg-[#2c2c2c] rounded-xl h-[127px] border border-[#36434e] mb-2 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <p className="text-[#a5a4a4] text-sm font-lato">Map View</p>
                <p className="text-white text-xs font-lato mt-1">{plant.location}</p>
              </div>
            </div>
            {/* Location */}
            <div className="flex items-center justify-between">
              <p className="text-[#a5a4a4] text-[14px] font-poppins font-semibold">
                Location
              </p>
              <p className="text-[#eeac1d] text-[12px] font-poppins">
                {plant.state}
              </p>
            </div>
          </div>

          {/* Alert Trends Chart */}
          <AlertsTrendChart />

          {/* AI Alerts Section */}
          <div className="mb-8">
            <h3 className="text-[#eeac1d] text-[16px] font-lato font-bold mb-3">
              AI Alerts
            </h3>
            <div className="space-y-3">
              {plantAlerts.slice(0, 5).map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          {/* Plant History Chart */}
          <div className="bg-[#2c2c2c] rounded-xl p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-[#eeac1d] text-[16px] font-lato font-bold">
                  Plant history
                </h4>
                <p className="text-[#a5a4a4] text-[14px] font-lato mt-1">
                  Week to week performance
                </p>
              </div>
              <button className="w-[42px] h-[42px] bg-[#2c2c2c] rounded-lg flex items-center justify-center hover:bg-[#3c3c3c] transition-colors">
                <ChevronRight size={18} className="text-[#eeac1d]" />
              </button>
            </div>
            {/* Chart Placeholder */}
            <div className="h-[120px] flex items-end gap-2 mt-6">
              {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-linear-to-t from-[#eeac1d] to-[#ffc34d] rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function AlertCard({ alert }: { alert: AIAlert }) {
  return (
    <div className="bg-[rgba(255,195,77,0.19)] rounded-xl p-4 relative">
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-1">
          <AlertTriangle size={36} className="text-[#eeac1d]" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[#eeac1d] text-[14px] font-lato font-bold mb-1">
            {alert.title}
          </h4>
          <p className="text-white text-[12px] font-lato leading-relaxed">
            {alert.description}
          </p>
        </div>
        <span className="text-white text-[12px] font-lato font-bold shrink-0">
          {alert.timeAgo}
        </span>
      </div>
    </div>
  );
}

function TurbineSection({
  turbine,
  index,
  onInfoClick,
  plantId,
}: {
  turbine: Turbine;
  index: number;
  onInfoClick: () => void;
  plantId: string;
}) {
  const statusColor =
    turbine.status === "online"
      ? "#1dee4a"
      : turbine.status === "warning"
        ? "#f97316"
        : "#ef4444";

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-3 flex gap-3">
      {/* Turbine Info Card (Left) */}
      <div className="w-[170px] shrink-0 border border-[#a5a4a4] rounded-xl p-3 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Chrome size={18} className="text-white" />
          <h3 className="text-white text-[14px] font-medium font-outfit tracking-[-0.154px]">
            Turbine {index}
          </h3>
        </div>

        {/* Model & Serial */}
        <div className="flex flex-col gap-1.5">
          <p className="text-white text-[12px] font-medium font-inter tracking-[-0.154px]">
            {turbine.model}
          </p>
          <p className="text-[#eeac1d] text-[11px] font-light font-outfit">
            {turbine.type}
          </p>
          <p className="text-[#eeac1d] text-[11px] font-light font-outfit">
            {turbine.serialNumber}
          </p>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <p className="text-white text-[12px] font-medium font-inter tracking-[-0.154px]">
            Status
          </p>
          <p
            className="text-[11px] font-light font-outfit capitalize"
            style={{ color: statusColor }}
          >
            {turbine.status}
          </p>
        </div>

        {/* Capacity */}
        <div className="flex flex-col gap-1.5">
          <p className="text-white text-[12px] font-medium font-inter tracking-[-0.154px]">
            Capacity
          </p>
          <p className="text-[#eeac1d] text-[11px] font-light font-outfit">
            {turbine.capacity.iso}MW (ISO)
          </p>
          <p className="text-[#eeac1d] text-[11px] font-light font-outfit">
            {turbine.capacity.net}MW (Net)
          </p>
        </div>

        {/* Manage Button */}
        <Link
          href={`/dashboard/plants/${plantId}/turbines/${turbine.id}`}
          className="border-2 border-[#eeac1d] rounded-xl h-[41px] flex items-center justify-center gap-3 px-6 py-3.5 hover:bg-[#eeac1d]/10 transition-colors"
        >
          <span className="text-[#d8d8d8] text-[16px] font-medium font-outfit">
            Manage
          </span>
          <Settings size={24} className="text-[#d8d8d8]" />
        </Link>

        {/* Info Button */}
        <button
          onClick={onInfoClick}
          className="border-2 border-[#eeac1d] rounded-xl h-[41px] flex items-center justify-center gap-3 px-6 py-3.5 hover:bg-[#eeac1d]/10 transition-colors"
        >
          <span className="text-[#d8d8d8] text-[16px] font-medium font-outfit">
            Info
          </span>
          <Info size={24} className="text-[#d8d8d8]" />
        </button>
      </div>

      {/* Metrics Grid (Right) - 2x2 Grid */}
      <div className="flex-1 flex flex-wrap gap-1.5">
        {/* Generation */}
        <div className="w-[170px] h-[124px] rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-white" />
            <h4 className="text-white text-[14px] font-medium font-outfit tracking-[-0.154px]">
              Generation
            </h4>
          </div>
          <div>
            <p className="font-outfit font-bold text-[20px] leading-none">
              <span className="text-[#eeac1d]">{turbine.metrics.generation.power} </span>
              <span className="text-[#a5a4a4]">mW</span>
            </p>
          </div>
          <div className="space-y-0">
            <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
              <span className="text-[#a5a4a4]">Power</span>
              <span>
                <span className="text-[#eeac1d]">{turbine.metrics.generation.power} </span>
                <span className="text-[#a5a4a4]">mW</span>
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
              <span className="text-[#a5a4a4]">Current</span>
              <span>
                <span className="text-[#eeac1d]">{turbine.metrics.generation.current} </span>
                <span className="text-[#a5a4a4]">mA</span>
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
              <span className="text-[#a5a4a4]">Voltage</span>
              <span>
                <span className="text-[#eeac1d]">{turbine.metrics.generation.voltage} </span>
                <span className="text-[#a5a4a4]">kV</span>
              </span>
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="w-[170px] h-[124px] rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <Thermometer size={18} className="text-white" />
            <h4 className="text-white text-[14px] font-medium font-outfit tracking-[-0.154px]">
              Temperature
            </h4>
          </div>
          <div>
            <p className="font-outfit font-bold text-[20px] leading-none">
              <span className={turbine.type === "Gas Turbine" ? "text-[#ee1d1d]" : "text-[#0062ff]"}>
                {turbine.metrics.temperature.value}
              </span>{" "}
              <span className="text-[#a5a4a4]">°F</span>
            </p>
          </div>
          <div className="space-y-0">
            <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
              <span className="text-[#a5a4a4]">High</span>
              <span>
                <span className="text-[#a5a4a4]">&gt;</span>
                <span className="text-[#eeac1d]"> {turbine.metrics.temperature.high} </span>
                <span className="text-[#a5a4a4]">°F</span>
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
              <span className="text-[#a5a4a4]">Cool</span>
              <span>
                <span className="text-[#a5a4a4]">&lt;</span>
                <span className="text-[#eeac1d]"> {turbine.metrics.temperature.cool} </span>
                <span className="text-[#a5a4a4]">°F</span>
              </span>
            </div>
          </div>
        </div>

        {/* Vibrations */}
        <div className="w-[170px] h-[127px] rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-white" />
            <h4 className="text-white text-[14px] font-medium font-outfit tracking-[-0.154px]">
              Vibrations
            </h4>
          </div>
          <div>
            <p className="font-outfit font-bold text-[20px] leading-none">
              <span className="text-[#eeac1d]">38 </span>
              <span className="text-[#a5a4a4]">mm/s</span>
            </p>
          </div>
          <div className="space-y-0">
            <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
              <span className="text-[#a5a4a4]">Seismic</span>
              <span>
                <span className="text-[#eeac1d]">{turbine.metrics.vibrations.seismic} </span>
                <span className="text-[#a5a4a4]">m/s</span>
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
              <span className="text-[#a5a4a4]">Acceleration</span>
              <span>
                <span className="text-[#eeac1d]">{turbine.metrics.vibrations.acceleration} </span>
                <span className="text-[#a5a4a4]">m/s²</span>
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
              <span className="text-[#a5a4a4]">Displacement</span>
              <span>
                <span className="text-[#eeac1d]">{turbine.metrics.vibrations.displacement} </span>
                <span className="text-[#a5a4a4]">m</span>
              </span>
            </div>
          </div>
        </div>

        {/* Pressure */}
        <div className="w-[170px] h-[127px] rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <Gauge size={18} className="text-white" />
            <h4 className="text-white text-[14px] font-medium font-outfit tracking-[-0.154px]">
              Pressure
            </h4>
          </div>
          <div>
            <p className="font-outfit font-bold text-[20px] leading-none">
              <span className="text-[#eeac1d]">38 </span>
              <span className="text-[#a5a4a4]">{turbine.type === "Gas Turbine" ? "mm/s" : "Pa"}</span>
            </p>
          </div>
          <div className="space-y-0">
            <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
              <span className="text-[#a5a4a4]">
                {turbine.type === "Gas Turbine" ? "Velocity" : "High pressure"}
              </span>
              <span>
                <span className="text-[#eeac1d]">{turbine.metrics.pressure.high} </span>
                <span className="text-[#a5a4a4]">{turbine.type === "Gas Turbine" ? "m/s" : "Pa"}</span>
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
              <span className="text-[#a5a4a4]">
                {turbine.type === "Gas Turbine" ? "Acceleration" : "Low pressure"}
              </span>
              <span>
                <span className="text-[#eeac1d]">{turbine.metrics.pressure.low} </span>
                <span className="text-[#a5a4a4]">{turbine.type === "Gas Turbine" ? "m/s²" : "Pa"}</span>
              </span>
            </div>
            {turbine.type === "Gas Turbine" && (
              <div className="flex items-center gap-3.5 text-[12px] font-medium font-outfit">
                <span className="text-[#a5a4a4]">Displacement</span>
                <span>
                  <span className="text-[#eeac1d]">50 </span>
                  <span className="text-[#a5a4a4]">m</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
