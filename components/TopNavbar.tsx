"use client";

interface TopNavbarProps {
  title: string;
}

export default function TopNavbar({ title }: TopNavbarProps) {
  return (
    <header className="h-[64px] bg-white border-b border-[#E3E2E8] px-8 flex items-center justify-between shrink-0 select-none">
      <h1 className="text-[16px] font-semibold text-[#1D1B22]">
        {title}
      </h1>

      {/* Admin Profile */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#22192A] text-white flex items-center justify-center font-bold text-[15px]">
          A
        </div>
        <span className="text-[15px] font-medium text-[#1D1B22]">
          Admin
        </span>
      </div>
    </header>
  );
}
