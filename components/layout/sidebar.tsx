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
} from "lucide-react";

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
  { icon: BadgeDollarSign, href: "/dashboard/financial", label: "Revenue Protection" },
  { icon: Bell, href: "/dashboard/notifications", label: "Notifications", badge: 5 },
  { icon: Settings, href: "/dashboard/settings", label: "Settings" },
];

const executiveItems: SidebarItem[] = [
  { icon: LayoutDashboard, href: "/dashboard/executive", label: "Executive Overview" },
  { icon: BadgeDollarSign, href: "/dashboard/financial", label: "ROI & Revenue" },
  { icon: Sparkles, href: "/dashboard/predictive", label: "Predictive Analytics" },
  { icon: Activity, href: "/dashboard/asset-health", label: "Asset Health" },
  { icon: Building2, href: "/dashboard/plants", label: "Plants" },
  { icon: Bell, href: "/dashboard/notifications", label: "Alerts", badge: 8 },
  { icon: Settings, href: "/dashboard/settings", label: "Settings" },
];

interface SidebarProps {
  variant?: "engineer" | "executive";
}

export function Sidebar({ variant = "engineer" }: SidebarProps) {
  const pathname = usePathname();
  const items = variant === "executive" ? executiveItems : engineerItems;

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[84px] bg-[#1e1e1e] flex-col items-center py-6 z-40">
      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col items-center gap-2 mt-16">
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
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-[#eeac1d] text-[#111]"
                  : "text-[#a5a4a4] hover:text-white hover:bg-[#2c2c2c]"
              )}
              title={item.label}
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
          );
        })}
      </nav>
    </aside>
  );
}
