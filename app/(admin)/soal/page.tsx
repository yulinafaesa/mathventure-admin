"use client";

import { useState } from "react";
import Link from "next/link";
import { useData, type Soal } from "@/lib/DataContext";
import { CrudHeader, DeleteConfirmModal, Icon } from "@/components/crud/ui";

export default function SoalPage() {
  const { soal, materi, loading, error, refreshData, deleteSoal, showFlash } = useData();
  const [akanDihapus, setAkanDihapus] = useState<Soal | null>(null);

  const namaMateri = (item: Soal) => materi.find((m) => m.id === item.materiId)?.judul ?? item.materiJudul ?? "-";

  async function handleConfirmHapus() {
    if (!akanDihapus) return;
    try {
      await deleteSoal(akanDihapus.id);
      showFlash("Soal berhasil disimpan");
    } catch (err) {
      showFlash(err instanceof Error ? err.message : "Gagal menghapus soal.");
    } finally {
      setAkanDihapus(null);
    }
  }

  return (
    <>
      <CrudHeader title="Kelola Soal" buttonLabel="Tambah Soal" buttonHref="/soal/tambah" />

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
              <th style={{ width: "32%" }}>Pertanyaan</th>
              <th>Jawaban</th>
              <th>Materi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="empty">
                  Memuat data soal dari server...
                </td>
              </tr>
            )}
            {!loading && soal.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  {error ? "Tidak dapat memuat data soal dari server." : "Belum ada soal. Klik Tambah Soal untuk menambahkan."}
                </td>
              </tr>
            )}
            {!loading &&
              soal.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="strong">{item.pertanyaan}</td>
                  <td>{item.jawaban}</td>
                  <td>
                    <span className="tag">{namaMateri(item)}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/soal/${item.id}/edit`} className="btn-action-edit" aria-label={`Edit soal`} title="Edit">
                        <Icon name="pencil" size={17} />
                      </Link>
                      <button type="button" className="btn-action-delete" onClick={() => setAkanDihapus(item)} aria-label={`Hapus soal`} title="Hapus">
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmModal title="Hapus Soal?" itemName={akanDihapus?.pertanyaan} isOpen={Boolean(akanDihapus)} onConfirm={() => void handleConfirmHapus()} onCancel={() => setAkanDihapus(null)} />
    </>
  );
}
