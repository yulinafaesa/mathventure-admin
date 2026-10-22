"use client";

import { Plus } from "lucide-react";
import { Material } from "@/types/material";

interface MaterialListProps {
  materials: Material[];
  onAddClick: () => void;
  onEditClick: (material: Material) => void;
  onDeleteClick: (material: Material) => void;
}

export default function MaterialList({
  materials,
  onAddClick,
  onEditClick,
  onDeleteClick,
}: MaterialListProps) {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-8">
      {/* Page Title & Add Button */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[26px] font-bold text-[#1D1B22] tracking-tight">
            Kelola Materi
          </h2>
          <p className="text-[15px] text-[#6B6875] mt-0.5 font-normal">
            Ada {materials.length} materi.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddClick}
          className="h-[40px] px-5 rounded-[8px] bg-[#B3245B] hover:bg-[#9c1f4e] text-white font-semibold text-[15px] flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Materi</span>
        </button>
      </div>

      {/* Materials Table Card */}
      <div className="bg-white border border-[#E3E2E8] rounded-[12px] shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#E3E2E8] bg-white">
          <span className="text-[14px] font-semibold text-[#6B6875]">
            Judul Materi
          </span>
          <span className="text-[14px] font-semibold text-[#6B6875]">
            Aksi
          </span>
        </div>

        {/* Table Rows */}
        {materials.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[15px] font-medium text-[#6B6875]">
              Belum ada materi pembelajaran.
            </p>
            <button
              type="button"
              onClick={onAddClick}
              className="mt-3 text-[14px] font-semibold text-[#B3245B] hover:underline"
            >
              + Tambah materi pertama Anda
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#E3E2E8]">
            {materials.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-[#FAF9FB] transition-colors"
              >
                <div className="pr-4 max-w-2xl">
                  <h3 className="text-[15px] font-bold text-[#1D1B22] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[#6B6875] mt-1 font-normal line-clamp-1">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onEditClick(item)}
                    className="h-[34px] px-4 rounded-[8px] border border-[#E3E2E8] text-[#1D1B22] font-semibold text-[14px] hover:bg-[#F4F4F6] transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteClick(item)}
                    className="h-[34px] px-4 rounded-[8px] border border-[#C0302F] text-[#C0302F] font-semibold text-[14px] hover:bg-[#FDEEEE] transition-colors cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
