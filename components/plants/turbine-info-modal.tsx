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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e1e] rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 w-full max-w-[596px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-7">
          <h2 className="font-poppins text-[22px] sm:text-[32px] text-white font-normal">
            Overview
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#a5a4a4]/30 mb-4 sm:mb-7" />

        {/* Turbine Info Card */}
        <div className="border border-[#a5a4a4] rounded-xl p-3 sm:p-4 mb-4 sm:mb-7">
          {/* Turbine Icon & Number - Always at top */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#a5a4a4]/30">
            <Chrome size={18} className="text-white" />
            <h3 className="text-white text-[14px] font-medium font-outfit tracking-[-0.154px]">
              Turbine {turbineIndex}
            </h3>
          </div>

          {/* Info Grid - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4 sm:gap-4">
            {/* Model & Type */}
            <div className="flex flex-col gap-1">
              <p className="text-[#a5a4a4] text-[10px] uppercase tracking-wider font-outfit">
                Model
              </p>
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
            <div className="flex flex-col gap-1">
              <p className="text-[#a5a4a4] text-[10px] uppercase tracking-wider font-outfit">
                Control System
              </p>
              <p className="text-[#eeac1d] text-[11px] font-light font-outfit mt-auto">
                {turbine.controlSystem}
              </p>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1">
              <p className="text-[#a5a4a4] text-[10px] uppercase tracking-wider font-outfit">
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
            <div className="flex flex-col gap-1">
              <p className="text-[#a5a4a4] text-[10px] uppercase tracking-wider font-outfit">
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
        </div>

        {/* Description Section */}
        <div className="border-l-[2px] border-[#ffc34d] pl-4 sm:pl-6 py-2 mb-4 sm:mb-7">
          <p className="font-poppins text-[13px] sm:text-[16px] text-[#b0b0b0] font-medium leading-relaxed">
            Each turbine within the plant is managed by a dedicated technical
            team. Roles have been assigned to ensure efficient operation, timely
            maintenance, and accurate monitoring of performance data. Review the
            responsibilities below to understand your assigned tasks.
          </p>
        </div>

        {/* Roles Section */}
        <div className="px-0 sm:px-6 py-2 space-y-4 sm:space-y-3 mb-4 sm:mb-7">
          {/* Operations Supervisor */}
          <div>
            <h4 className="text-[#ffc34d] font-poppins text-[14px] sm:text-[16px] font-medium mb-1">
              Operations Supervisor
            </h4>
            <p className="text-white font-poppins text-[13px] sm:text-[16px] font-medium leading-relaxed">
              Oversees daily turbine operations, monitors performance indicators,
              coordinates with control room operators, ensures all operational
              procedures are followed, and manages reporting shifts.
            </p>
          </div>

          {/* Maintenance Engineer */}
          <div>
            <h4 className="text-[#ffc34d] font-poppins text-[14px] sm:text-[16px] font-medium mb-1">
              Maintenance Engineer
            </h4>
            <p className="text-white font-poppins text-[13px] sm:text-[16px] font-medium leading-relaxed">
              Conducts preventive and corrective maintenance activities, reviews
              vibration and temperature trends, schedules part replacements, and
              ensures turbine reliability and safety compliance.
            </p>
          </div>
        </div>

        {/* Turbine Image */}
        <div className="w-full rounded-lg overflow-hidden bg-[#2c2c2c]">
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
