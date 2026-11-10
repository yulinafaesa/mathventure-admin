"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Toast } from "./crud/ui";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="shell">
      <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="main">
        <Topbar onToggleSidebar={() => setMobileOpen((prev) => !prev)} />
        <div className="content">
          <div className="crud">
            {children}
            <Toast />
          </div>
        </div>
      </div>
    </div>
  );
}
