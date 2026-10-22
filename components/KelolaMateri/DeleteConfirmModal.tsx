"use client";

import { Material } from "@/types/material";

interface DeleteConfirmModalProps {
  material: Material | null;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  material,
  isOpen,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen || !material) return null;

  return (
    <div className="fixed inset-0 bg-black/35 backdrop-blur-[1px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[12px] border border-[#E3E2E8] p-6 max-w-md w-full shadow-xl animate-in zoom-in-95 duration-200">
        <h3 className="text-[18px] font-bold text-[#1D1B22]">
          Hapus Materi?
        </h3>
        <p className="text-[14px] text-[#6B6875] mt-2 leading-relaxed">
          Apakah Anda yakin ingin menghapus materi{" "}
          <strong className="text-[#1D1B22]">&ldquo;{material.title}&rdquo;</strong>? Data yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="h-[38px] px-5 rounded-[8px] border border-[#E3E2E8] text-[#1D1B22] font-semibold text-[14px] hover:bg-[#F4F4F6] transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-[38px] px-5 rounded-[8px] bg-[#C0302F] hover:bg-[#a52827] text-white font-semibold text-[14px] shadow-sm transition-colors cursor-pointer"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
