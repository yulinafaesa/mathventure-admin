import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function DashboardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.8" />
    </svg>
  );
}

export function MateriIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="3.5" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function SoalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="4" width="14" height="17" rx="2.5" />
      <rect x="9" y="2" width="6" height="4" rx="1.2" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.6" />
      <path d="M2.5 20c0-3.7 2.9-6 6.5-6s6.5 2.3 6.5 6" />
      <path d="M15.5 4.6a3.4 3.4 0 0 1 0 6.8" />
      <path d="M18 14.4c2.1.7 3.5 2.6 3.5 5.1" />
    </svg>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
      <path d="M10 12h11" />
      <path d="m17 8 4 4-4 4" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" aria-hidden="true" {...props}>
      <rect x="0" y="0" width="28" height="18" rx="2" fill="#6E6B7B" />
      <path d="M1.5 2.2 14 11.2 26.5 2.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg width="22" height="27" viewBox="0 0 22 27" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5.2 11.5V8a5.8 5.8 0 0 1 11.6 0v3.5"
        stroke="#6E6B7B"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <rect x="0.5" y="11" width="21" height="15.5" rx="3.2" fill="#6E6B7B" />
    </svg>
  );
}