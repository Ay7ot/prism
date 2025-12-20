"use client";

import { X, Chrome } from "lucide-react";
import type { Turbine } from "@/lib/data/plants";

interface TurbineInfoModalProps {
  turbine: Turbine | null;
  isOpen: boolean;
  onClose: () => void;
  turbineIndex: number;
}

export function TurbineInfoModal({
  turbine,
  isOpen,
  onClose,
  turbineIndex,
}: TurbineInfoModalProps) {
  if (!isOpen || !turbine) return null;

  const statusColor =
    turbine.status === "online"
      ? "#1dee4a"
      : turbine.status === "warning"
        ? "#f97316"
        : "#ef4444";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e1e] rounded-[20px] p-6 w-full max-w-[596px] max-h-[90vh] overflow-y-auto m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="font-poppins text-[32px] text-white font-normal">
            Overview
          </h2>
          <button
            onClick={onClose}
            className="w-6 h-6 text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#a5a4a4]/30 mb-7" />

        {/* Turbine Info Card */}
        <div className="border border-[#a5a4a4] rounded-xl p-3 mb-7 flex gap-5">
          {/* Turbine Icon & Number */}
          <div className="flex items-center gap-2 shrink-0">
            <Chrome size={18} className="text-white" />
            <h3 className="text-white text-[14px] font-medium font-outfit tracking-[-0.154px]">
              Turbine {turbineIndex}
            </h3>
          </div>

          {/* Model & Type */}
          <div className="flex flex-col gap-1.5 flex-1">
            <p className="text-white text-[12px] font-medium font-inter tracking-[-0.154px]">
              {turbine.model}
            </p>
            <p className="text-[#eeac1d] text-[11px] font-light font-outfit">
              {turbine.manufacturer}
            </p>
            <p className="text-[#eeac1d] text-[11px] font-light font-outfit">
              {turbine.type}
            </p>
            <p className="text-[#a5a4a4] text-[10px] font-light font-outfit">
              S/N: {turbine.serialNumber}
            </p>
          </div>

          {/* Control System */}
          <div className="flex flex-col gap-1.5 shrink-0">
            <p className="text-white text-[12px] font-medium font-inter tracking-[-0.154px]">
              Control System
            </p>
            <p className="text-[#eeac1d] text-[11px] font-light font-outfit">
              {turbine.controlSystem}
            </p>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5 shrink-0">
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
          <div className="flex flex-col gap-1.5 shrink-0">
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
        </div>

        {/* Description Section */}
        <div className="border-l-[1px] border-[#ffc34d] pl-6 py-2 mb-7">
          <p className="font-poppins text-[16px] text-[#b0b0b0] font-medium leading-normal">
            Each turbine within the plant is managed by a dedicated technical
            team. Roles have been assigned to ensure efficient operation, timely
            maintenance, and accurate monitoring of performance data. Review the
            responsibilities below to understand your assigned tasks.
          </p>
        </div>

        {/* Roles Section */}
        <div className="px-6 py-2 space-y-3 mb-7">
          {/* Operations Supervisor */}
          <div>
            <h4 className="text-[#ffc34d] font-poppins text-[16px] font-medium mb-1">
              Operations Supervisor
            </h4>
            <p className="text-white font-poppins text-[16px] font-medium leading-normal">
              Oversees daily turbine operations, monitors performance indicators,
              coordinates with control room operators, ensures all operational
              procedures are followed, and manages reporting shifts.
            </p>
          </div>

          {/* Maintenance Engineer */}
          <div>
            <h4 className="text-[#ffc34d] font-poppins text-[16px] font-medium mb-1">
              Maintenance Engineer
            </h4>
            <p className="text-white font-poppins text-[16px] font-medium leading-normal">
              Conducts preventive and corrective maintenance activities, reviews
              vibration and temperature trends, schedules part replacements, and
              ensures turbine reliability and safety compliance.
            </p>
          </div>
        </div>

        {/* Turbine Image */}
        <div className="w-full h-[222px] rounded-lg overflow-hidden bg-[#2c2c2c]">
          <img
            src="/turbine.png"
            alt={`${turbine.name} - ${turbine.type}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        </div>
      </div>
    </div>
  );
}
