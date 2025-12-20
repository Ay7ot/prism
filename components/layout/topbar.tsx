"use client";

import { cn } from "@/lib/utils";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { PrismLogo } from "@/components/ui/prism-logo";

interface TopbarProps {
  userName?: string;
  userRole?: string;
  className?: string;
  onMobileMenuToggle?: () => void;
}

export function Topbar({
  userName = "Chloe Milagres",
  userRole = "Engineer",
  className,
  onMobileMenuToggle,
}: TopbarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-20 bg-[#111] border-b border-[#b0b0b0]/10 z-30",
        "flex items-center justify-between px-6",
        "left-0 lg:left-[84px]",
        className
      )}
    >
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center">
        <PrismLogo width={127} height={37} />
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Search Button - Desktop only */}
        <button className="hidden lg:flex w-[42px] h-[42px] rounded-full bg-white/5 items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
          <Search size={16} />
        </button>

        {/* Notifications */}
        <button className="w-[42px] h-[42px] rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ef4444] rounded-full" />
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden w-[42px] h-[42px] rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Profile - Desktop only */}
        <button className="hidden lg:flex items-center gap-3 bg-white/5 rounded-full pl-1 pr-4 py-1 hover:bg-white/10 transition-colors">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#eeac1d] to-[#ffc34d] flex items-center justify-center text-[#111] font-semibold text-sm overflow-hidden">
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white/80">{userName}</p>
            <p className="text-[10px] text-white/70">{userRole}</p>
          </div>
          <ChevronDown size={12} className="text-white/60" />
        </button>
      </div>
    </header>
  );
}
