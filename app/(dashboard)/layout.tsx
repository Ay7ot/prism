"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isExecutive = pathname.includes("/executive");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#111]">
      <Sidebar
        variant={isExecutive ? "executive" : "engineer"}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Topbar
        userName={isExecutive ? "Jennifer Adighije" : "Chloe Milagres"}
        userRole={isExecutive ? "Managing Director" : "Engineer"}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <main className="lg:ml-[84px] pt-20 min-h-screen">
        {children}
      </main>
    </div>
  );
}
