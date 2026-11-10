"use client";

import { usePathname } from "next/navigation";
import { MenuIcon } from "./icons";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const pathname = usePathname();

  let title = "Dashboard";
  if (pathname === "/dashboard") {
    title = "Dashboard";
  } else if (pathname === "/materi/tambah") {
    title = "Tambah Materi";
  } else if (pathname.startsWith("/materi") && pathname.includes("/edit")) {
    title = "Edit Materi";
  } else if (pathname.startsWith("/materi")) {
    title = "Kelola Materi";
  } else if (pathname === "/soal/tambah") {
    title = "Tambah Soal";
  } else if (pathname.startsWith("/soal") && pathname.includes("/edit")) {
    title = "Edit Soal";
  } else if (pathname.startsWith("/soal")) {
    title = "Kelola Soal";
  } else if (pathname === "/user/tambah") {
    title = "Tambah User";
  } else if (pathname.startsWith("/user") && pathname.includes("/edit")) {
    title = "Edit User";
  } else if (pathname.startsWith("/user")) {
    title = "Kelola User";
  }

  const isDashboard = pathname === "/dashboard";

  return (
    <header className={`topbar${isDashboard ? " topbar--dashboard" : ""}`}>
      <div className="topbar__left">
        <button
          type="button"
          className="topbar__hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle Menu"
        >
          <MenuIcon width={22} height={22} />
        </button>
        <h2 className="topbar__title">{title}</h2>
      </div>
      <div className="topbar__user">
        <span className="topbar__avatar">A</span>
        <span className="topbar__name">Admin</span>
      </div>
    </header>
  );
}
