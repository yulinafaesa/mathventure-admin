"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useData } from "@/lib/DataContext";

const icons = {
  pencil: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
};

export function Icon({ name, size = 18 }: { name: keyof typeof icons; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

// Judul halaman + keterangan + (opsional) tombol di kanan.
export function CrudHeader({ title, description, buttonLabel, buttonHref, iconOnly = false }: { title: string; description?: string; buttonLabel?: string; buttonHref?: string; iconOnly?: boolean }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {buttonLabel && buttonHref && (
        <Link href={buttonHref} className={`btn btn-primary${iconOnly ? " btn-icon" : ""}`} aria-label={buttonLabel} title={buttonLabel}>
          <Icon name="plus" size={iconOnly ? 20 : 17} />
          {!iconOnly && buttonLabel}
        </Link>
      )}
    </div>
  );
}

// Pembungkus satu kolom formulir: label, input, dan pesan error.
export function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && (
        <div className="error-text">
          <Icon name="alert" size={15} />
          {error}
        </div>
      )}
    </div>
  );
}

// Kotak merah di atas formulir saat ada kolom yang belum diisi.
export function FormAlert() {
  return (
    <div className="alert-error" role="alert">
      <Icon name="alert" size={19} />
      <div>
        <b>Data belum lengkap</b>
        Isi semua kolom yang ditandai merah, lalu klik Simpan lagi.
      </div>
    </div>
  );
}

// Jendela konfirmasi sebelum menghapus data.
export function DeleteConfirmModal({ title, itemName, isOpen, onConfirm, onCancel }: { title: string; itemName?: string; isOpen: boolean; onConfirm: () => void; onCancel: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>
          Apakah Anda yakin ingin menghapus <strong>&ldquo;{itemName}&rdquo;</strong>? Data yang dihapus tidak dapat dikembalikan.
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// Notifikasi hijau di kanan bawah, hilang sendiri setelah 3 detik.
export function Toast() {
  const { flash, clearFlash } = useData();

  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(clearFlash, 3000);
    return () => clearTimeout(timer);
  }, [flash, clearFlash]);

  if (!flash) return null;
  return (
    <div className="toast" role="status">
      <Icon name="check" size={20} />
      {flash}
    </div>
  );
}
