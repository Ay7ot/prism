"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  MessageSquare,
  Settings,
  Bell,
  HelpCircle,
  Calendar,
  ClipboardList,
  Zap,
  Shield,
  TrendingUp,
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
  { icon: FileText, href: "/dashboard/reports", label: "Reports" },
  { icon: ClipboardList, href: "/dashboard/maintenance", label: "Maintenance" },
  { icon: Users, href: "/dashboard/team", label: "Team" },
  { icon: MessageSquare, href: "/dashboard/messages", label: "Messages", badge: 3 },
  { icon: Bell, href: "/dashboard/notifications", label: "Notifications", badge: 5 },
  { icon: Calendar, href: "/dashboard/schedule", label: "Schedule" },
  { icon: Settings, href: "/dashboard/settings", label: "Settings" },
  { icon: HelpCircle, href: "/dashboard/help", label: "Help" },
];

const executiveItems: SidebarItem[] = [
  { icon: LayoutDashboard, href: "/dashboard/executive", label: "Overview" },
  { icon: Building2, href: "/dashboard/executive?view=plants", label: "Plants" },
  { icon: Users, href: "/dashboard/executive?view=workforce", label: "Workforce" },
  { icon: FileText, href: "/dashboard/executive?view=contracts", label: "Contracts" },
  { icon: Zap, href: "/dashboard/executive?view=grid", label: "Grid" },
  { icon: ClipboardList, href: "/dashboard/executive?view=operations", label: "O&M" },
  { icon: TrendingUp, href: "/dashboard/executive?view=finance", label: "Finance" },
  { icon: Shield, href: "/dashboard/executive?view=compliance", label: "Compliance" },
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
