"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { PowerChart, weeklyPowerData, monthlyPowerData } from "@/components/dashboard/power-chart";
import { PlantListCard } from "@/components/plants/plant-list-card";
import { plants, getTotalStats } from "@/lib/data/plants";
import { ChevronDown } from "lucide-react";

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState("week");
  const [plantFilter, setPlantFilter] = useState("all");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showPlantDropdown, setShowPlantDropdown] = useState(false);

  // Filter plants based on selected filter
  const filteredPlants = plantFilter === "all"
    ? plants
    : plants.filter(p => p.id === plantFilter);

  // Calculate stats based on filtered plants
  const stats = plantFilter === "all"
    ? getTotalStats()
    : {
      totalPlants: plants.length,
      onlinePlants: filteredPlants.filter(p => p.status === "online").length,
      totalCapacity: filteredPlants.reduce((sum, p) => sum + p.totalCapacity, 0),
      totalOutput: filteredPlants.reduce((sum, p) => sum + p.currentOutput, 0),
    };

  // Adjust chart data based on plant filter
  const basePowerData = dateFilter === "month" ? monthlyPowerData : weeklyPowerData;
  const currentPowerData = plantFilter === "all"
    ? basePowerData
    : basePowerData.map(d => ({
      ...d,
      value: Math.round(d.value * (filteredPlants.reduce((sum, p) => sum + p.currentOutput, 0) / getTotalStats().totalOutput))
    }));

  const currentConsumptionData = currentPowerData.map(d => ({
    ...d,
    value: Math.round(d.value * 0.91)
  }));

  // Date filter options
  const dateOptions = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  // Plant filter options
  const plantOptions = [
    { value: "all", label: "All" },
    ...plants.map(p => ({ value: p.id, label: p.shortName }))
  ];

  const selectedDateLabel = dateOptions.find(opt => opt.value === dateFilter)?.label || "This Week";
  const selectedPlantLabel = plantOptions.find(opt => opt.value === plantFilter)?.label || "All";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown')) {
        setShowDateDropdown(false);
        setShowPlantDropdown(false);
      }
    };

    if (showDateDropdown || showPlantDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDateDropdown, showPlantDropdown]);

  return (
    <div className="px-4 py-6 lg:px-7 lg:py-7 min-h-screen w-full">
      {/* Two Column Layout for Desktop */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
        {/* Left Column - Stats and Charts */}
        <div className="flex-1 min-w-0">
          {/* Welcome Section */}
          <div className="mb-5">
            <div className="flex items-center gap-2 text-white mb-2">
              <span
                className="text-[22px] font-light tracking-wide"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                Welcome,
              </span>
              <span
                className="text-[26px] font-bold"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                Engr.
              </span>
            </div>
            <h1
              className="text-4xl text-white"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Overview
            </h1>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-3 lg:gap-5 mb-5 lg:mb-6">
            <StatCard
              title="Plants"
              value={stats.onlinePlants}
              valueSecondary={stats.totalPlants}
              valueColor="green"
              subtitleSecondary="Online / Total"
            />
            <StatCard
              title="Total Power generated"
              value={stats.totalOutput.toLocaleString()}
              subtitle="mW"
              valueColor="gold"
            />
            <StatCard
              title="Total Consumption"
              value={(stats.totalOutput * 0.91).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              subtitle="mW"
              valueColor="gold"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 lg:gap-8 mb-5 lg:mb-6">
            {/* Date Filter */}
            <div className="relative filter-dropdown">
              <button
                onClick={() => {
                  setShowDateDropdown(!showDateDropdown);
                  setShowPlantDropdown(false);
                }}
                className="bg-[#2c2c2c] rounded-3xl px-4 lg:px-6 py-3 flex items-center justify-between min-w-[180px] lg:min-w-[262px] hover:bg-[#333] transition-colors"
              >
                <div className="flex items-center">
                  <span
                    className="text-base font-medium text-white mr-4"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Date
                  </span>
                  <span
                    className="text-base font-medium text-[#eeac1d]"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {selectedDateLabel}
                  </span>
                </div>
                <ChevronDown size={24} className="text-[#a5a4a4]" />
              </button>

              {showDateDropdown && (
                <div className="absolute top-full mt-2 w-full bg-[#2c2c2c] rounded-xl shadow-lg z-50 border border-[#a5a4a4]/20 overflow-hidden">
                  {dateOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDateFilter(option.value);
                        setShowDateDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${dateFilter === option.value
                          ? "bg-[#eeac1d]/10 text-[#eeac1d]"
                          : "text-white hover:bg-[#333]"
                        }`}
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Plant Filter */}
            <div className="relative filter-dropdown">
              <button
                onClick={() => {
                  setShowPlantDropdown(!showPlantDropdown);
                  setShowDateDropdown(false);
                }}
                className="bg-[#2c2c2c] rounded-3xl px-4 lg:px-6 py-3 flex items-center justify-between min-w-[150px] lg:min-w-[243px] hover:bg-[#333] transition-colors"
              >
                <div className="flex items-center">
                  <span
                    className="text-base font-medium text-white mr-4"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Plant
                  </span>
                  <span
                    className="text-base font-medium text-[#eeac1d]"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {selectedPlantLabel}
                  </span>
                </div>
                <ChevronDown size={24} className="text-[#a5a4a4]" />
              </button>

              {showPlantDropdown && (
                <div className="absolute top-full mt-2 w-full bg-[#2c2c2c] rounded-xl shadow-lg z-50 border border-[#a5a4a4]/20 max-h-[300px] overflow-y-auto">
                  {plantOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setPlantFilter(option.value);
                        setShowPlantDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${plantFilter === option.value
                          ? "bg-[#eeac1d]/10 text-[#eeac1d]"
                          : "text-white hover:bg-[#333]"
                        }`}
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-5 lg:space-y-7">
            <PowerChart
              data={currentPowerData}
              title="Total Power generated"
            />
            <PowerChart
              data={currentConsumptionData}
              title="Total Power Consumed"
            />
          </div>
        </div>

        {/* Right Column - Plants List */}
        <div className="flex-1 min-w-0 space-y-4 lg:space-y-6 mt-6 lg:mt-[30px]">
          {filteredPlants.map((plant, index) => (
            <PlantListCard
              key={plant.id}
              plant={plant}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
