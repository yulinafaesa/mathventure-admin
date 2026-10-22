"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  isOpen,
  onClose,
  duration = 3500,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={onClose}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3.5 bg-[#22192A] text-white px-5 py-3.5 rounded-[10px] shadow-2xl cursor-pointer transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="w-6 h-6 rounded-full bg-[#4ADE80] flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 text-[#22192A] stroke-[3]" />
      </div>
      <span className="text-[14px] font-medium text-white tracking-wide">
        {message}
      </span>
    </div>
  );
}
