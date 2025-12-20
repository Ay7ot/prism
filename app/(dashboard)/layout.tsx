"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isExecutive = pathname.includes("/executive");

  return (
    <div className="min-h-screen bg-[#111]">
      <Sidebar variant={isExecutive ? "executive" : "engineer"} />
      <Topbar
        userName={isExecutive ? "Jennifer Adighije" : "Chloe Milagres"}
        userRole={isExecutive ? "Managing Director" : "Engineer"}
      />
      <main className="lg:ml-[84px] pt-20 min-h-screen">
        {children}
      </main>
    </div>
  );
}
