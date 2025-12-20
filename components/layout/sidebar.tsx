"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Sparkles,
  Activity,
  BadgeDollarSign,
  Settings,
  Bell,
  Wind,
  Target,
  X,
} from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { PrismLogo } from "@/components/ui/prism-logo";

interface SidebarItem {
  icon: React.ElementType;
  href: string;
  label: string;
  badge?: number;
}

const engineerItems: SidebarItem[] = [
  { icon: LayoutDashboard, href: "/dashboard", label: "Overview" },
  { icon: Building2, href: "/dashboard/plants", label: "Plants" },
  { icon: Sparkles, href: "/dashboard/predictive", label: "Predictive Analytics" },
  { icon: Activity, href: "/dashboard/asset-health", label: "Asset Health" },
  { icon: Wind, href: "/dashboard/gas-quality", label: "Gas Quality Monitoring" },
  { icon: BadgeDollarSign, href: "/dashboard/financial", label: "Revenue Protection" },
  { icon: Target, href: "/dashboard/erpc", label: "ERPC Dashboard" },
  { icon: Bell, href: "/dashboard/notifications", label: "Notifications", badge: 5 },
  { icon: Settings, href: "/dashboard/settings", label: "Settings" },
];

const executiveItems: SidebarItem[] = [
  { icon: LayoutDashboard, href: "/dashboard/executive", label: "Executive Overview" },
  { icon: BadgeDollarSign, href: "/dashboard/financial", label: "ROI & Revenue" },
  { icon: Target, href: "/dashboard/erpc", label: "ERPC Dashboard" },
  { icon: Sparkles, href: "/dashboard/predictive", label: "Predictive Analytics" },
  { icon: Activity, href: "/dashboard/asset-health", label: "Asset Health" },
  { icon: Wind, href: "/dashboard/gas-quality", label: "Gas Quality" },
  { icon: Building2, href: "/dashboard/plants", label: "Plants" },
  { icon: Bell, href: "/dashboard/notifications", label: "Alerts", badge: 8 },
  { icon: Settings, href: "/dashboard/settings", label: "Settings" },
];

interface SidebarProps {
  variant?: "engineer" | "executive";
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ variant = "engineer", isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const items = variant === "executive" ? executiveItems : engineerItems;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar - Icon only with tooltips */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[84px] bg-[#1e1e1e] flex-col items-center py-6 z-40">
        <nav className="flex-1 flex flex-col items-center gap-2 mt-16">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                item.href !== "/dashboard/executive" &&
                pathname.startsWith(item.href.split("?")[0]));

            return (
              <Tooltip key={item.href} content={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-[#eeac1d] text-[#111]"
                      : "text-[#a5a4a4] hover:text-white hover:bg-[#2c2c2c]"
                  )}
                >
                  <Icon size={22} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ef4444] rounded-full text-[10px] text-white flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#eeac1d] rounded-l" />
                  )}
                </Link>
              </Tooltip>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar - Full width with text */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 h-screen w-[280px] bg-[#1e1e1e] z-50 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <PrismLogo width={100} height={29} />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col gap-1 p-4 mt-4">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                item.href !== "/dashboard/executive" &&
                pathname.startsWith(item.href.split("?")[0]));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-[#eeac1d] text-[#111]"
                    : "text-[#a5a4a4] hover:text-white hover:bg-[#2c2c2c]"
                )}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto w-5 h-5 bg-[#ef4444] rounded-full text-[10px] text-white flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#eeac1d] rounded-l" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
