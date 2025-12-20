"use client";

import { useState } from "react";
import { ArrowUpRight, TrendingDown, DollarSign, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Financial data based on the brief
const financialData = {
  totalLoss: 1200000000, // ₦1.20B
  preventableLoss: 479000000, // Conservative estimate
  capex: 350000000, // ₦350M
  annualOpex: 40000000, // ₦40M
  projectedSavings: 600000000, // 30-50% reduction target
  paybackMonths: 12,
};

const tripHistory = [
  {
    id: "1",
    date: "2024-10-15",
    plantName: "Geregu NIPP",
    turbine: "GT21",
    cause: "Lube oil system failure",
    duration: "72 hours",
    cost: 450000000,
    preventable: true,
    category: "Gas Turbine",
  },
  {
    id: "2",
    date: "2024-09-28",
    plantName: "Geregu NIPP",
    turbine: "GT22",
    cause: "Fuel pressure instability",
    duration: "18 hours",
    cost: 95000000,
    preventable: true,
    category: "Gas Supply System",
  },
  {
    id: "3",
    date: "2024-09-12",
    plantName: "Olorunsogo",
    turbine: "GT11",
    cause: "Vibration anomaly",
    duration: "24 hours",
    cost: 120000000,
    preventable: true,
    category: "Gas Turbine",
  },
  {
    id: "4",
    date: "2024-08-30",
    plantName: "Geregu NIPP",
    turbine: "ST21",
    cause: "Generator protection trip",
    duration: "6 hours",
    cost: 35000000,
    preventable: true,
    category: "Generator System",
  },
  {
    id: "5",
    date: "2024-08-15",
    plantName: "Omotosho",
    turbine: "GT13",
    cause: "Cooling water pump failure",
    duration: "12 hours",
    cost: 65000000,
    preventable: true,
    category: "BOP Systems",
  },
];

export default function FinancialDashboardPage() {
  const [timeframe, setTimeframe] = useState("24months");

  const roiPercentage = ((financialData.projectedSavings / financialData.capex) * 100).toFixed(0);
  const preventablePercentage = ((financialData.preventableLoss / financialData.totalLoss) * 100).toFixed(0);

  return (
    <div className="px-4 py-6 lg:px-7 lg:py-7 min-h-screen w-full">
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
          Revenue Protection & ROI
        </h1>
        <p className="text-[#a5a4a4] text-sm mt-2 font-lato">
          Predictive Reliability Management - Financial Impact Analysis
        </p>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-6">
        {/* Total Revenue Loss */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-4 border-l-4 border-[#ee1d1d]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#a5a4a4] text-sm font-outfit font-medium">Total Revenue Loss (24mo)</p>
            <TrendingDown size={20} className="text-[#ee1d1d]" />
          </div>
          <p className="text-[#ee1d1d] text-[28px] font-outfit font-bold">
            ₦{(financialData.totalLoss / 1000000).toFixed(2)}M
          </p>
          <p className="text-[#a5a4a4] text-xs font-lato mt-1">15 internal technical trips</p>
        </div>

        {/* Preventable Loss */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-4 border-l-4 border-[#eeac1d]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#a5a4a4] text-sm font-outfit font-medium">Preventable Loss</p>
            <AlertTriangle size={20} className="text-[#eeac1d]" />
          </div>
          <p className="text-[#eeac1d] text-[28px] font-outfit font-bold">
            ₦{(financialData.preventableLoss / 1000000).toFixed(2)}M
          </p>
          <p className="text-[#a5a4a4] text-xs font-lato mt-1">{preventablePercentage}% of total losses</p>
        </div>

        {/* Projected Annual Savings */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-4 border-l-4 border-[#1dee4a]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#a5a4a4] text-sm font-outfit font-medium">Projected Annual Savings</p>
            <CheckCircle2 size={20} className="text-[#1dee4a]" />
          </div>
          <p className="text-[#1dee4a] text-[28px] font-outfit font-bold">
            ₦{(financialData.projectedSavings / 1000000).toFixed(2)}M
          </p>
          <p className="text-[#a5a4a4] text-xs font-lato mt-1">30-50% reduction target</p>
        </div>

        {/* ROI */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-4 border-l-4 border-[#eeac1d]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#a5a4a4] text-sm font-outfit font-medium">ROI</p>
            <ArrowUpRight size={20} className="text-[#1dee4a]" />
          </div>
          <p className="text-white text-[28px] font-outfit font-bold">{roiPercentage}%</p>
          <p className="text-[#a5a4a4] text-xs font-lato mt-1">
            {financialData.paybackMonths} months payback
          </p>
        </div>
      </div>

      {/* Investment vs Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Investment Breakdown */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-6">
          <h3 className="text-white font-poppins text-xl mb-4">Investment Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#2c2c2c] rounded-lg">
              <div>
                <p className="text-white text-sm font-outfit font-medium">CAPEX (Initial Investment)</p>
                <p className="text-[#a5a4a4] text-xs font-lato mt-1">
                  Predictive tools, OPC-UA gateway, integration
                </p>
              </div>
              <p className="text-[#eeac1d] text-xl font-outfit font-bold">
                ₦{(financialData.capex / 1000000).toFixed(0)}M
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#2c2c2c] rounded-lg">
              <div>
                <p className="text-white text-sm font-outfit font-medium">Annual OPEX</p>
                <p className="text-[#a5a4a4] text-xs font-lato mt-1">Maintenance, support, training</p>
              </div>
              <p className="text-[#eeac1d] text-xl font-outfit font-bold">
                ₦{(financialData.annualOpex / 1000000).toFixed(0)}M
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#357036] rounded-lg">
              <div>
                <p className="text-white text-sm font-outfit font-medium">Net Annual Benefit</p>
                <p className="text-[#1dee4a] text-xs font-lato mt-1">Savings minus OPEX</p>
              </div>
              <p className="text-[#1dee4a] text-xl font-outfit font-bold">
                ₦{((financialData.projectedSavings - financialData.annualOpex) / 1000000).toFixed(0)}M
              </p>
            </div>
          </div>
        </div>

        {/* Payback Timeline */}
        <div className="bg-[#1e1e1e] rounded-[12px] p-6">
          <h3 className="text-white font-poppins text-xl mb-4">Payback Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1dee4a]" />
              <p className="text-[#a5a4a4] text-sm font-lato">
                <span className="text-white font-medium">Month 0:</span> CAPEX Investment (₦350M)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1dee4a]" />
              <p className="text-[#a5a4a4] text-sm font-lato">
                <span className="text-white font-medium">Months 1-6:</span> System deployment & training
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1dee4a]" />
              <p className="text-[#a5a4a4] text-sm font-lato">
                <span className="text-white font-medium">Months 7-12:</span> Initial savings validation
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#eeac1d]" />
              <p className="text-[#1dee4a] text-sm font-lato">
                <span className="text-white font-medium">Month 12:</span> Full CAPEX recovery (conservative)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#eeac1d]" />
              <p className="text-[#a5a4a4] text-sm font-lato">
                <span className="text-white font-medium">Year 2+:</span> Pure profit & continuous optimization
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[rgba(30,222,74,0.1)] rounded-lg border border-[#1dee4a]/30">
            <p className="text-[#1dee4a] text-sm font-outfit font-bold mb-1">
              Key Insight: Single GT21-level trip prevention recovers full CAPEX
            </p>
            <p className="text-[#a5a4a4] text-xs font-lato">
              72-hour outage at Geregu = ₦450M loss. System prevents multiple such events annually.
            </p>
          </div>
        </div>
      </div>

      {/* Trip History */}
      <div className="bg-[#1e1e1e] rounded-[12px] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-poppins text-xl">Internal Technical Trip History (24 Months)</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ee1d1d]" />
            <span className="text-[#a5a4a4] text-sm font-lato">High Cost</span>
            <div className="w-3 h-3 rounded-full bg-[#eeac1d] ml-3" />
            <span className="text-[#a5a4a4] text-sm font-lato">Medium Cost</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#a5a4a4]/20">
                <th className="text-left py-3 px-3 text-[#a5a4a4] text-sm font-outfit font-medium">Date</th>
                <th className="text-left py-3 px-3 text-[#a5a4a4] text-sm font-outfit font-medium">Plant</th>
                <th className="text-left py-3 px-3 text-[#a5a4a4] text-sm font-outfit font-medium">Turbine</th>
                <th className="text-left py-3 px-3 text-[#a5a4a4] text-sm font-outfit font-medium">Cause</th>
                <th className="text-left py-3 px-3 text-[#a5a4a4] text-sm font-outfit font-medium">Duration</th>
                <th className="text-left py-3 px-3 text-[#a5a4a4] text-sm font-outfit font-medium">Category</th>
                <th className="text-right py-3 px-3 text-[#a5a4a4] text-sm font-outfit font-medium">Cost (₦)</th>
              </tr>
            </thead>
            <tbody>
              {tripHistory.map((trip) => (
                <tr key={trip.id} className="border-b border-[#a5a4a4]/10 hover:bg-[#2c2c2c] transition-colors">
                  <td className="py-3 px-3 text-white text-sm font-lato">
                    {new Date(trip.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-3 text-white text-sm font-outfit">{trip.plantName}</td>
                  <td className="py-3 px-3 text-[#eeac1d] text-sm font-outfit font-medium">{trip.turbine}</td>
                  <td className="py-3 px-3 text-[#a5a4a4] text-sm font-lato">{trip.cause}</td>
                  <td className="py-3 px-3 text-white text-sm font-lato">{trip.duration}</td>
                  <td className="py-3 px-3">
                    <span className="text-xs font-outfit px-2 py-1 rounded bg-[#2c2c2c] text-[#eeac1d]">
                      {trip.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`text-sm font-outfit font-bold ${
                        trip.cost > 200000000 ? "text-[#ee1d1d]" : "text-[#eeac1d]"
                      }`}
                    >
                      ₦{(trip.cost / 1000000).toFixed(0)}M
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#2c2c2c]">
                <td colSpan={6} className="py-3 px-3 text-right text-white text-sm font-outfit font-bold">
                  Total Documented Losses:
                </td>
                <td className="py-3 px-3 text-right text-[#ee1d1d] text-lg font-outfit font-bold">
                  ₦{(tripHistory.reduce((sum, trip) => sum + trip.cost, 0) / 1000000).toFixed(0)}M
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-[rgba(238,172,29,0.1)] rounded-lg">
          <p className="text-[#eeac1d] text-sm font-outfit">
            <span className="font-bold">Note:</span> This represents only 5 of 15 documented trips. Additional ₦435M
            in losses from remaining trips not shown.
          </p>
        </div>
      </div>

      {/* Loss by Category */}
      <div className="bg-[#1e1e1e] rounded-[12px] p-6">
        <h3 className="text-white font-poppins text-xl mb-4">Loss Distribution by Asset Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { category: "Gas Turbine", percentage: 83, amount: 570, color: "#ee1d1d" },
            { category: "Gas Supply System", percentage: 8, amount: 95, color: "#eeac1d" },
            { category: "Generator System", percentage: 3, amount: 35, color: "#eeac1d" },
            { category: "BOP Systems", percentage: 5, amount: 65, color: "#eeac1d" },
            { category: "Other", percentage: 1, amount: 12, color: "#a5a4a4" },
          ].map((item) => (
            <div key={item.category} className="bg-[#2c2c2c] rounded-lg p-4">
              <p className="text-[#a5a4a4] text-xs font-outfit mb-2">{item.category}</p>
              <p className="text-[28px] font-outfit font-bold" style={{ color: item.color }}>
                {item.percentage}%
              </p>
              <p className="text-white text-sm font-lato mt-1">₦{item.amount}M</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

