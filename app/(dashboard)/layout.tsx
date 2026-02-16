// app/(dashboard)/layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <main className="flex-1 md:ml-64 pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
