"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

// Asset health data based on brief sections 1-5
const assetCategories = [
  {
    id: "gas-turbine",
    name: "Gas Turbine Systems",
    priority: "Critical",
    riskLevel: "medium",
    healthScore: 78,
    trend: "up",
    description: "Highest financial risk - GT21 emphasis",
    assets: [
      { name: "Rotor & Disk Assembly", status: "healthy", risk: "low", lastCheck: "2h ago" },
      { name: "Turbine Buckets/Blades", status: "healthy", risk: "low", lastCheck: "2h ago" },
      { name: "Combustor Liners & Fuel Nozzles", status: "warning", risk: "medium", lastCheck: "1h ago" },
      { name: "Exhaust Temperature Spread", status: "alert", risk: "high", lastCheck: "15m ago" },
      { name: "IGVs & Servo Actuation", status: "healthy", risk: "low", lastCheck: "3h ago" },
      { name: "Compressor Stages", status: "healthy", risk: "low", lastCheck: "2h ago" },
      { name: "Journal & Thrust Bearings", status: "warning", risk: "medium", lastCheck: "1h ago" },
      { name: "Shaft Vibration & Orbit", status: "healthy", risk: "low", lastCheck: "30m ago" },
      { name: "Lube Oil System", status: "healthy", risk: "low", lastCheck: "1h ago" },
      { name: "Hydraulic Actuation Systems", status: "healthy", risk: "low", lastCheck: "2h ago" },
    ],
  },
  {
    id: "generator",
    name: "Generator & Electrical Systems",
    priority: "Critical",
    riskLevel: "low",
    healthScore: 92,
    trend: "stable",
    description: "Instant 100% MW loss risk",
    assets: [
      { name: "Rotor Windings (PD & Insulation)", status: "healthy", risk: "low", lastCheck: "1h ago" },
      { name: "Stator Core / Slot Heating", status: "healthy", risk: "low", lastCheck: "2h ago" },
      { name: "AVR / Excitation Controls", status: "healthy", risk: "low", lastCheck: "30m ago" },
      { name: "Slip Rings / Diodes", status: "healthy", risk: "low", lastCheck: "3h ago" },
      { name: "Generator Protection Relays", status: "healthy", risk: "low", lastCheck: "1h ago" },
      { name: "Generator Bearings", status: "healthy", risk: "low", lastCheck: "2h ago" },
      { name: "Hydrogen Cooling & Seal", status: "healthy", risk: "low", lastCheck: "1h ago" },
    ],
  },
  {
    id: "transformer",
    name: "Transformers",
    priority: "High",
    riskLevel: "medium",
    healthScore: 81,
    trend: "down",
    description: "Long-duration outage risk",
    assets: [
      { name: "Dissolved Gas Analysis (DGA)", status: "warning", risk: "medium", lastCheck: "4h ago" },
      { name: "Bushing Insulation", status: "healthy", risk: "low", lastCheck: "6h ago" },
      { name: "OLTC Contact Health", status: "healthy", risk: "low", lastCheck: "12h ago" },
      { name: "Unit Auxiliary Transformers", status: "healthy", risk: "low", lastCheck: "3h ago" },
      { name: "SF₆ / GIS Interfaces", status: "healthy", risk: "low", lastCheck: "8h ago" },
    ],
  },
  {
    id: "gas-station",
    name: "Gas Station & Fuel Supply",
    priority: "High",
    riskLevel: "high",
    healthScore: 65,
    trend: "down",
    description: "Internal trip frequency driver",
    assets: [
      { name: "Gas Compressors/Boosters", status: "warning", risk: "medium", lastCheck: "30m ago" },
      { name: "Fuel Pressure Stability", status: "alert", risk: "high", lastCheck: "10m ago" },
      { name: "Wobbe Index & Fuel Quality", status: "warning", risk: "medium", lastCheck: "1h ago" },
      { name: "Moisture & Dew Point", status: "healthy", risk: "low", lastCheck: "2h ago" },
      { name: "Entrained Liquids & Particulates", status: "warning", risk: "medium", lastCheck: "1h ago" },
      { name: "Gas Heating System", status: "healthy", risk: "low", lastCheck: "3h ago" },
      { name: "Fuel Gas Control Valves", status: "healthy", risk: "low", lastCheck: "1h ago" },
      { name: "Filters / Coalescers (DP)", status: "warning", risk: "medium", lastCheck: "45m ago" },
    ],
  },
  {
    id: "bop",
    name: "Balance of Plant (BOP)",
    priority: "Medium",
    riskLevel: "low",
    healthScore: 88,
    trend: "up",
    description: "Frequent but underestimated loss driver",
    assets: [
      { name: "Cooling Water Pumps", status: "healthy", risk: "low", lastCheck: "2h ago" },
      { name: "ACC / Fin-Fan Units", status: "healthy", risk: "low", lastCheck: "3h ago" },
      { name: "Air Intake System & Filters", status: "healthy", risk: "low", lastCheck: "4h ago" },
      { name: "GT Enclosure HVAC", status: "healthy", risk: "low", lastCheck: "1h ago" },
      { name: "UPS & Battery Banks", status: "warning", risk: "medium", lastCheck: "6h ago" },
      { name: "Fire Suppression Interlocks", status: "healthy", risk: "low", lastCheck: "12h ago" },
      { name: "LV Boards & MCCs", status: "healthy", risk: "low", lastCheck: "2h ago" },
    ],
  },
];

export default function AssetHealthPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const overallHealthScore = Math.round(
    assetCategories.reduce((sum, cat) => sum + cat.healthScore, 0) / assetCategories.length
  );

  const currentCategory = selectedCategory
    ? assetCategories.find((cat) => cat.id === selectedCategory)
    : null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "#ee1d1d";
      case "medium":
        return "#eeac1d";
      case "low":
        return "#1dee4a";
      default:
        return "#a5a4a4";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "alert":
        return <AlertTriangle size={16} className="text-[#ee1d1d]" />;
      case "warning":
        return <AlertTriangle size={16} className="text-[#eeac1d]" />;
      case "healthy":
        return <CheckCircle2 size={16} className="text-[#1dee4a]" />;
      default:
        return <Clock size={16} className="text-[#a5a4a4]" />;
    }
  };

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
                Engr.
              </span>
            </div>
            <h1 className="text-4xl text-white" style={{ fontFamily: "var(--font-poppins)" }}>
              Asset Health Monitoring
            </h1>
            <p className="text-[#a5a4a4] text-sm mt-2 font-lato">
              Real-time health scoring across all critical asset categories
            </p>
          </div>

          {/* Overall Health Score */}
          <div className="bg-[#1e1e1e] rounded-[12px] p-6 mb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <p className="text-[#a5a4a4] text-sm font-outfit mb-2">Overall Fleet Health Score</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#2c2c2c"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={overallHealthScore >= 80 ? "#1dee4a" : overallHealthScore >= 60 ? "#eeac1d" : "#ee1d1d"}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(overallHealthScore / 100) * 251.2} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xl font-outfit font-bold">{overallHealthScore}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white text-2xl font-outfit font-bold mb-1">
                      {overallHealthScore >= 80 ? "Healthy" : overallHealthScore >= 60 ? "Fair" : "Critical"}
                    </p>
                    <p className="text-[#a5a4a4] text-sm font-lato">Across 5 asset categories</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#2c2c2c] rounded-lg p-4">
                  <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Critical Alerts</p>
                  <p className="text-[#ee1d1d] text-2xl font-outfit font-bold">2</p>
                </div>
                <div className="bg-[#2c2c2c] rounded-lg p-4">
                  <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Warnings</p>
                  <p className="text-[#eeac1d] text-2xl font-outfit font-bold">8</p>
                </div>
                <div className="bg-[#2c2c2c] rounded-lg p-4">
                  <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Healthy</p>
                  <p className="text-[#1dee4a] text-2xl font-outfit font-bold">32</p>
                </div>
              </div>
            </div>
          </div>

          {/* Asset Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {assetCategories.map((category) => (
              <div
                key={category.id}
                className="bg-[#1e1e1e] rounded-[12px] p-4 border-2 border-transparent hover:border-[#eeac1d] transition-all cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white text-lg font-outfit font-semibold">{category.name}</h3>
                      {category.trend === "up" && <TrendingUp size={16} className="text-[#1dee4a]" />}
                      {category.trend === "down" && <TrendingDown size={16} className="text-[#ee1d1d]" />}
                    </div>
                    <p className="text-[#a5a4a4] text-xs font-lato mb-2">{category.description}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-outfit px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${getRiskColor(category.riskLevel)}20`,
                          color: getRiskColor(category.riskLevel),
                        }}
                      >
                        {category.priority} Priority
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className="text-3xl font-outfit font-bold"
                      style={{
                        color:
                          category.healthScore >= 80
                            ? "#1dee4a"
                            : category.healthScore >= 60
                            ? "#eeac1d"
                            : "#ee1d1d",
                      }}
                    >
                      {category.healthScore}
                    </p>
                    <p className="text-[#a5a4a4] text-xs font-lato">Health Score</p>
                  </div>
                </div>

                {/* Asset Count Summary */}
                <div className="flex items-center gap-4 pt-3 border-t border-[#a5a4a4]/20">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#1dee4a]" />
                    <span className="text-[#a5a4a4] text-xs font-lato">
                      {category.assets.filter((a) => a.status === "healthy").length} Healthy
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#eeac1d]" />
                    <span className="text-[#a5a4a4] text-xs font-lato">
                      {category.assets.filter((a) => a.status === "warning").length} Warning
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#ee1d1d]" />
                    <span className="text-[#a5a4a4] text-xs font-lato">
                      {category.assets.filter((a) => a.status === "alert").length} Alert
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Asset Details */}
      {currentCategory && (
        <aside className="w-[389px] bg-[#1e1e1e] border-l border-white/10 shrink-0 overflow-y-auto">
          <div className="px-7 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-poppins text-lg">{currentCategory.name}</h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-[#a5a4a4] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-[#a5a4a4] text-sm font-lato mb-6">{currentCategory.description}</p>

            <div className="space-y-2">
              {currentCategory.assets.map((asset, index) => (
                <div
                  key={index}
                  className="bg-[#2c2c2c] rounded-lg p-3 hover:bg-[#3c3c3c] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-white text-sm font-outfit font-medium mb-1">{asset.name}</p>
                      <p className="text-[#a5a4a4] text-xs font-lato">Last check: {asset.lastCheck}</p>
                    </div>
                    {getStatusIcon(asset.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-1.5 flex-1 rounded-full"
                      style={{ backgroundColor: `${getRiskColor(asset.risk)}40` }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width:
                            asset.status === "healthy"
                              ? "90%"
                              : asset.status === "warning"
                              ? "60%"
                              : "30%",
                          backgroundColor: getRiskColor(asset.risk),
                        }}
                      />
                    </div>
                    <span
                      className="text-xs font-outfit capitalize"
                      style={{ color: getRiskColor(asset.risk) }}
                    >
                      {asset.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

