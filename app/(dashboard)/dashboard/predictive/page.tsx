"use client";

import { useState } from "react";
import { AlertTriangle, Clock, TrendingUp, Zap, Activity } from "lucide-react";
import Link from "next/link";

// Predictive alerts with timeline
const predictiveAlerts = [
  {
    id: "1",
    asset: "GT21 - Exhaust Temperature Spread",
    plant: "Geregu NIPP",
    severity: "critical",
    prediction: "Combustor liner failure imminent",
    timeToFailure: 45, // minutes
    confidence: 94,
    potentialLoss: 450000000,
    recommendation: "Reduce load and schedule immediate inspection",
    indicators: [
      { metric: "Exhaust Temp Deviation", value: "+42°F", status: "critical" },
      { metric: "Combustion Dynamics", value: "Unstable", status: "critical" },
      { metric: "Fuel Flow Variance", value: "+8%", status: "warning" },
    ],
  },
  {
    id: "2",
    asset: "Fuel Pressure Regulator - Line 2",
    plant: "Geregu NIPP",
    severity: "high",
    prediction: "Pressure instability likely within 90 minutes",
    timeToFailure: 90,
    confidence: 87,
    potentialLoss: 95000000,
    recommendation: "Switch to backup regulator, inspect primary",
    indicators: [
      { metric: "Pressure Fluctuation", value: "±12 PSI", status: "warning" },
      { metric: "Valve Response Time", value: "+230ms", status: "warning" },
      { metric: "Gas Quality", value: "Degraded", status: "warning" },
    ],
  },
  {
    id: "3",
    asset: "GT11 - Journal Bearing #2",
    plant: "Olorunsogo",
    severity: "medium",
    prediction: "Bearing degradation detected",
    timeToFailure: 480, // 8 hours
    confidence: 79,
    potentialLoss: 120000000,
    recommendation: "Schedule maintenance within 24 hours",
    indicators: [
      { metric: "Vibration Level", value: "4.2 mm/s", status: "warning" },
      { metric: "Temperature", value: "+18°F", status: "warning" },
      { metric: "Oil Particle Count", value: "Elevated", status: "warning" },
    ],
  },
  {
    id: "4",
    asset: "Transformer T1 - DGA Analysis",
    plant: "Omotosho",
    severity: "medium",
    prediction: "Partial discharge activity increasing",
    timeToFailure: 1440, // 24 hours
    confidence: 72,
    potentialLoss: 200000000,
    recommendation: "Order spare bushing, schedule outage within 72 hours",
    indicators: [
      { metric: "Hydrogen (H₂)", value: "185 ppm", status: "warning" },
      { metric: "Acetylene (C₂H₂)", value: "12 ppm", status: "warning" },
      { metric: "TDCG", value: "520 ppm", status: "warning" },
    ],
  },
  {
    id: "5",
    asset: "Cooling Water Pump P-104",
    plant: "Olorunsogo",
    severity: "low",
    prediction: "Motor bearing wear detected",
    timeToFailure: 10080, // 7 days
    confidence: 68,
    potentialLoss: 35000000,
    recommendation: "Add to next scheduled maintenance window",
    indicators: [
      { metric: "Motor Vibration", value: "2.8 mm/s", status: "caution" },
      { metric: "Current Draw", value: "+5%", status: "caution" },
      { metric: "Temperature", value: "Normal", status: "healthy" },
    ],
  },
];

const preventionStats = {
  alertsGenerated: 127,
  tripsPreve: 8,
  savingsYTD: 385000000,
  avgEarlyWarning: 67, // minutes
};

export default function PredictiveAnalyticsPage() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const currentAlert = selectedAlert
    ? predictiveAlerts.find((alert) => alert.id === selectedAlert)
    : null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "#ee1d1d";
      case "high":
        return "#f97316";
      case "medium":
        return "#eeac1d";
      case "low":
        return "#1dee4a";
      default:
        return "#a5a4a4";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "#ee1d1d";
      case "warning":
        return "#eeac1d";
      case "caution":
        return "#f97316";
      case "healthy":
        return "#1dee4a";
      default:
        return "#a5a4a4";
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes < 1440) return `${Math.round(minutes / 60)} hours`;
    return `${Math.round(minutes / 1440)} days`;
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
              Predictive Analytics
            </h1>
            <p className="text-[#a5a4a4] text-sm mt-2 font-lato">
              Early warning system for asset failures - 30-100 minutes advance notice
            </p>
          </div>

          {/* Prevention Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-6">
            <div className="bg-[#1e1e1e] rounded-[12px] p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#a5a4a4] text-sm font-outfit font-medium">Alerts Generated (YTD)</p>
                <Activity size={20} className="text-[#eeac1d]" />
              </div>
              <p className="text-white text-[28px] font-outfit font-bold">{preventionStats.alertsGenerated}</p>
              <p className="text-[#1dee4a] text-xs font-lato mt-1">↑ 34% vs last quarter</p>
            </div>

            <div className="bg-[#1e1e1e] rounded-[12px] p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#a5a4a4] text-sm font-outfit font-medium">Trips Prevented</p>
                <Zap size={20} className="text-[#1dee4a]" />
              </div>
              <p className="text-[#1dee4a] text-[28px] font-outfit font-bold">{preventionStats.tripsPreve}</p>
              <p className="text-[#a5a4a4] text-xs font-lato mt-1">This quarter</p>
            </div>

            <div className="bg-[#1e1e1e] rounded-[12px] p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#a5a4a4] text-sm font-outfit font-medium">Savings (YTD)</p>
                <TrendingUp size={20} className="text-[#1dee4a]" />
              </div>
              <p className="text-[#1dee4a] text-[28px] font-outfit font-bold">
                ₦{(preventionStats.savingsYTD / 1000000).toFixed(0)}M
              </p>
              <p className="text-[#a5a4a4] text-xs font-lato mt-1">Revenue protected</p>
            </div>

            <div className="bg-[#1e1e1e] rounded-[12px] p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#a5a4a4] text-sm font-outfit font-medium">Avg Early Warning</p>
                <Clock size={20} className="text-[#eeac1d]" />
              </div>
              <p className="text-[#eeac1d] text-[28px] font-outfit font-bold">{preventionStats.avgEarlyWarning}</p>
              <p className="text-[#a5a4a4] text-xs font-lato mt-1">minutes advance notice</p>
            </div>
          </div>

          {/* Active Predictions */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-poppins text-2xl">Active Failure Predictions</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ee1d1d]" />
                <span className="text-[#a5a4a4] text-sm font-lato">Critical</span>
                <div className="w-3 h-3 rounded-full bg-[#f97316] ml-3" />
                <span className="text-[#a5a4a4] text-sm font-lato">High</span>
                <div className="w-3 h-3 rounded-full bg-[#eeac1d] ml-3" />
                <span className="text-[#a5a4a4] text-sm font-lato">Medium</span>
              </div>
            </div>

            <div className="space-y-3">
              {predictiveAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-[#1e1e1e] rounded-[12px] p-4 hover:bg-[#252525] transition-all cursor-pointer border-2 border-transparent hover:border-[#eeac1d]"
                  onClick={() => setSelectedAlert(alert.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Severity Indicator */}
                    <div
                      className="w-2 h-full rounded-full shrink-0"
                      style={{ backgroundColor: getSeverityColor(alert.severity) }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white text-base font-outfit font-semibold">{alert.asset}</h3>
                            <span
                              className="text-xs font-outfit px-2 py-0.5 rounded capitalize"
                              style={{
                                backgroundColor: `${getSeverityColor(alert.severity)}20`,
                                color: getSeverityColor(alert.severity),
                              }}
                            >
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-[#a5a4a4] text-sm font-lato mb-1">{alert.plant}</p>
                          <p className="text-[#eeac1d] text-sm font-outfit font-medium">{alert.prediction}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-white text-sm font-outfit mb-1">Time to Failure</p>
                          <p
                            className="text-2xl font-outfit font-bold"
                            style={{ color: getSeverityColor(alert.severity) }}
                          >
                            {formatTime(alert.timeToFailure)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-[#a5a4a4]/20">
                        <div className="flex items-center gap-2">
                          <p className="text-[#a5a4a4] text-xs font-lato">Confidence:</p>
                          <p className="text-white text-sm font-outfit font-medium">{alert.confidence}%</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-[#a5a4a4] text-xs font-lato">Potential Loss:</p>
                          <p className="text-[#ee1d1d] text-sm font-outfit font-bold">
                            ₦{(alert.potentialLoss / 1000000).toFixed(0)}M
                          </p>
                        </div>
                        <div className="flex-1 text-right">
                          <button className="text-[#eeac1d] text-sm font-outfit hover:underline">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-[#1e1e1e] rounded-[12px] p-6">
            <h3 className="text-white font-poppins text-xl mb-4">How Predictive Analytics Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-lg bg-[#2c2c2c] flex items-center justify-center mb-3">
                  <span className="text-[#eeac1d] text-xl font-outfit font-bold">1</span>
                </div>
                <h4 className="text-white text-base font-outfit font-semibold mb-2">Real-Time Monitoring</h4>
                <p className="text-[#a5a4a4] text-sm font-lato leading-relaxed">
                  OPC-UA gateway extracts live data from Siemens SPPA-T3000 DCS covering all critical parameters
                  across turbines, generators, transformers, and BOP systems.
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-lg bg-[#2c2c2c] flex items-center justify-center mb-3">
                  <span className="text-[#eeac1d] text-xl font-outfit font-bold">2</span>
                </div>
                <h4 className="text-white text-base font-outfit font-semibold mb-2">Pattern Recognition</h4>
                <p className="text-[#a5a4a4] text-sm font-lato leading-relaxed">
                  Machine learning models analyze historical failure patterns and identify early-warning signatures
                  30-100 minutes before traditional protection systems would react.
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-lg bg-[#2c2c2c] flex items-center justify-center mb-3">
                  <span className="text-[#eeac1d] text-xl font-outfit font-bold">3</span>
                </div>
                <h4 className="text-white text-base font-outfit font-semibold mb-2">Action & Prevention</h4>
                <p className="text-[#a5a4a4] text-sm font-lato leading-relaxed">
                  Alerts sent to operators and engineering team with specific recommendations, enabling controlled
                  shutdown or corrective action before catastrophic failure occurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Alert Details */}
      {currentAlert && (
        <aside className="w-[389px] bg-[#1e1e1e] border-l border-white/10 shrink-0 overflow-y-auto">
          <div className="px-7 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-poppins text-lg">Alert Details</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-[#a5a4a4] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Asset Info */}
            <div className="bg-[#2c2c2c] rounded-lg p-4 mb-4">
              <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Asset</p>
              <p className="text-white text-base font-outfit font-semibold mb-3">{currentAlert.asset}</p>
              <p className="text-[#a5a4a4] text-xs font-outfit mb-1">Location</p>
              <p className="text-[#eeac1d] text-sm font-lato">{currentAlert.plant}</p>
            </div>

            {/* Prediction */}
            <div
              className="rounded-lg p-4 mb-4"
              style={{ backgroundColor: `${getSeverityColor(currentAlert.severity)}20` }}
            >
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle size={20} style={{ color: getSeverityColor(currentAlert.severity) }} />
                <div className="flex-1">
                  <p
                    className="text-sm font-outfit font-bold mb-1"
                    style={{ color: getSeverityColor(currentAlert.severity) }}
                  >
                    {currentAlert.prediction}
                  </p>
                  <p className="text-white text-xs font-lato">
                    Estimated time to failure: <strong>{formatTime(currentAlert.timeToFailure)}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Indicators */}
            <div className="mb-4">
              <h4 className="text-white text-sm font-outfit font-semibold mb-3">Leading Indicators</h4>
              <div className="space-y-2">
                {currentAlert.indicators.map((indicator, index) => (
                  <div key={index} className="bg-[#2c2c2c] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white text-sm font-outfit">{indicator.metric}</p>
                      <span
                        className="text-xs font-outfit px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${getStatusColor(indicator.status)}20`,
                          color: getStatusColor(indicator.status),
                        }}
                      >
                        {indicator.status}
                      </span>
                    </div>
                    <p className="text-[#eeac1d] text-sm font-lato font-medium">{indicator.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-[rgba(30,222,74,0.1)] border border-[#1dee4a]/30 rounded-lg p-4 mb-4">
              <p className="text-[#1dee4a] text-xs font-outfit font-semibold mb-2">RECOMMENDED ACTION</p>
              <p className="text-white text-sm font-lato leading-relaxed">{currentAlert.recommendation}</p>
            </div>

            {/* Financial Impact */}
            <div className="bg-[rgba(238,29,29,0.1)] border border-[#ee1d1d]/30 rounded-lg p-4">
              <p className="text-[#ee1d1d] text-xs font-outfit font-semibold mb-2">POTENTIAL FINANCIAL IMPACT</p>
              <p className="text-[#ee1d1d] text-2xl font-outfit font-bold mb-1">
                ₦{(currentAlert.potentialLoss / 1000000).toFixed(0)}M
              </p>
              <p className="text-[#a5a4a4] text-xs font-lato">If failure occurs without intervention</p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

