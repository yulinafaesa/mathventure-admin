"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Brand from "./Brand";
import { CloseIcon, DashboardIcon, LogoutIcon, MateriIcon, SoalIcon, UserIcon } from "./icons";

const NAV = [
  { href: "/dashboard", label: "Dashboard", Icon: DashboardIcon },
  { href: "/materi", label: "Kelola Materi", Icon: MateriIcon },
  { href: "/soal", label: "Kelola Soal", Icon: SoalIcon },
  { href: "/user", label: "Kelola User", Icon: UserIcon },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <aside className={`sidebar${isOpen ? " sidebar--open" : ""}`}>
      {onClose && (
        <button
          type="button"
          className="sidebar__close"
          onClick={onClose}
          aria-label="Tutup Menu"
        >
          <CloseIcon width={20} height={20} />
        </button>
      )}

      <Brand />

      <nav className="nav">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`nav__item${active ? " nav__item--active" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={onClose}
            >
              <span className="nav__icon">
                <Icon />
              </span>
              <span className="nav__label">{label}</span>
            </Link>
          );
        })}
      </nav>

      <button type="button" className="logout" onClick={handleLogout}>
        <LogoutIcon />
        <span>Keluar</span>
      </button>
    </aside>
  );
}
