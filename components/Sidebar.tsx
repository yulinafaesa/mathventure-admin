"use client";

import Image from "next/image";
import {
  LayoutGrid,
  Map,
  FileQuestion,
  User,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  activeMenu?: string;
  onSelectMenu?: (menu: string) => void;
}

export default function Sidebar({
  activeMenu = "kelola-materi",
  onSelectMenu,
}: SidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
    },
    {
      id: "kelola-materi",
      label: "Kelola Materi",
      icon: Map,
    },
    {
      id: "kelola-soal",
      label: "Kelola Soal",
      icon: FileQuestion,
    },
    {
      id: "kelola-user",
      label: "Kelola User",
      icon: User,
    },
  ];

  return (
    <aside className="w-[248px] bg-[#22192A] min-h-screen flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-sm">
          <Image
            src="/images/logo.png"
            alt="MathVenture Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-[16px] leading-tight tracking-tight">
            MathVenture
          </span>
          <span className="text-[#8E8B99] text-[12px] font-normal mt-0.5">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="mt-4 px-3 flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeMenu;

          if (isActive) {
            return (
              <div
                key={item.id}
                className="relative flex items-center"
              >
                {/* Left accent tab extending to sidebar edge */}
                <span className="absolute -left-3 top-0 bottom-0 w-3 bg-[#B3245B] rounded-r-sm" />
                <button
                  type="button"
                  onClick={() => onSelectMenu?.(item.id)}
                  className="w-full flex items-center gap-3.5 px-4 h-[44px] rounded-[10px] border border-[#B3245B] bg-[#B3245B]/10 text-white font-semibold text-[15px] transition-colors shadow-sm"
                >
                  <Icon className="w-5 h-5 text-white shrink-0 stroke-[2.2]" />
                  <span>{item.label}</span>
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectMenu?.(item.id)}
              className="w-full flex items-center gap-3.5 px-4 h-[44px] rounded-[10px] text-[#9A96A6] hover:text-white hover:bg-white/5 font-medium text-[15px] transition-colors"
            >
              <Icon className="w-5 h-5 text-[#9A96A6] shrink-0 stroke-[1.8]" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout button at bottom */}
      <div className="p-5 pb-8">
        <button
          type="button"
          onClick={() => {
            alert("Keluar dari Admin Panel");
          }}
          className="flex items-center gap-3.5 text-[#9A96A6] hover:text-white transition-colors text-[15px] font-medium px-2 py-1"
        >
          <LogOut className="w-5 h-5 text-[#9A96A6] shrink-0 stroke-[1.8]" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
