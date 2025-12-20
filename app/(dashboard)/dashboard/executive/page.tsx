"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NigeriaMap } from "@/components/executive/nigeria-map";
import {
  ExecutiveKPICard,
  RiskIndicator,
} from "@/components/executive/executive-kpi-card";
import { AIInsightsList } from "@/components/dashboard/ai-insight-card";
import { AIAlertsList } from "@/components/dashboard/ai-alert-card";
import {
  mdInsights,
  executiveAlerts,
  financeAlerts,
  financeInsights,
  workforceAlerts,
  contractAlerts,
  gridAlerts,
  gridInsights,
} from "@/lib/data/alerts";
import { plants, getTotalStats } from "@/lib/data/plants";
import { departments } from "@/lib/data/users";
import { cn } from "@/lib/utils";
import {
  Users,
  FileText,
  Zap,
  ClipboardList,
  TrendingUp,
  Building2,
  AlertTriangle,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

function ExecutiveDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get("view") || "overview";
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

  const stats = getTotalStats();

  const views = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "workforce", label: "Workforce", icon: Users },
    { id: "contracts", label: "Contracts", icon: FileText },
    { id: "grid", label: "Grid", icon: Zap },
    { id: "operations", label: "O&M", icon: ClipboardList },
    { id: "finance", label: "Finance", icon: TrendingUp },
  ];

  const handleViewChange = (viewId: string) => {
    router.push(`/dashboard/executive?view=${viewId}`);
  };

  const getViewContent = () => {
    switch (view) {
      case "workforce":
        return <WorkforceView />;
      case "contracts":
        return <ContractsView />;
      case "grid":
        return <GridView />;
      case "operations":
        return <OperationsView />;
      case "finance":
        return <FinanceView />;
      default:
        return (
          <OverviewView
            selectedPlant={selectedPlant}
            onPlantClick={setSelectedPlant}
            stats={stats}
          />
        );
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Main Content */}
      <div className="flex-1 p-7 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Executive Dashboard
            </h1>
            <p className="text-sm text-[#a5a4a4] mt-1">
              Strategic overview of all NDPHC operations
            </p>
          </div>

          {/* View Switcher */}
          <div className="flex bg-[#1e1e1e] rounded-xl p-1">
            {views.map((v) => {
              const Icon = v.icon;
              return (
                <button
                  key={v.id}
                  onClick={() => handleViewChange(v.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors",
                    view === v.id
                      ? "bg-[#eeac1d] text-[#111]"
                      : "text-[#a5a4a4] hover:text-white"
                  )}
                >
                  <Icon size={16} />
                  <span className="hidden lg:inline">{v.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Content */}
        {getViewContent()}
      </div>

      {/* Right Sidebar */}
      <div className="w-[360px] bg-[#1e1e1e] border-l border-white/10 flex flex-col">
        {/* Tabs */}
        <div className="p-4 border-b border-white/10">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm text-[#eeac1d] border-b-2 border-[#eeac1d] pb-2">
              <Sparkles size={16} />
              AI Insights
            </button>
            <button className="flex items-center gap-2 text-sm text-[#a5a4a4] pb-2 hover:text-white transition-colors">
              <AlertTriangle size={16} />
              Alerts
            </button>
            <button className="flex items-center gap-2 text-sm text-[#a5a4a4] pb-2 hover:text-white transition-colors">
              <MessageSquare size={16} />
              Messages
            </button>
          </div>
        </div>

        {/* Insights */}
        <div className="flex-1 p-4 overflow-y-auto space-y-6">
          <AIInsightsList
            insights={view === "finance" ? financeInsights : view === "grid" ? gridInsights : mdInsights}
            title=""
          />

          <div className="border-t border-white/10 pt-4">
            <AIAlertsList
              alerts={
                view === "finance"
                  ? financeAlerts
                  : view === "workforce"
                  ? workforceAlerts
                  : view === "contracts"
                  ? contractAlerts
                  : view === "grid"
                  ? gridAlerts
                  : executiveAlerts
              }
              title="AI Alerts"
              maxItems={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewView({
  selectedPlant,
  onPlantClick,
  stats,
}: {
  selectedPlant: string | null;
  onPlantClick: (id: string) => void;
  stats: ReturnType<typeof getTotalStats>;
}) {
  return (
    <>
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ExecutiveKPICard
          title="Total Plants"
          value={`${stats.onlinePlants}/${stats.totalPlants}`}
          subtitle="Online"
          color="green"
          icon={<Building2 size={18} />}
        />
        <ExecutiveKPICard
          title="Total Output"
          value={`${(stats.totalOutput / 1000).toFixed(1)}GW`}
          subtitle="Current Generation"
          trend="up"
          trendValue="+5.2%"
          color="gold"
          icon={<Zap size={18} />}
        />
        <ExecutiveKPICard
          title="Workforce"
          value={stats.totalWorkforce.toLocaleString()}
          subtitle="Active Personnel"
          color="blue"
          icon={<Users size={18} />}
        />
        <RiskIndicator value={23.45} label="Risk Incident" />
      </div>

      {/* Map */}
      <div className="h-[400px] mb-6">
        <NigeriaMap
          selectedPlant={selectedPlant}
          onPlantClick={onPlantClick}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ExecutiveKPICard
          title="Operational Efficiency"
          value="94.2%"
          trend="up"
          trendValue="+6.4% this quarter"
          color="green"
        />
        <ExecutiveKPICard
          title="Maintenance Compliance"
          value="87%"
          trend="down"
          trendValue="-2.1% from target"
          color="gold"
        />
        <ExecutiveKPICard
          title="Active Contracts"
          value="45"
          subtitle="₦12.4B total value"
          color="blue"
        />
        <ExecutiveKPICard
          title="Monthly Revenue"
          value="₦8.2B"
          trend="up"
          trendValue="+12% YoY"
          color="gold"
        />
      </div>
    </>
  );
}

function WorkforceView() {
  const stats = getTotalStats();

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ExecutiveKPICard
          title="Total Workforce"
          value={stats.totalWorkforce.toLocaleString()}
          subtitle="Across all plants"
          color="gold"
          icon={<Users size={18} />}
        />
        <ExecutiveKPICard
          title="Active On-Site"
          value="892"
          subtitle="Currently working"
          color="green"
        />
        <ExecutiveKPICard
          title="Training Due"
          value="25"
          subtitle="Certifications expiring"
          color="red"
        />
        <ExecutiveKPICard
          title="Departments"
          value="12"
          subtitle="Operating units"
          color="blue"
        />
      </div>

      {/* Departments Grid */}
      <div className="bg-[#1e1e1e] rounded-xl p-4">
        <h3 className="text-lg font-medium text-white mb-4">
          Department Overview
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept, i) => (
            <div key={i} className="bg-[#2c2c2c] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#a5a4a4]">#{dept.rank}</span>
                {dept.trend === "up" ? (
                  <span className="text-xs text-[#1dee4a]">↑</span>
                ) : (
                  <span className="text-xs text-[#ef4444]">↓</span>
                )}
              </div>
              <p className="text-white font-medium">{dept.name}</p>
              <p className="text-2xl font-bold text-[#eeac1d] mt-1">
                {dept.staffCount}
              </p>
              <p className="text-xs text-[#a5a4a4]">Staff members</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ContractsView() {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ExecutiveKPICard
          title="Active Contracts"
          value="45"
          subtitle="Currently running"
          color="gold"
          icon={<FileText size={18} />}
        />
        <ExecutiveKPICard
          title="Total Value"
          value="₦12.4B"
          subtitle="Contract portfolio"
          color="green"
        />
        <ExecutiveKPICard
          title="Expiring Soon"
          value="8"
          subtitle="Within 90 days"
          color="red"
        />
        <ExecutiveKPICard
          title="Compliance Rate"
          value="92%"
          trend="up"
          trendValue="+3% this month"
          color="blue"
        />
      </div>

      <div className="bg-[#1e1e1e] rounded-xl p-4">
        <h3 className="text-lg font-medium text-white mb-4">
          Contract Categories
        </h3>
        <div className="space-y-3">
          {[
            { name: "O&M Services", count: 18, value: "₦4.2B" },
            { name: "Equipment Supply", count: 12, value: "₦3.8B" },
            { name: "Gas Supply", count: 5, value: "₦2.1B" },
            { name: "Consulting", count: 10, value: "₦2.3B" },
          ].map((cat, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#2c2c2c] rounded-lg p-4"
            >
              <div>
                <p className="text-white font-medium">{cat.name}</p>
                <p className="text-xs text-[#a5a4a4]">{cat.count} contracts</p>
              </div>
              <p className="text-lg font-semibold text-[#eeac1d]">{cat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function GridView() {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ExecutiveKPICard
          title="Grid Stability"
          value="98.6%"
          subtitle="System reliability"
          color="green"
          icon={<Zap size={18} />}
        />
        <ExecutiveKPICard
          title="Transmission"
          value="1,220 MW"
          subtitle="Current load"
          color="gold"
        />
        <ExecutiveKPICard
          title="Losses"
          value="5.9%"
          trend="down"
          trendValue="↑ from 4.7%"
          color="red"
        />
        <ExecutiveKPICard
          title="Substations"
          value="24"
          subtitle="Connected"
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#1e1e1e] rounded-xl p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Transmission Lines
          </h3>
          <div className="space-y-3">
            {[
              { name: "330kV Alaoji-Onitsha", status: "online", load: "85%" },
              { name: "132kV Geregu-Lokoja", status: "online", load: "72%" },
              { name: "330kV Calabar-Ikot", status: "warning", load: "94%" },
            ].map((line, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-[#2c2c2c] rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      line.status === "online"
                        ? "bg-[#1dee4a]"
                        : "bg-[#f97316]"
                    )}
                  />
                  <p className="text-sm text-white">{line.name}</p>
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    parseInt(line.load) > 90
                      ? "text-[#f97316]"
                      : "text-[#1dee4a]"
                  )}
                >
                  {line.load}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1e1e1e] rounded-xl p-4">
          <h3 className="text-lg font-medium text-white mb-4">Load Forecast</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#a5a4a4]">Peak Today</span>
              <span className="text-lg font-semibold text-[#eeac1d]">
                1,450 MW
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#a5a4a4]">Off-Peak</span>
              <span className="text-lg font-semibold text-[#1dee4a]">
                890 MW
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#a5a4a4]">Critical Period</span>
              <span className="text-sm text-[#ef4444]">6PM - 9PM</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function OperationsView() {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ExecutiveKPICard
          title="Active Tasks"
          value="12"
          subtitle="In progress"
          color="gold"
          icon={<ClipboardList size={18} />}
        />
        <ExecutiveKPICard
          title="Pending"
          value="3"
          subtitle="Awaiting approval"
          color="red"
        />
        <ExecutiveKPICard
          title="Completed MTD"
          value="48"
          trend="up"
          trendValue="+12% vs last month"
          color="green"
        />
        <ExecutiveKPICard
          title="SLA Compliance"
          value="94%"
          subtitle="On-time completion"
          color="blue"
        />
      </div>

      <div className="bg-[#1e1e1e] rounded-xl p-4">
        <h3 className="text-lg font-medium text-white mb-4">
          Maintenance Schedule
        </h3>
        <div className="space-y-3">
          {[
            {
              task: "GT-1 Combustion Inspection",
              plant: "Alaoji",
              due: "Dec 22",
              priority: "high",
            },
            {
              task: "Compressor Washing",
              plant: "Geregu",
              due: "Dec 24",
              priority: "medium",
            },
            {
              task: "Vibration Analysis",
              plant: "Calabar",
              due: "Dec 25",
              priority: "low",
            },
            {
              task: "Lube Oil Change",
              plant: "Omotosho",
              due: "Dec 28",
              priority: "medium",
            },
          ].map((task, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#2c2c2c] rounded-lg p-4"
            >
              <div>
                <p className="text-white font-medium">{task.task}</p>
                <p className="text-xs text-[#a5a4a4]">{task.plant} Plant</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white">{task.due}</p>
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded",
                    task.priority === "high"
                      ? "bg-[#ef4444]/20 text-[#ef4444]"
                      : task.priority === "medium"
                      ? "bg-[#f97316]/20 text-[#f97316]"
                      : "bg-[#1dee4a]/20 text-[#1dee4a]"
                  )}
                >
                  {task.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function FinanceView() {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ExecutiveKPICard
          title="Operating Cost"
          value="₦85.6M"
          subtitle="This month"
          color="gold"
          icon={<TrendingUp size={18} />}
        />
        <ExecutiveKPICard
          title="Revenue"
          value="₦142M"
          trend="up"
          trendValue="+8.2% MoM"
          color="green"
        />
        <ExecutiveKPICard
          title="Fuel Cost"
          value="₦61.6M"
          subtitle="72% of OPEX"
          color="red"
        />
        <ExecutiveKPICard
          title="Net Margin"
          value="39.7%"
          trend="up"
          trendValue="+2.1%"
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#1e1e1e] rounded-xl p-4">
          <h3 className="text-lg font-medium text-white mb-4">Cost Breakdown</h3>
          <div className="space-y-3">
            {[
              { name: "Fuel & Gas", value: "₦61.6M", percent: 72 },
              { name: "Maintenance", value: "₦12.8M", percent: 15 },
              { name: "Personnel", value: "₦6.8M", percent: 8 },
              { name: "Other", value: "₦4.4M", percent: 5 },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#a5a4a4]">{item.name}</span>
                  <span className="text-white">{item.value}</span>
                </div>
                <div className="w-full h-1.5 bg-[#2c2c2c] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#eeac1d] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1e1e1e] rounded-xl p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Budget Utilization
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#a5a4a4]">Q4 Budget</span>
                <span className="text-sm text-white">85% used</span>
              </div>
              <div className="w-full h-2 bg-[#2c2c2c] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#f97316] rounded-full"
                  style={{ width: "85%" }}
                />
              </div>
              <p className="text-xs text-[#a5a4a4] mt-1">
                6 weeks before quarter-end
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-2xl font-bold text-[#eeac1d]">₦256M</p>
              <p className="text-sm text-[#a5a4a4]">
                Remaining budget for Q4 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ExecutiveDashboardPage() {
  return (
    <Suspense fallback={<div className="p-7 text-white">Loading...</div>}>
      <ExecutiveDashboardContent />
    </Suspense>
  );
}

