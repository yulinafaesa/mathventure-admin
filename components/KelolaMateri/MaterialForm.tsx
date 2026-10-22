"use client";

import { useState } from "react";
import { Material } from "@/types/material";

interface MaterialFormProps {
  initialData?: Material | null;
  onSave: (material: Omit<Material, "id">, id?: string) => void;
  onCancel: () => void;
}

export default function MaterialForm({
  initialData,
  onSave,
  onCancel,
}: MaterialFormProps) {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [submitted, setSubmitted] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const isTitleEmpty = !title.trim();
    const isDescEmpty = !description.trim();

    setTitleError(isTitleEmpty);
    setDescriptionError(isDescEmpty);

    if (isTitleEmpty || isDescEmpty) {
      return;
    }

    onSave(
      {
        title: title.trim(),
        description: description.trim(),
      },
      initialData?.id
    );
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (submitted) {
      setTitleError(!val.trim());
    }
  };

  const handleDescriptionChange = (val: string) => {
    setDescription(val);
    if (submitted) {
      setDescriptionError(!val.trim());
    }
  };

  const hasErrors = submitted && (titleError || descriptionError);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-8">
      {/* Title & Subtitle */}
      <div className="mb-6">
        <h2 className="text-[26px] font-bold text-[#1D1B22] tracking-tight">
          {isEditing ? "Edit Materi" : "Tambah Materi"}
        </h2>
        <p className="text-[15px] text-[#6B6875] mt-0.5 font-normal">
          Isi semua kolom, lalu klik Simpan.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-[#E3E2E8] rounded-[12px] p-8 shadow-xs">
        <form onSubmit={handleSubmit} noValidate>
          {/* Judul Materi */}
          <div>
            <label
              htmlFor="judul-materi"
              className="block text-[14px] font-semibold text-[#1D1B22] mb-2"
            >
              Judul Materi
            </label>
            <input
              id="judul-materi"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Masukkan judul materi"
              className={`w-full h-[44px] px-4 rounded-[8px] text-[15px] text-[#1D1B22] placeholder:text-[#6B6875] outline-none transition-colors ${
                titleError
                  ? "border border-[#C0302F] focus:border-[#C0302F]"
                  : "border border-[#E3E2E8] focus:border-[#B3245B]"
              }`}
            />
            {titleError && (
              <p className="text-[13px] font-medium text-[#C0302F] mt-1.5">
                Judul materi wajib diisi.
              </p>
            )}
          </div>

          {/* Deskripsi */}
          <div className="mt-6">
            <label
              htmlFor="deskripsi"
              className="block text-[14px] font-semibold text-[#1D1B22] mb-2"
            >
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Isi detail materi"
              rows={6}
              className={`w-full min-h-[170px] p-4 rounded-[8px] text-[15px] text-[#1D1B22] placeholder:text-[#6B6875] outline-none transition-colors resize-y ${
                descriptionError
                  ? "border border-[#C0302F] focus:border-[#C0302F]"
                  : "border border-[#E3E2E8] focus:border-[#B3245B]"
              }`}
            />
            {descriptionError && (
              <p className="text-[13px] font-medium text-[#C0302F] mt-1.5">
                Deskripsi wajib diisi.
              </p>
            )}
          </div>

          {/* Error Alert Box (Screenshots 5) */}
          {hasErrors && (
            <div className="mt-6 border border-[#C0302F] bg-[#FDEEEE] rounded-[8px] py-3 px-4 text-center">
              <p className="text-[14px] font-bold text-[#C0302F]">
                Data belum lengkap
              </p>
              <p className="text-[13px] text-[#C0302F] mt-0.5 font-normal">
                Isi semua kolom yang ditandai merah, lalu klik Simpan lagi.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="h-[40px] px-6 rounded-[8px] border border-[#E3E2E8] bg-white text-[#1D1B22] font-semibold text-[15px] hover:bg-[#F4F4F6] transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-[40px] px-6 rounded-[8px] bg-[#B3245B] hover:bg-[#9c1f4e] text-white font-semibold text-[15px] shadow-sm transition-colors cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
