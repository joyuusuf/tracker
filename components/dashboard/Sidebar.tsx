"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";

type SidebarProps = {
  isOpen: boolean; // mobile open
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Get transactions from store
  const transactions = useTransactionStore((s) => s.transactions);

  const links = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: ArrowLeftRight, badge: transactions.length },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Add Transaction", path: "/add-transaction", icon: PlusCircle },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-x-0 top-14 bottom-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 bg-white border-r h-screen flex flex-col
          transform transition-all duration-300
          top-14 md:top-0
          ${collapsed ? "w-20" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:flex
        `}
      >
        {/* Logo + collapse */}
        <div
          className={`p-4 font-semibold text-lg flex items-center cursor-pointer ${
            collapsed ? "justify-center" : "justify-between"
          }`}
          onClick={() => handleNavigate("/")}
        >
          <span
            className={`transition-all duration-300 ${
              collapsed ? "opacity-0 -translate-x-2" : "opacity-100 translate-x-0"
            }`}
          >
            Tracker
          </span>
          <button
            className="ml-auto hidden md:block text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-1 mt-4 flex-1 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.path;

            return (
              <button
                key={link.name}
                onClick={() => handleNavigate(link.path)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded text-left
                  font-medium text-sm relative transition-all duration-300 group
                  ${collapsed ? "justify-center" : ""}
                  ${isActive ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                {/* Icon */}
                <Icon
                  size={18}
                  className={`
                    transition-transform duration-200
                    ${!collapsed ? "group-hover:rotate-12" : ""}
                    ${isActive ? "text-green-700" : "text-gray-500"}
                  `}
                />

                {/* Text + Badge wrapper */}
                <div
                  className={`flex-1 flex items-center justify-between transition-all duration-300
                    ${collapsed ? "opacity-0 -translate-x-6 pointer-events-none" : "opacity-100 translate-x-0"}
                  `}
                >
                  <span>{link.name}</span>
                  {link.badge !== undefined && (
                    <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full transition-all duration-300">
                      {link.badge || 0}
                    </span>
                  )}
                </div>

                {/* Tooltip on collapsed */}
                {collapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {link.name}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
