"use client";

import { useState } from "react";
import Link from "next/link";
import { useData, type User } from "@/lib/DataContext";
import { CrudHeader, DeleteConfirmModal, Icon } from "@/components/crud/ui";

export default function UserPage() {
  const { users, loading, error, refreshData, deleteUser, showFlash } = useData();
  const [akanDihapus, setAkanDihapus] = useState<User | null>(null);

  async function handleConfirmHapus() {
    if (!akanDihapus) return;
    try {
      await deleteUser(akanDihapus.id);
      showFlash("User berhasil disimpan");
    } catch (err) {
      showFlash(err instanceof Error ? err.message : "Gagal menghapus user.");
    } finally {
      setAkanDihapus(null);
    }
  }

  return (
    <>
      <CrudHeader title="Kelola User" buttonLabel="Tambah User" buttonHref="/user/tambah" />

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
              <th style={{ width: "32%" }}>Nama lengkap</th>
              <th>Kelas</th>
              <th>Asal sekolah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="empty">
                  Memuat data siswa dari server...
                </td>
              </tr>
            )}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  {error ? "Tidak dapat memuat data siswa dari server." : "Belum ada user. Klik Tambah User untuk menambahkan."}
                </td>
              </tr>
            )}
            {!loading &&
              users.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="strong">{item.nama}</td>
                  <td>{item.kelas}</td>
                  <td>{item.sekolah}</td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/user/${item.id}/edit`} className="btn-action-edit" aria-label={`Edit ${item.nama}`} title="Edit">
                        <Icon name="pencil" size={17} />
                      </Link>
                      <button type="button" className="btn-action-delete" onClick={() => setAkanDihapus(item)} aria-label={`Hapus ${item.nama}`} title="Hapus">
                        <Icon name="trash" size={15} />
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
