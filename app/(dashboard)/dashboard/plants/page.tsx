"use client";

import { useState, useEffect } from "react";
import { plants } from "@/lib/data/plants";
import { Building2, Settings, ChevronDown, Search as SearchIcon } from "lucide-react";
import Link from "next/link";

const locationOptions = [
  { value: "all", label: "All" },
  { value: "abia", label: "Abia" },
  { value: "ogun", label: "Ogun" },
  { value: "cross-river", label: "Cross River" },
  { value: "kogi", label: "Kogi" },
  { value: "ondo", label: "Ondo" },
  { value: "rivers", label: "Rivers" },
  { value: "bayelsa", label: "Bayelsa" },
  { value: "delta", label: "Delta" },
  { value: "edo", label: "Edo" },
];

const statusOptions = [
  { value: "all", label: "All" },
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "maintenance", label: "Maintenance" },
];

export default function PlantsPage() {
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const filteredPlants = plants.filter((plant) => {
    const matchesLocation =
      locationFilter === "all" ||
      plant.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || plant.status === statusFilter;
    const matchesSearch =
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLocation && matchesStatus && matchesSearch;
  });

  const selectedLocationLabel = locationOptions.find(opt => opt.value === locationFilter)?.label || "All";
  const selectedStatusLabel = statusOptions.find(opt => opt.value === statusFilter)?.label || "All";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown')) {
        setShowLocationDropdown(false);
        setShowStatusDropdown(false);
      }
    };

    if (showLocationDropdown || showStatusDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showLocationDropdown, showStatusDropdown]);

  return (
    <div className="px-4 py-6 lg:px-7 lg:py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 lg:mb-8">
        <div className="flex gap-2 text-white">
          <p className="font-lato font-light text-[22px] tracking-[0.4px]">Welcome,</p>
          <p className="font-lato font-bold text-[26px] leading-[38px]">Engr.</p>
        </div>
        <h1 className="font-poppins font-normal text-[36px] text-white">Plants</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 lg:mb-8">
        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3 lg:gap-8">
          {/* Location Filter */}
          <div className="relative filter-dropdown">
            <button
              onClick={() => {
                setShowLocationDropdown(!showLocationDropdown);
                setShowStatusDropdown(false);
              }}
              className="bg-[#2c2c2c] rounded-[24px] px-6 py-3 h-[55px] min-w-[183px] flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="font-outfit font-medium text-base text-white">location</span>
                <span className="font-outfit font-medium text-base text-[#eeac1d]">{selectedLocationLabel}</span>
              </div>
              <ChevronDown size={24} className="text-[#a5a4a4]" />
            </button>

            {showLocationDropdown && (
              <div className="absolute top-full mt-2 left-0 bg-[#2c2c2c] rounded-xl shadow-lg py-2 min-w-[183px] z-10 border border-[#a5a4a4]/20">
                {locationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setLocationFilter(option.value);
                      setShowLocationDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-white hover:bg-[#eeac1d]/10 font-outfit text-sm"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative filter-dropdown">
            <button
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowLocationDropdown(false);
              }}
              className="bg-[#2c2c2c] rounded-[24px] px-6 py-3 h-[55px] min-w-[162px] flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="font-outfit font-medium text-base text-white">Status</span>
                <span className="font-outfit font-medium text-base text-[#eeac1d]">{selectedStatusLabel}</span>
              </div>
              <ChevronDown size={24} className="text-[#a5a4a4]" />
            </button>

            {showStatusDropdown && (
              <div className="absolute top-full mt-2 left-0 bg-[#2c2c2c] rounded-xl shadow-lg py-2 min-w-[162px] z-10 border border-[#a5a4a4]/20">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setStatusFilter(option.value);
                      setShowStatusDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-white hover:bg-[#eeac1d]/10 font-outfit text-sm"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 lg:w-[306px]">
              <input
                type="text"
                placeholder="Plant name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[rgba(255,195,77,0.19)] rounded-[50px] px-7 py-4 h-[48px] text-white placeholder:text-[rgba(255,255,255,0.5)] font-outfit font-light text-xs focus:outline-none focus:ring-1 focus:ring-[#eeac1d]/30"
              />
            </div>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#eeac1d] shrink-0">
              <SearchIcon size={20} className="text-[#111]" />
            </button>
          </div>
        </div>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPlants.map((plant, index) => {
          const gasTurbines = plant.turbines.filter(t => t.type === "Gas Turbine");
          const steamTurbines = plant.turbines.filter(t => t.type === "Steam Turbine");

          return (
            <div key={plant.id} className="bg-[#1e1e1e] rounded-xl p-3">
              <div className="border border-[#a5a4a4] rounded-xl p-3 flex items-start justify-between gap-4 flex-wrap">
                {/* Plant Icon & Status */}
                <div className="flex items-center gap-3">
                  <Building2 size={24} className="text-[#eeac1d]" />
                  <div className="flex flex-col">
                    <p className="font-outfit font-medium text-sm text-white tracking-[-0.154px]">Plant {index + 1}</p>
                    <p className="font-outfit font-light text-[11px] text-[#1dee4a]">
                      {plant.status === "online" ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                {/* Plant Name & Location */}
                <div className="flex flex-col gap-1.5 min-w-[123px]">
                  <p className="font-inter font-medium text-xs text-white tracking-[-0.154px]">{plant.name}</p>
                  <p className="font-outfit font-light text-[11px] text-[#eeac1d]">{plant.location}</p>
                </div>

                {/* Turbines Info */}
                <div className="flex flex-col gap-1.5">
                  <p className="font-inter font-medium text-xs text-white tracking-[-0.154px]">Turbines</p>
                  {gasTurbines.length > 0 && (
                    <p className="font-outfit font-light text-[11px] text-[#eeac1d]">
                      <span className="text-[#eeac1d]">{gasTurbines.length} </span>
                      <span className="text-[#a5a4a4]">GE Frame 9E Gas Turbines</span>
                    </p>
                  )}
                  {steamTurbines.length > 0 && (
                    <p className="font-outfit font-light text-[11px] text-[#eeac1d]">
                      <span className="text-[#eeac1d]">{steamTurbines.length} </span>
                      <span className="text-[#a5a4a4]">GE Steam Turbines</span>
                    </p>
                  )}
                </div>

                {/* Manage Button */}
                <Link
                  href={`/dashboard/plants/${plant.id}`}
                  className="border-2 border-[#eeac1d] rounded-xl px-6 py-3 h-[41px] flex items-center gap-3 hover:bg-[#eeac1d]/10 transition-colors"
                >
                  <span className="font-outfit font-medium text-base text-[#d8d8d8]">Manage</span>
                  <Settings size={24} className="text-[#eeac1d]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#a5a4a4]">No plants found matching your filters</p>
        </div>
      )}
    </div>
  );
}

