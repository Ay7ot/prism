"use client";

import { useState } from "react";
import { NigeriaMapReal } from "@/components/executive/nigeria-map-real";
import { plants, getTotalStats } from "@/lib/data/plants";
import { Sparkles, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { PrismIcon } from "@/components/ui/prism-logo";
import Link from "next/link";

// Mock data for staff leaderboard
const plantStaff = [
  { id: "1", name: "Akujiobi Chime", role: "Plant Director", rank: 1, change: "up" },
  { id: "2", name: "Austine Lawal", role: "COO", rank: 2, change: "up" },
  { id: "3", name: "Michelle Obi", role: "HOD Electricals", rank: 3, change: "up" },
];

// Mock data for departments
const departments = [
  { id: "1", name: "Electrical", staff: "52 Staffs", rank: 1, change: "up" },
  { id: "2", name: "Mechanical", staff: "5 Staffs", rank: 2, change: "down" },
  { id: "3", name: "Sales", staff: "21 Staffs", rank: 3, change: "up" },
];

export default function ExecutiveDashboardPage() {
  const [selectedPlant, setSelectedPlant] = useState<string | null>("olorunsogo");
  const stats = getTotalStats();

  const currentPlant = plants.find((p) => p.id === selectedPlant);

  // AI Insights (green cards)
  const aiInsights = [
    {
      id: "1",
      message: "Strategy Milestone: Digital transformation project Phase 2 completed",
      time: "10m",
    },
    {
      id: "2",
      message: "On-time delivery improved to 93.2%, exceeding target",
      time: "10m",
    },
  ];

  // AI Alerts (warning cards)
  const aiAlerts = [
    {
      id: "1",
      title: "Training Certification Due",
      message: "25 operators require safety recertification by month end",
      time: "10m",
    },
    {
      id: "2",
      title: "Certification expiry",
      message: "Five technicians approaching certification expiry within 30 days",
      time: "2h",
    },
    {
      id: "3",
      title: "Logistics delay",
      message: "Logistics delay causing maintenance outage extension at Omotosho Plant.",
      time: "4h",
    },
    {
      id: "4",
      title: "Admin approvals pending",
      message: "13 requests exceeded SLA time.",
      time: "5h",
    },
  ];

  return (
    <div className="relative h-[calc(100vh-80px)] bg-[#111]">
      {/* Main Content */}
      <div className="h-full overflow-y-auto">
        <div className="px-4 py-6 lg:px-7 lg:py-7 lg:pr-[420px] w-full">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white mb-2">
              <span className="text-[22px] font-light tracking-wide" style={{ fontFamily: "var(--font-lato)" }}>
                Welcome,
              </span>
              <span className="text-[26px] font-bold" style={{ fontFamily: "var(--font-lato)" }}>
                ED
              </span>
            </div>
            <h1 className="text-4xl text-white" style={{ fontFamily: "var(--font-poppins)" }}>
              Overview
            </h1>
          </div>

          {/* KPI Cards Row */}
          <div className="flex flex-wrap gap-4 lg:gap-5 mb-6">
            <div className="bg-[#1e1e1e] rounded-[12px] p-3 w-[170px] h-[89px] flex flex-col justify-between">
              <p className="text-white text-sm font-outfit font-medium tracking-[-0.154px]">Plants</p>
              <div className="flex items-center justify-between">
                <p className="font-outfit font-bold text-[24px]">
                  <span className="text-[#1dee4a]">{stats.onlinePlants}</span>
                  <span className="text-[#a5a4a4]">/{stats.totalPlants}</span>
                </p>
                <p className="text-[12px] font-outfit font-medium tracking-[-0.154px]">
                  <span className="text-[#1dee4a]">Online</span>
                  <span className="text-white"> / Total</span>
                </p>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-[12px] p-3 w-[170px] h-[89px] flex flex-col justify-between">
              <p className="text-white text-sm font-outfit font-medium tracking-[-0.154px]">Total Workforce</p>
              <div className="flex items-center justify-between">
                <p className="font-outfit font-bold text-[24px] text-[#a5a4a4]">1,248</p>
                <p className="text-[12px] font-outfit font-medium tracking-[-0.154px]">
                  <span className="text-[#1dee4a]">+12 </span>
                  <span className="text-white">new hires</span>
                </p>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative bg-[#212121] rounded-[12px] overflow-hidden mb-6" style={{ height: "532px" }}>
            <NigeriaMapReal
              selectedPlant={selectedPlant}
              onPlantClick={setSelectedPlant}
              className="absolute inset-0"
            />

            {/* Plant Popup Card */}
            {currentPlant && (
              <div className="absolute left-[29%] top-[40%] -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e] rounded-[12px] p-3 w-[350px] flex flex-col gap-[13px] z-20">
                <div className="border border-[#a5a4a4] rounded-[12px] p-3 flex flex-wrap gap-[18px_53px]">
                  <div className="flex items-start justify-between w-[78px]">
                    <div className="w-[18px] h-[18px] bg-[#eeac1d] rounded-full flex items-center justify-center">
                      <div className="w-[8px] h-[8px] bg-[#111] rounded-full" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white text-sm font-outfit font-medium tracking-[-0.154px]">Plant 2</p>
                      <p className="text-[#1dee4a] text-[11px] font-outfit font-light">Online</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[6px]">
                    <p className="text-white text-[12px] font-inter font-medium tracking-[-0.154px] w-[143px]">
                      {currentPlant.name}
                    </p>
                    <p className="text-[#eeac1d] text-[11px] font-outfit font-light">{currentPlant.location}</p>
                  </div>

                  <div className="flex flex-col gap-[6px] w-[260px]">
                    <p className="text-white text-[12px] font-inter font-medium tracking-[-0.154px]">Turbines</p>
                    <p className="text-[11px] font-outfit font-light">
                      <span className="text-[#eeac1d]">
                        {currentPlant.turbines.filter((t) => t.type === "Gas Turbine").length}{" "}
                      </span>
                      <span className="text-[#a5a4a4]">GE Frame 9E Gas Turbines</span>
                    </p>
                    <p className="text-[11px] font-outfit font-light">
                      <span className="text-[#eeac1d]">
                        {currentPlant.turbines.filter((t) => t.type === "Steam Turbine").length}{" "}
                      </span>
                      <span className="text-[#a5a4a4]">GE Steam Turbines</span>
                    </p>
                  </div>

                  <div className="flex gap-[18px] w-[302px]">
                    <Link
                      href={`/dashboard/plants/${currentPlant.id}`}
                      className="flex-1 bg-[#eeac1d] h-[41px] rounded-[12px] flex items-center justify-center gap-3 hover:bg-[#ffc34d] transition-colors"
                    >
                      <PrismIcon size={21} className="text-[#2c2c2c]" />
                      <span className="text-[#2c2c2c] text-base font-outfit font-medium">AI Alerts</span>
                    </Link>
                    <Link
                      href={`/dashboard/plants/${currentPlant.id}`}
                      className="flex-1 bg-[#357036] h-[41px] rounded-[12px] flex items-center justify-center gap-3 hover:bg-[#4a8a4d] transition-colors"
                    >
                      <PrismIcon color="white" size={21} />
                      <span className="text-white text-base font-outfit font-medium">AI Alerts</span>
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between w-[115px]">
                    <p className="text-[#a5a4a4] text-sm font-outfit font-medium tracking-[-0.154px]">Workforce</p>
                    <p className="text-[#a5a4a4] text-[24px] font-outfit font-bold">{currentPlant.workforce}</p>
                  </div>
                  <p className="text-[12px] font-outfit font-medium tracking-[-0.154px]">
                    <span className="text-[#1dee4a]">+2 </span>
                    <span className="text-white">new hires</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Featured Plant Section */}
          <div className="mb-6">
            <h2 className="text-white font-poppins text-[32px] mb-3">Alaoji Power Plant</h2>
            <div className="flex items-center gap-3">
              <p className="text-white text-sm font-outfit font-medium tracking-[-0.154px]">Turbines</p>
              <p className="font-outfit font-bold text-[24px]">
                <span className="text-[#1dee4a]">6</span>
                <span className="text-[#a5a4a4]">/6</span>
              </p>
              <p className="text-[12px] font-outfit font-medium tracking-[-0.154px]">
                <span className="text-[#1dee4a]">Online</span>
                <span className="text-white"> / Total</span>
              </p>
            </div>
          </div>

          {/* Bottom Leaderboards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Departments Leaderboard */}
            <div className="bg-[#1e1e1e] rounded-[20px] border border-[#eff0f6]/20 p-6">
              <h3 className="text-[#a5a4a4] font-outfit font-semibold text-sm mb-4">Departments</h3>
              <div className="space-y-0">
                {departments.map((dept, idx) => (
                  <div
                    key={dept.id}
                    className="h-[66px] flex items-center justify-between hover:bg-[#2c2c2c] transition-colors rounded-lg px-3"
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 w-[30px]">
                        {dept.change === "up" ? (
                          <TrendingUp size={12} className="text-[#1dee4a]" />
                        ) : (
                          <TrendingDown size={12} className="text-[#ee1d1d]" />
                        )}
                        <span className="text-white font-inter font-semibold text-base tracking-[-0.2px]">
                          {idx + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-sm font-outfit font-semibold leading-[18px]">{dept.name}</p>
                        <p className="text-[#808080] text-[12px] font-outfit font-medium">{dept.staff}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plant Staffs Leaderboard */}
            <div className="bg-[#1e1e1e] rounded-[20px] border border-[#eff0f6]/20 p-6">
              <h3 className="text-[#a5a4a4] font-outfit font-semibold text-sm mb-4">Plant Staffs</h3>
              <div className="space-y-0">
                {plantStaff.map((staff) => (
                  <div
                    key={staff.id}
                    className="h-[66px] flex items-center justify-between hover:bg-[#2c2c2c] transition-colors rounded-lg px-3"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-[42px] h-[42px] rounded-full bg-[#eeac1d] flex items-center justify-center text-[#111] font-bold text-sm">
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-white text-sm font-outfit font-semibold leading-[18px]">{staff.name}</p>
                        <p className="text-[#a5a4a4] text-[12px] font-inter font-medium">{staff.role}</p>
                      </div>
                    </div>
                    <button className="text-white text-base font-outfit font-semibold hover:text-[#eeac1d] transition-colors">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Fixed */}
      <aside className="hidden lg:block w-[389px] bg-[#1e1e1e] border-l border-white/10 flex-shrink-0 fixed right-0 top-20 h-[calc(100vh-80px)] overflow-y-auto">
        <div className="px-7 py-6">
          {/* AI Insights */}
          <div className="mb-8">
            <h3 className="text-white font-lato font-bold text-base mb-3">AI Insights</h3>
            <div className="space-y-3">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-[rgba(41,75,42,0.4)] rounded-[12px] px-[22px] py-2 flex items-center gap-2 min-h-[84px]"
                >
                  <Sparkles size={36} className="text-[#1dee4a] shrink-0" />
                  <p className="text-white text-[12px] font-lato leading-[18px] flex-1">{insight.message}</p>
                  <p className="text-white text-[12px] font-lato font-bold text-right w-[25px] shrink-0">
                    {insight.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Alerts */}
          <div>
            <h3 className="text-white font-lato font-bold text-base mb-3">AI Alerts</h3>
            <div className="space-y-3">
              {aiAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-[rgba(255,195,77,0.19)] rounded-[12px] px-[22px] py-2 flex items-center gap-2 min-h-[84px]"
                >
                  <AlertTriangle size={36} className="text-[#eeac1d] shrink-0" />
                  <div className="flex-1">
                    <p className="text-[#eeac1d] text-[14px] font-lato font-bold leading-[21px]">{alert.title}</p>
                    <p className="text-white text-[12px] font-lato leading-[18px]">{alert.message}</p>
                  </div>
                  <p className="text-white text-[12px] font-lato font-bold text-right w-[25px] shrink-0">
                    {alert.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
