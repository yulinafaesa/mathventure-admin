"use client";

import { useState } from "react";
import Link from "next/link";
import { useData, type Soal } from "@/lib/DataContext";
import { CrudHeader, DeleteConfirmModal } from "@/components/crud/ui";

export default function SoalPage() {
  const { soal, materi, loading, error, refreshData, deleteSoal, showFlash } = useData();
  const [akanDihapus, setAkanDihapus] = useState<Soal | null>(null);

  const namaMateri = (item: Soal) => materi.find((m) => m.id === item.materiId)?.judul ?? item.materiJudul ?? "-";

  async function handleConfirmHapus() {
    if (!akanDihapus) return;
    try {
      await deleteSoal(akanDihapus.id);
      showFlash("Soal berhasil dihapus.");
    } catch (err) {
      showFlash(err instanceof Error ? err.message : "Gagal menghapus soal.");
    } finally {
      setAkanDihapus(null);
    }
  }

  return (
    <>
      <CrudHeader title="Kelola Soal" description={loading ? "Memuat soal..." : `Ada ${soal.length} soal.`} buttonLabel="Tambah Soal" buttonHref="/soal/tambah" />

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

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "34%" }}>Pertanyaan</th>
              <th>Jawaban</th>
              <th>Materi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="empty">
                  Memuat data soal dari server...
                </td>
              </tr>
            )}
            {!loading && soal.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">
                  {error ? "Tidak dapat memuat data soal dari server." : "Belum ada soal. Klik Tambah Soal untuk menambahkan."}
                </td>
              </tr>
            )}
            {!loading &&
              soal.map((item) => (
                <tr key={item.id}>
                  <td className="strong">{item.pertanyaan}</td>
                  <td>{item.jawaban}</td>
                  <td>
                    <span className="tag">{namaMateri(item)}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/soal/${item.id}/edit`} className="btn-small">
                        Edit
                      </Link>
                      <button type="button" className="btn-small danger" onClick={() => setAkanDihapus(item)}>
                        Hapus
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
