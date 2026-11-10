"use client";

import { useState } from "react";
import Link from "next/link";
import { useData, type User } from "@/lib/DataContext";
import { CrudHeader, DeleteConfirmModal } from "@/components/crud/ui";

export default function UserPage() {
  const { users, loading, error, refreshData, deleteUser, showFlash } = useData();
  const [akanDihapus, setAkanDihapus] = useState<User | null>(null);

  async function handleConfirmHapus() {
    if (!akanDihapus) return;
    try {
      await deleteUser(akanDihapus.id);
      showFlash("User berhasil dihapus.");
    } catch (err) {
      showFlash(err instanceof Error ? err.message : "Gagal menghapus user.");
    } finally {
      setAkanDihapus(null);
    }
  }

  return (
    <>
      <CrudHeader title="Kelola User" description={loading ? "Memuat siswa..." : `Ada ${users.length} siswa.`} buttonLabel="Tambah User" buttonHref="/user/tambah" />

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
              <th style={{ width: "34%" }}>Nama lengkap</th>
              <th>Kelas</th>
              <th>Asal sekolah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="empty">
                  Memuat data siswa dari server...
                </td>
              </tr>
            )}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">
                  {error ? "Tidak dapat memuat data siswa dari server." : "Belum ada user. Klik Tambah User untuk menambahkan."}
                </td>
              </tr>
            )}
            {!loading &&
              users.map((item) => (
                <tr key={item.id}>
                  <td className="strong">{item.nama}</td>
                  <td>{item.kelas}</td>
                  <td>{item.sekolah}</td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/user/${item.id}/edit`} className="btn-small">
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

      <DeleteConfirmModal title="Hapus User?" itemName={akanDihapus?.nama} isOpen={Boolean(akanDihapus)} onConfirm={() => void handleConfirmHapus()} onCancel={() => setAkanDihapus(null)} />
    </>
  );
}
