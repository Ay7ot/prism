"use client";

import { useState } from "react";
import { AlertTriangle, TrendingUp, TrendingDown, Droplets, Thermometer, Wind } from "lucide-react";
import { plants } from "@/lib/data/plants";

// Generate gas quality data for all plants
const generateGasQualityForPlant = (plantId: string, plantName: string) => {
  // Geregu has issues (the demo story)
  if (plantId === "geregu") {
    return {
      plant: plantName,
      status: "warning",
      supplier: "Nigerian Gas Company (NGC)",
      wobbeIndex: { value: 51.8, status: "caution" },
      moisture: { value: 8.5, status: "warning" },
      dewPoint: { value: -10, status: "warning" },
      pressure: { value: 2.82, status: "caution" },
      h2s: { value: 3.2, status: "normal" },
      particulates: { value: 0.8, status: "normal" },
    };
  }
  
  // All other plants are normal
  return {
    plant: plantName,
    status: "normal",
    supplier: "Nigerian Gas Company (NGC)",
    wobbeIndex: { value: 49.5 + Math.random() * 1.0, status: "normal" },
    moisture: { value: 3.8 + Math.random() * 1.5, status: "normal" },
    dewPoint: { value: -14 - Math.random() * 3, status: "normal" },
    pressure: { value: 2.95 + Math.random() * 0.15, status: "normal" },
    h2s: { value: 1.5 + Math.random() * 1.0, status: "normal" },
    particulates: { value: 0.2 + Math.random() * 0.3, status: "normal" },
  };
};

const gasQualityData = Object.fromEntries(
  plants.map(plant => [plant.id, generateGasQualityForPlant(plant.id, plant.name)])
);

const gasIncidents = [
  {
    id: "1",
    date: "2024-12-18",
    plant: "Geregu NIPP",
    issue: "Elevated moisture content",
    impact: "Fuel pressure instability",
    duration: "6 hours",
    resolved: true,
  },
  {
    id: "2",
    date: "2024-12-15",
    plant: "Geregu NIPP",
    issue: "Dew point exceeded limit",
    impact: "Increased risk of liquid carryover",
    duration: "14 hours",
    resolved: true,
  },
  {
    id: "3",
    date: "2024-12-10",
    plant: "Olorunsogo",
    issue: "Pressure fluctuation",
    impact: "Minor MW output variation",
    duration: "3 hours",
    resolved: true,
  },
];

export default function GasQualityPage() {
  const [selectedPlant, setSelectedPlant] = useState<string>("geregu");
  
  const currentData = gasQualityData[selectedPlant];
  const targets = {
    wobbeIndex: { min: 48.0, max: 52.0, unit: "MJ/Sm³" },
    moisture: { max: 6.5, unit: "mg/Sm³" },
    dewPoint: { max: -8, unit: "°C" },
    pressure: { min: 2.8, max: 3.2, unit: "bar" },
    h2s: { max: 5.0, unit: "mg/Sm³" },
    particulates: { max: 1.0, unit: "mg/Sm³" },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "#ee1d1d";
      case "warning":
        return "#eeac1d";
      case "caution":
        return "#f97316";
      case "normal":
        return "#1dee4a";
      default:
        return "#a5a4a4";
    }
  };

  return (
    <div className="px-4 py-6 lg:px-7 lg:py-7 min-h-screen w-full">
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
          Gas Quality Monitoring
        </h1>
        <p className="text-[#a5a4a4] text-sm mt-2 font-lato">
          Real-time fuel quality analysis - Internal trip frequency driver
        </p>
      </div>

      {/* Plant Selector - All 9 plants */}
      <div className="flex flex-wrap gap-3 mb-6">
        {plants.map((plant) => (
          <button
            key={plant.id}
            onClick={() => setSelectedPlant(plant.id)}
            className={`px-4 py-2.5 rounded-xl font-outfit font-medium text-sm transition-all ${
              selectedPlant === plant.id
                ? "bg-[#eeac1d] text-[#111]"
                : "bg-[#2c2c2c] text-white hover:bg-[#3c3c3c]"
            }`}
          >
            {plant.shortName}
            {gasQualityData[plant.id]?.status === "warning" && (
              <span className="ml-2 text-[#ee1d1d]">⚠</span>
            )}
          </button>
        ))}
      </div>

      {/* Overall Status */}
      <div
        className="rounded-[12px] p-6 mb-6"
        style={{
          backgroundColor: currentData.status === "warning" ? "rgba(238,172,29,0.1)" : "rgba(30,222,74,0.1)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-outfit text-xl font-semibold mb-1">{currentData.plant}</p>
            <p className="text-[#a5a4a4] text-sm font-lato">Gas Station & Fuel Supply System</p>
          </div>
          <div className="text-right">
            <p
              className="text-2xl font-outfit font-bold capitalize"
              style={{ color: getStatusColor(currentData.status) }}
            >
              {currentData.status}
            </p>
            <p className="text-[#a5a4a4] text-xs font-lato mt-1">Overall Status</p>
          </div>
        </div>
      </div>

      {/* Key Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
        {/* Wobbe Index */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wind size={20} className="text-[#eeac1d]" />
              <p className="text-white text-sm font-outfit font-semibold">Wobbe Index</p>
            </div>
            <span
              className="text-xs font-outfit px-2 py-1 rounded"
              style={{
                backgroundColor: `${getStatusColor(currentData.wobbeIndex.status)}20`,
                color: getStatusColor(currentData.wobbeIndex.status),
              }}
            >
              {currentData.wobbeIndex.status}
            </span>
          </div>
          <p className="text-3xl font-outfit font-bold text-[#eeac1d] mb-1">
            {currentData.wobbeIndex.value.toFixed(1)}
          </p>
          <p className="text-[#a5a4a4] text-sm font-lato mb-3">{targets.wobbeIndex.unit}</p>
          <div className="flex items-center justify-between text-xs font-lato">
            <span className="text-[#a5a4a4]">
              Target: {targets.wobbeIndex.min} - {targets.wobbeIndex.max}
            </span>
          </div>
        </div>

        {/* Moisture Content */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets size={20} className="text-[#eeac1d]" />
              <p className="text-white text-sm font-outfit font-semibold">Moisture Content</p>
            </div>
            <span
              className="text-xs font-outfit px-2 py-1 rounded"
              style={{
                backgroundColor: `${getStatusColor(currentData.moisture.status)}20`,
                color: getStatusColor(currentData.moisture.status),
              }}
            >
              {currentData.moisture.status}
            </span>
          </div>
          <p
            className="text-3xl font-outfit font-bold mb-1"
            style={{ color: getStatusColor(currentData.moisture.status) }}
          >
            {currentData.moisture.value.toFixed(1)}
          </p>
          <p className="text-[#a5a4a4] text-sm font-lato mb-3">{targets.moisture.unit}</p>
          <div className="flex items-center justify-between text-xs font-lato">
            <span className="text-[#a5a4a4]">Max: {targets.moisture.max}</span>
          </div>
        </div>

        {/* Dew Point */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Thermometer size={20} className="text-[#eeac1d]" />
              <p className="text-white text-sm font-outfit font-semibold">Dew Point</p>
            </div>
            <span
              className="text-xs font-outfit px-2 py-1 rounded"
              style={{
                backgroundColor: `${getStatusColor(currentData.dewPoint.status)}20`,
                color: getStatusColor(currentData.dewPoint.status),
              }}
            >
              {currentData.dewPoint.status}
            </span>
          </div>
          <p
            className="text-3xl font-outfit font-bold mb-1"
            style={{ color: getStatusColor(currentData.dewPoint.status) }}
          >
            {currentData.dewPoint.value.toFixed(0)}
          </p>
          <p className="text-[#a5a4a4] text-sm font-lato mb-3">{targets.dewPoint.unit}</p>
          <div className="flex items-center justify-between text-xs font-lato">
            <span className="text-[#a5a4a4]">Max: {targets.dewPoint.max}°C</span>
          </div>
        </div>

        {/* Fuel Pressure */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white text-sm font-outfit font-semibold">Fuel Pressure</p>
            <span
              className="text-xs font-outfit px-2 py-1 rounded"
              style={{
                backgroundColor: `${getStatusColor(currentData.pressure.status)}20`,
                color: getStatusColor(currentData.pressure.status),
              }}
            >
              {currentData.pressure.status}
            </span>
          </div>
          <p
            className="text-3xl font-outfit font-bold mb-1"
            style={{ color: getStatusColor(currentData.pressure.status) }}
          >
            {currentData.pressure.value.toFixed(2)}
          </p>
          <p className="text-[#a5a4a4] text-sm font-lato mb-3">{targets.pressure.unit}</p>
          <div className="flex items-center justify-between text-xs font-lato">
            <span className="text-[#a5a4a4]">
              Range: {targets.pressure.min} - {targets.pressure.max}
            </span>
          </div>
        </div>

        {/* H2S Content */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white text-sm font-outfit font-semibold">H₂S Content</p>
            <span
              className="text-xs font-outfit px-2 py-1 rounded"
              style={{
                backgroundColor: `${getStatusColor(currentData.h2s.status)}20`,
                color: getStatusColor(currentData.h2s.status),
              }}
            >
              {currentData.h2s.status}
            </span>
          </div>
          <p
            className="text-3xl font-outfit font-bold mb-1"
            style={{ color: getStatusColor(currentData.h2s.status) }}
          >
            {currentData.h2s.value.toFixed(1)}
          </p>
          <p className="text-[#a5a4a4] text-sm font-lato mb-3">{targets.h2s.unit}</p>
          <div className="flex items-center justify-between text-xs font-lato">
            <span className="text-[#a5a4a4]">Max: {targets.h2s.max}</span>
          </div>
        </div>

        {/* Particulates */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white text-sm font-outfit font-semibold">Particulates</p>
            <span
              className="text-xs font-outfit px-2 py-1 rounded"
              style={{
                backgroundColor: `${getStatusColor(currentData.particulates.status)}20`,
                color: getStatusColor(currentData.particulates.status),
              }}
            >
              {currentData.particulates.status}
            </span>
          </div>
          <p
            className="text-3xl font-outfit font-bold mb-1"
            style={{ color: getStatusColor(currentData.particulates.status) }}
          >
            {currentData.particulates.value.toFixed(1)}
          </p>
          <p className="text-[#a5a4a4] text-sm font-lato mb-3">{targets.particulates.unit}</p>
          <div className="flex items-center justify-between text-xs font-lato">
            <span className="text-[#a5a4a4]">Max: {targets.particulates.max}</span>
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-[#1e1e1e] rounded-[12px] p-6">
        <h3 className="text-white font-poppins text-xl mb-4">Recent Gas Quality Incidents</h3>
        <div className="space-y-3">
          {gasIncidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-[#2c2c2c] rounded-lg p-4 hover:bg-[#3c3c3c] transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white text-sm font-outfit font-semibold">{incident.plant}</p>
                    <span className="text-[#a5a4a4] text-xs font-lato">
                      {new Date(incident.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <p className="text-[#eeac1d] text-sm font-lato">{incident.issue}</p>
                  <p className="text-[#a5a4a4] text-xs font-lato mt-1">Impact: {incident.impact}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-outfit">{incident.duration}</p>
                  <span className="text-[#1dee4a] text-xs font-lato">✓ Resolved</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-[rgba(238,172,29,0.1)] rounded-lg border border-[#eeac1d]/30">
          <p className="text-[#eeac1d] text-sm font-outfit mb-1">
            <span className="font-bold">Gas Supplier:</span> {currentData.supplier}
          </p>
          <p className="text-[#a5a4a4] text-xs font-lato">
            Continuous monitoring enables objective performance tracking and supports contractual enforcement with gas suppliers.
          </p>
        </div>
      </div>
    </div>
  );
}

