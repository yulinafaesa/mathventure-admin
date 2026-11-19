"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useData, type User } from "@/lib/DataContext";
import {
  CrudHeader,
  DeleteConfirmModal,
  Icon,
} from "@/components/crud/ui";
import { Pagination } from "@/components/crud/Pagination";

const PAGE_SIZE = 5;

export default function UserPage() {
  const {
    users,
    loading,
    error,
    refreshData,
    deleteUser,
    showFlash,
  } = useData();

  const [akanDihapus, setAkanDihapus] =
    useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("all");
  const [page, setPage] = useState(1);
  const firstRowRef = useRef<HTMLTableRowElement>(null);

  const daftarKelas = useMemo(
    () => [...new Set(users.map((user) => user.kelas))].sort(),
    [users]
  );

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return users.filter((item) => {
      const cocokKelas =
        filterKelas === "all" ||
        item.kelas === filterKelas;

      const cocokSearch =
        `${item.nama} ${item.kelas} ${item.sekolah}`
          .toLowerCase()
          .includes(keyword);

      return cocokKelas && cocokSearch;
    });
  }, [users, search, filterKelas]);

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
  }, [search, filterKelas]);

  useEffect(() => {
    if (loading || users.length === 0) return;

    const shouldScroll =
      sessionStorage.getItem("scrollToNewItem") === "user";

    if (shouldScroll) {
      sessionStorage.removeItem("scrollToNewItem");
      requestAnimationFrame(() => {
        firstRowRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [loading, users]);

  async function handleConfirmHapus() {
    if (!akanDihapus) return;

    try {
      await deleteUser(akanDihapus.id);
      showFlash("User berhasil dihapus.");
    } catch (err) {
      showFlash(
        err instanceof Error
          ? err.message
          : "Gagal menghapus user."
      );
    } finally {
      setAkanDihapus(null);
    }
  }

  return (
    <>
      <CrudHeader
        title="Kelola User"
        buttonLabel="Tambah User"
        buttonHref="/user/tambah"
      />

      {error && (
        <div className="alert-error" role="alert">
          <div>
            <b>Gagal memuat data</b>
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

      <div className="table-toolbar">
        <input
          type="search"
          className="table-filter"
          placeholder="Cari nama atau sekolah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Cari user"
        />

        <select
          className="table-filter table-filter--select"
          value={filterKelas}
          onChange={(e) => setFilterKelas(e.target.value)}
          aria-label="Filter berdasarkan kelas"
        >
          <option value="all">Semua Kelas</option>
          {daftarKelas.map((kelas) => (
            <option key={kelas} value={kelas}>
              {kelas}
            </option>
          ))}
        </select>

        <span className="table-count">
          {filteredUsers.length} siswa
        </span>
      </div>

      <div className="card-table">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>No.</th>
              <th>Nama Lengkap</th>
              <th>Kelas</th>
              <th>Asal Sekolah</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="empty">
                  Memuat data siswa...
                </td>
              </tr>
            )}

            {!loading && displayedUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  {error
                    ? "Tidak dapat memuat data siswa."
                    : "Tidak ada siswa yang cocok."}
                </td>
              </tr>
            )}

            {!loading &&
              displayedUsers.map((item, index) => (
                <tr
                  key={item.id}
                  ref={index === 0 ? firstRowRef : null}
                >
                  <td>
                    {(currentPage - 1) * PAGE_SIZE +
                      index +
                      1}
                  </td>

                  <td className="strong">{item.nama}</td>
                  <td>{item.kelas}</td>
                  <td>{item.sekolah}</td>

                  <td>
                    <div className="row-actions">
                      <Link
                        href={`/user/${item.id}/edit`}
                        className="btn-action-edit"
                        aria-label={`Edit ${item.nama}`}
                        title="Edit"
                      >
                        <Icon name="pencil" size={17} />
                      </Link>

                      <button
                        type="button"
                        className="btn-action-delete"
                        onClick={() => setAkanDihapus(item)}
                        aria-label={`Hapus ${item.nama}`}
                        title="Hapus"
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />

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