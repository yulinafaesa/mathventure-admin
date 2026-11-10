"use client";

import { useState } from "react";
import Link from "next/link";
import { useData, type Materi } from "@/lib/DataContext";
import { CrudHeader, DeleteConfirmModal, Icon } from "@/components/crud/ui";

export default function MateriPage() {
  const { materi, loading, error, refreshData, deleteMateri, showFlash } = useData();
  const [akanDihapus, setAkanDihapus] = useState<Materi | null>(null);

  async function handleConfirmHapus() {
    if (!akanDihapus) return;
    try {
      await deleteMateri(akanDihapus.id);
      showFlash("Materi berhasil disimpan");
    } catch (err) {
      showFlash(err instanceof Error ? err.message : "Gagal menghapus materi.");
    } finally {
      setAkanDihapus(null);
    }
  }

  return (
    <>
      <CrudHeader title="Kelola Materi" buttonLabel="Tambah Materi" buttonHref="/materi/tambah" />

      {error && (
        <div className="alert-error" role="alert" style={{ marginBottom: 16 }}>
          <div>
            <b>Gagal memuat data</b>
            <div>{error}</div>
            <button type="button" className="btn btn-secondary" onClick={() => void refreshData()} style={{ marginTop: 10 }}>
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      <div className="card-table">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}></th>
              <th>Judul Materi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="empty">
                  Memuat data materi dari server...
                </td>
              </tr>
            )}
            {!loading && materi.length === 0 && (
              <tr>
                <td colSpan={3} className="empty">
                  {error ? "Tidak dapat memuat data materi dari server." : "Belum ada materi. Klik Tambah Materi untuk menambahkan."}
                </td>
              </tr>
            )}
            {!loading &&
              materi.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="with-sub">
                    <div className="cell-title">{item.judul}</div>
                    <div className="cell-sub">{item.deskripsi}</div>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/materi/${item.id}/edit`} className="btn-action-edit" aria-label={`Edit ${item.judul}`} title="Edit">
                        <Icon name="pencil" size={17} />
                      </Link>
                      <button type="button" className="btn-action-delete" onClick={() => setAkanDihapus(item)} aria-label={`Hapus ${item.judul}`} title="Hapus">
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmModal title="Hapus Materi?" itemName={akanDihapus?.judul} isOpen={Boolean(akanDihapus)} onConfirm={() => void handleConfirmHapus()} onCancel={() => setAkanDihapus(null)} />
    </>
  );
}
