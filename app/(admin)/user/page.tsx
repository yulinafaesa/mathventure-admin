"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useData, type User } from "@/lib/DataContext";
import {
  CrudHeader,
  DeleteConfirmModal,
} from "@/components/crud/ui";
import { Pagination } from "@/components/crud/Pagination";

const PAGE_SIZE = 5;
const DEFAULT_CLASS = "3 SD";

export default function UserPage() {
  const {
    users,
    loading,
    error,
    refreshData,
    deleteUser,
    showFlash,
  } = useData();

  const [akanDihapus, setAkanDihapus] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // =====================================
  // FILTER KHUSUS SISWA KELAS 3 SD
  // =====================================

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return users.filter((user) => {
      const isKelas3 =
        user.kelas.trim().toUpperCase() === DEFAULT_CLASS;

      const matchesSearch =
        `${user.nama} ${user.sekolah}`
          .toLowerCase()
          .includes(keyword);

      return isKelas3 && matchesSearch;
    });
  }, [users, search]);

  // =====================================
  // PAGINATION
  // =====================================

  const totalPages = Math.ceil(
    filteredUsers.length / PAGE_SIZE
  );

  const currentPage = Math.min(
    page,
    Math.max(totalPages, 1)
  );

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  // =====================================
  // HAPUS USER
  // =====================================

  async function handleConfirmHapus() {
    if (!akanDihapus) return;

    try {
      await deleteUser(akanDihapus.id);
      showFlash("Data siswa berhasil dihapus.");
    } catch (err) {
      showFlash(
        err instanceof Error
          ? err.message
          : "Gagal menghapus data siswa."
      );
    } finally {
      setAkanDihapus(null);
    }
  }

  // =====================================
  // TAMPILAN HALAMAN
  // =====================================

  return (
    <>
      <CrudHeader
        title="Kelola User"
        buttonLabel="Tambah User"
        buttonHref="/user/tambah"
      />

      {/* ERROR */}
      {error && (
        <div
          className="alert-error"
          role="alert"
          style={{ marginBottom: 20 }}
        >
          <div>
            <b>Gagal memuat data siswa</b>
            <div>{error}</div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => void refreshData()}
              style={{ marginTop: 10 }}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* TOOLBAR PENCARIAN */}
      <div className="table-toolbar">

        <div className="user-search-wrapper">
          <input
            type="search"
            className="table-filter"
            placeholder="Cari nama atau sekolah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari nama atau sekolah siswa"
          />
        </div>

        <span className="class-indicator">
          Kelas 3 SD
        </span>

        <span className="table-count">
          {filteredUsers.length} siswa
        </span>

      </div>

      {/* =================================
          TABEL DATA SISWA
      ================================= */}

      <div className="card-table">
        <table className="table">

          <thead>
            <tr>
              <th style={{ width: "65px" }}>No.</th>
              <th>Nama Lengkap</th>
              <th>Kelas</th>
              <th>Asal Sekolah</th>
              <th style={{ width: "120px" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>

            {/* LOADING */}
            {loading && (
              <tr>
                <td colSpan={5} className="empty">
                  Memuat data siswa...
                </td>
              </tr>
            )}

            {/* DATA KOSONG */}
            {!loading && displayedUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  {error
                    ? "Data siswa gagal dimuat."
                    : search
                      ? "Siswa tidak ditemukan."
                      : "Belum ada siswa kelas 3 SD."}
                </td>
              </tr>
            )}

            {/* DATA SISWA */}
            {!loading &&
              displayedUsers.map((item, index) => (
                <tr key={item.id}>

                  <td>
                    {(currentPage - 1) * PAGE_SIZE +
                      index +
                      1}
                  </td>

                  <td className="strong">
                    {item.nama}
                  </td>

                  <td>
                    <span className="user-class-tag">
                      3 SD
                    </span>
                  </td>

                  <td>
                    {item.sekolah}
                  </td>

                  <td>
                    <div className="row-actions">

                      {/* EDIT */}
                      <Link
                        href={`/user/${item.id}/edit`}
                        className="btn-action-edit"
                        aria-label={`Edit ${item.nama}`}
                        title="Edit siswa"
                      >
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" />
                        </svg>
                      </Link>

                      {/* DELETE */}
                      <button
                        type="button"
                        className="btn-action-delete"
                        onClick={() =>
                          setAkanDihapus(item)
                        }
                        aria-label={`Hapus ${item.nama}`}
                        title="Hapus siswa"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="m19 6-1 14H6L5 6" />
                          <path d="M10 11v5" />
                          <path d="M14 11v5" />
                        </svg>
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

          </tbody>
        </table>
      </div>

      {/* INFORMASI JUMLAH DATA */}
      {!loading && filteredUsers.length > 0 && (
        <div className="pagination-info">
          Menampilkan{" "}
          {(currentPage - 1) * PAGE_SIZE + 1}
          {"–"}
          {Math.min(
            currentPage * PAGE_SIZE,
            filteredUsers.length
          )}
          {" dari "}
          {filteredUsers.length} siswa kelas 3 SD
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* MODAL KONFIRMASI HAPUS */}
      <DeleteConfirmModal
        title="Hapus User?"
        itemName={akanDihapus?.nama}
        isOpen={Boolean(akanDihapus)}
        onConfirm={() => void handleConfirmHapus()}
        onCancel={() => setAkanDihapus(null)}
      />

    </>
  );
}