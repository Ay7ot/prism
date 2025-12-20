"use client";

import { useState } from "react";
import { Clock, Target, TrendingUp, CheckCircle2, AlertCircle, FileText } from "lucide-react";

// ERPC Unit: Evaluation, Reliability, Planning & Comparative
// Key metrics: MTBF, MTTR, RCA tracking, Benchmarking

const reliabilityMetrics = {
  mtbf: {
    current: 720, // hours
    target: 840,
    previous: 650,
    trend: "up",
  },
  mttr: {
    current: 4.2, // hours
    target: 3.5,
    previous: 5.8,
    trend: "down",
  },
  availability: {
    current: 94.2, // %
    target: 96.0,
    previous: 91.5,
    trend: "up",
  },
  plannedOutages: {
    current: 12,
    ytd: 48,
  },
  unplannedOutages: {
    current: 3,
    ytd: 15,
  },
};

const rcaTracking = [
  {
    id: "RCA-2024-015",
    date: "2024-12-15",
    plant: "Geregu NIPP",
    turbine: "GT21",
    incident: "72-hour outage - Lube oil system failure",
    rootCause: "Oil cooler fouling due to cooling water contamination",
    status: "completed",
    daysOpen: 5,
    preventable: true,
    costImpact: 450000000,
    correctiveActions: [
      "Install online oil quality monitoring",
      "Implement water treatment protocol",
      "Schedule quarterly oil cooler inspections",
    ],
  },
  {
    id: "RCA-2024-014",
    date: "2024-12-10",
    plant: "Olorunsogo",
    turbine: "GT11",
    incident: "Vibration anomaly trip",
    rootCause: "Bearing misalignment after maintenance",
    status: "completed",
    daysOpen: 8,
    preventable: true,
    costImpact: 120000000,
    correctiveActions: [
      "Enhanced alignment procedures",
      "Mandatory vibration checks post-maintenance",
      "Staff retraining on bearing installation",
    ],
  },
  {
    id: "RCA-2024-013",
    date: "2024-12-05",
    plant: "Geregu NIPP",
    turbine: "GT22",
    incident: "Fuel pressure instability",
    rootCause: "Gas quality degradation - supplier issue",
    status: "in_progress",
    daysOpen: 15,
    preventable: false,
    costImpact: 95000000,
    correctiveActions: [
      "Engage gas supplier on quality standards",
      "Install inline gas quality monitoring",
      "Review supply contract penalties",
    ],
  },
  {
    id: "RCA-2024-012",
    date: "2024-11-28",
    plant: "Omotosho",
    turbine: "GT13",
    incident: "Cooling water pump failure",
    rootCause: "Impeller cavitation - low NPSH",
    status: "completed",
    daysOpen: 12,
    preventable: true,
    costImpact: 65000000,
    correctiveActions: [
      "Redesign suction piping",
      "Install pressure sensors",
      "Implement condition monitoring",
    ],
  },
];

const plantBenchmarking = [
  {
    plant: "Olorunsogo",
    mtbf: 820,
    mttr: 3.8,
    availability: 95.8,
    rank: 1,
  },
  {
    plant: "Alaoji",
    mtbf: 780,
    mttr: 4.0,
    availability: 94.5,
    rank: 2,
  },
  {
    plant: "Geregu",
    mtbf: 720,
    mttr: 4.2,
    availability: 94.2,
    rank: 3,
  },
  {
    plant: "Omotosho",
    mtbf: 690,
    mttr: 4.5,
    availability: 93.8,
    rank: 4,
  },
  {
    plant: "Calabar",
    mtbf: 650,
    mttr: 5.0,
    availability: 92.5,
    rank: 5,
  },
];

export default function ERPCDashboardPage() {
  const [selectedRCA, setSelectedRCA] = useState<string | null>(null);

  const currentRCA = rcaTracking.find((rca) => rca.id === selectedRCA);

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 lg:px-7 lg:py-7">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white mb-2">
              <span className="text-[22px] font-light tracking-wide" style={{ fontFamily: "var(--font-lato)" }}>
                Welcome,
              </span>
              <span className="text-[26px] font-bold" style={{ fontFamily: "var(--font-lato)" }}>
                MD/CEO
              </span>
            </div>
            <h1 className="text-4xl text-white" style={{ fontFamily: "var(--font-poppins)" }}>
              ERPC Dashboard
            </h1>
            <p className="text-[#a5a4a4] text-sm mt-2 font-lato">
              Evaluation, Reliability, Planning & Comparative Unit
            </p>
          </div>

          {/* Key Reliability Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
            {/* MTBF */}
            <div className="bg-[#1e1e1e] rounded-[12px] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-[#1dee4a]" />
                  <p className="text-white text-sm font-outfit font-semibold">MTBF</p>
                </div>
                <TrendingUp size={16} className="text-[#1dee4a]" />
              </div>
              <p className="text-3xl font-outfit font-bold text-[#1dee4a] mb-1">
                {reliabilityMetrics.mtbf.current}
              </p>
              <p className="text-[#a5a4a4] text-sm font-lato mb-3">hours (Mean Time Between Failures)</p>
              <div className="flex items-center justify-between text-xs font-lato">
                <span className="text-[#a5a4a4]">Target: {reliabilityMetrics.mtbf.target}h</span>
                <span className="text-[#1dee4a]">↑ from {reliabilityMetrics.mtbf.previous}h</span>
              </div>
            </div>

            {/* MTTR */}
            <div className="bg-[#1e1e1e] rounded-[12px] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target size={20} className="text-[#eeac1d]" />
                  <p className="text-white text-sm font-outfit font-semibold">MTTR</p>
                </div>
                <TrendingUp size={16} className="text-[#1dee4a]" />
              </div>
              <p className="text-3xl font-outfit font-bold text-[#eeac1d] mb-1">
                {reliabilityMetrics.mttr.current}
              </p>
              <p className="text-[#a5a4a4] text-sm font-lato mb-3">hours (Mean Time To Repair)</p>
              <div className="flex items-center justify-between text-xs font-lato">
                <span className="text-[#a5a4a4]">Target: {reliabilityMetrics.mttr.target}h</span>
                <span className="text-[#1dee4a]">↓ from {reliabilityMetrics.mttr.previous}h</span>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-[#1e1e1e] rounded-[12px] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#1dee4a]" />
                  <p className="text-white text-sm font-outfit font-semibold">Availability</p>
                </div>
                <TrendingUp size={16} className="text-[#1dee4a]" />
              </div>
              <p className="text-3xl font-outfit font-bold text-[#1dee4a] mb-1">
                {reliabilityMetrics.availability.current}%
              </p>
              <p className="text-[#a5a4a4] text-sm font-lato mb-3">Fleet-wide performance</p>
              <div className="flex items-center justify-between text-xs font-lato">
                <span className="text-[#a5a4a4]">Target: {reliabilityMetrics.availability.target}%</span>
                <span className="text-[#1dee4a]">↑ from {reliabilityMetrics.availability.previous}%</span>
              </div>
            </div>
          </div>

          {/* Outage Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#1e1e1e] rounded-[12px] p-6">
              <h3 className="text-white font-poppins text-xl mb-4">Outage Statistics (This Month)</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#2c2c2c] rounded-lg">
                  <div>
                    <p className="text-white text-sm font-outfit font-medium">Planned Outages</p>
                    <p className="text-[#a5a4a4] text-xs font-lato mt-1">Scheduled maintenance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#1dee4a] text-2xl font-outfit font-bold">
                      {reliabilityMetrics.plannedOutages.current}
                    </p>
                    <p className="text-[#a5a4a4] text-xs font-lato">{reliabilityMetrics.plannedOutages.ytd} YTD</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#2c2c2c] rounded-lg">
                  <div>
                    <p className="text-white text-sm font-outfit font-medium">Unplanned Outages</p>
                    <p className="text-[#a5a4a4] text-xs font-lato mt-1">Internal technical trips</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#ee1d1d] text-2xl font-outfit font-bold">
                      {reliabilityMetrics.unplannedOutages.current}
                    </p>
                    <p className="text-[#a5a4a4] text-xs font-lato">{reliabilityMetrics.unplannedOutages.ytd} YTD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plant Benchmarking */}
            <div className="bg-[#1e1e1e] rounded-[12px] p-6">
              <h3 className="text-white font-poppins text-xl mb-4">Plant Performance Ranking</h3>
              <div className="space-y-2">
                {plantBenchmarking.map((plant) => (
                  <div
                    key={plant.plant}
                    className="flex items-center justify-between p-3 bg-[#2c2c2c] rounded-lg hover:bg-[#3c3c3c] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-outfit font-bold text-sm ${
                          plant.rank === 1
                            ? "bg-[#1dee4a] text-[#111]"
                            : plant.rank === 2
                            ? "bg-[#eeac1d] text-[#111]"
                            : "bg-[#2c2c2c] text-white border border-[#a5a4a4]"
                        }`}
                      >
                        {plant.rank}
                      </div>
                      <p className="text-white text-sm font-outfit font-medium">{plant.plant}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-lato">
                      <div className="text-right">
                        <p className="text-[#a5a4a4]">MTBF</p>
                        <p className="text-white font-medium">{plant.mtbf}h</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#a5a4a4]">Avail</p>
                        <p className="text-white font-medium">{plant.availability}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RCA Tracking */}
          <div className="bg-[#1e1e1e] rounded-[12px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-poppins text-xl">Root Cause Analysis (RCA) Tracking</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#1dee4a]" />
                  <span className="text-[#a5a4a4] text-sm font-lato">Completed</span>
                </div>
                <div className="flex items-center gap-1.5 ml-3">
                  <div className="w-3 h-3 rounded-full bg-[#eeac1d]" />
                  <span className="text-[#a5a4a4] text-sm font-lato">In Progress</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {rcaTracking.map((rca) => (
                <div
                  key={rca.id}
                  className="bg-[#2c2c2c] rounded-lg p-4 hover:bg-[#3c3c3c] transition-all cursor-pointer"
                  onClick={() => setSelectedRCA(rca.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-outfit px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: rca.status === "completed" ? "rgba(30,222,74,0.2)" : "rgba(238,172,29,0.2)",
                            color: rca.status === "completed" ? "#1dee4a" : "#eeac1d",
                          }}
                        >
                          {rca.id}
                        </span>
                        <span className="text-[#a5a4a4] text-xs font-lato">
                          {new Date(rca.date).toLocaleDateString("en-GB")}
                        </span>
                        {rca.status === "in_progress" && (
                          <span className="text-[#eeac1d] text-xs font-outfit">● {rca.daysOpen} days open</span>
                        )}
                      </div>
                      <p className="text-white text-sm font-outfit font-semibold mb-1">
                        {rca.plant} - {rca.turbine}
                      </p>
                      <p className="text-[#eeac1d] text-sm font-lato mb-1">{rca.incident}</p>
                      <p className="text-[#a5a4a4] text-xs font-lato">Root Cause: {rca.rootCause}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-[#ee1d1d] text-sm font-outfit font-bold">
                        ₦{(rca.costImpact / 1000000).toFixed(0)}M
                      </p>
                      <p className="text-[#a5a4a4] text-xs font-lato">Impact</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - RCA Details */}
      {currentRCA && (
        <aside className="w-[389px] bg-[#1e1e1e] border-l border-white/10 shrink-0 overflow-y-auto">
          <div className="px-7 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-poppins text-lg">RCA Details</h3>
              <button
                onClick={() => setSelectedRCA(null)}
                className="text-[#a5a4a4] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Reference</p>
                <p className="text-white text-sm font-outfit font-semibold">{currentRCA.id}</p>
              </div>

              <div>
                <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Date</p>
                <p className="text-white text-sm font-lato">{new Date(currentRCA.date).toLocaleDateString("en-GB")}</p>
              </div>

              <div>
                <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Location</p>
                <p className="text-white text-sm font-outfit">
                  {currentRCA.plant} - {currentRCA.turbine}
                </p>
              </div>

              <div>
                <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Incident</p>
                <p className="text-[#eeac1d] text-sm font-lato">{currentRCA.incident}</p>
              </div>

              <div>
                <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Root Cause</p>
                <p className="text-white text-sm font-lato">{currentRCA.rootCause}</p>
              </div>

              <div>
                <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Financial Impact</p>
                <p className="text-[#ee1d1d] text-2xl font-outfit font-bold">
                  ₦{(currentRCA.costImpact / 1000000).toFixed(0)}M
                </p>
              </div>

              <div>
                <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Preventable?</p>
                <span
                  className={`text-sm font-outfit px-2 py-1 rounded ${
                    currentRCA.preventable
                      ? "bg-[rgba(238,172,29,0.2)] text-[#eeac1d]"
                      : "bg-[rgba(165,164,164,0.2)] text-[#a5a4a4]"
                  }`}
                >
                  {currentRCA.preventable ? "Yes - Predictive could prevent" : "External factor"}
                </span>
              </div>

              <div>
                <p className="text-[#a5a4a4] text-xs font-outfit mb-2">Corrective Actions</p>
                <div className="space-y-2">
                  {currentRCA.correctiveActions.map((action, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#1dee4a] mt-0.5 shrink-0" />
                      <p className="text-white text-xs font-lato">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`p-3 rounded-lg ${
                  currentRCA.status === "completed"
                    ? "bg-[rgba(30,222,74,0.1)] border border-[#1dee4a]/30"
                    : "bg-[rgba(238,172,29,0.1)] border border-[#eeac1d]/30"
                }`}
              >
                <p
                  className={`text-sm font-outfit font-bold ${
                    currentRCA.status === "completed" ? "text-[#1dee4a]" : "text-[#eeac1d]"
                  }`}
                >
                  Status: {currentRCA.status === "completed" ? "Completed" : "In Progress"}
                </p>
                {currentRCA.status === "in_progress" && (
                  <p className="text-[#a5a4a4] text-xs font-lato mt-1">{currentRCA.daysOpen} days since incident</p>
                )}
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

