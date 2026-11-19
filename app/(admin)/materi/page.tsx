"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useData, type Materi } from "@/lib/DataContext";
import {
  CrudHeader,
  DeleteConfirmModal,
  Icon,
} from "@/components/crud/ui";
import { Pagination } from "@/components/crud/Pagination";

const PAGE_SIZE = 5;

export default function MateriPage() {
  const {
    materi,
    loading,
    error,
    refreshData,
    deleteMateri,
    showFlash,
  } = useData();

  const [akanDihapus, setAkanDihapus] =
    useState<Materi | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const firstRowRef = useRef<HTMLTableRowElement>(null);

  const filteredMateri = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return materi.filter((item) =>
      `${item.judul} ${item.deskripsi}`
        .toLowerCase()
        .includes(keyword)
    );
  }, [materi, search]);

  const totalPages = Math.ceil(
    filteredMateri.length / PAGE_SIZE
  );

  const currentPage = Math.min(
    page,
    Math.max(totalPages, 1)
  );

  const displayedMateri = filteredMateri.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (loading || materi.length === 0) return;

    const shouldScroll =
      sessionStorage.getItem("scrollToNewItem") === "materi";

    if (shouldScroll) {
      sessionStorage.removeItem("scrollToNewItem");
      requestAnimationFrame(() => {
        firstRowRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [loading, materi]);

  async function handleConfirmHapus() {
    if (!akanDihapus) return;

    try {
      await deleteMateri(akanDihapus.id);
      showFlash("Materi berhasil dihapus.");
    } catch (err) {
      showFlash(
        err instanceof Error
          ? err.message
          : "Gagal menghapus materi."
      );
    } finally {
      setAkanDihapus(null);
    }
  }

  return (
    <>
      <CrudHeader
        title="Kelola Materi"
        buttonLabel="Tambah Materi"
        buttonHref="/materi/tambah"
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
          placeholder="Cari judul atau deskripsi materi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Cari materi"
        />

        <span className="table-count">
          {filteredMateri.length} materi
        </span>
      </div>

      <div className="card-table">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>No.</th>
              <th>Judul Materi</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="empty">
                  Memuat data materi...
                </td>
              </tr>
            )}

            {!loading && displayedMateri.length === 0 && (
              <tr>
                <td colSpan={3} className="empty">
                  {error
                    ? "Tidak dapat memuat data materi."
                    : "Tidak ada materi yang cocok."}
                </td>
              </tr>
            )}

            {!loading &&
              displayedMateri.map((item, index) => (
                <tr
                  key={item.id}
                  ref={index === 0 ? firstRowRef : null}
                >
                  <td>
                    {(currentPage - 1) * PAGE_SIZE +
                      index +
                      1}
                  </td>

                  <td className="with-sub">
                    <div className="cell-title">
                      {item.judul}
                    </div>
                    <div className="cell-sub">
                      {item.deskripsi}
                    </div>
                  </td>

                  <td>
                    <div className="row-actions">
                      <Link
                        href={`/materi/${item.id}/edit`}
                        className="btn-action-edit"
                        aria-label={`Edit ${item.judul}`}
                        title="Edit"
                      >
                        <Icon name="pencil" size={17} />
                      </Link>

                      <button
                        type="button"
                        className="btn-action-delete"
                        onClick={() => setAkanDihapus(item)}
                        aria-label={`Hapus ${item.judul}`}
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
        title="Hapus Materi?"
        itemName={akanDihapus?.judul}
        isOpen={Boolean(akanDihapus)}
        onConfirm={() => void handleConfirmHapus()}
        onCancel={() => setAkanDihapus(null)}
      />
    </>
  );
}