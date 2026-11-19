"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useData, type Soal } from "@/lib/DataContext";
import {
  CrudHeader,
  DeleteConfirmModal,
  Icon,
} from "@/components/crud/ui";
import { Pagination } from "@/components/crud/Pagination";

const PAGE_SIZE = 5;

export default function SoalPage() {
  const {
    soal,
    materi,
    loading,
    error,
    refreshData,
    deleteSoal,
    showFlash,
  } = useData();

  const [akanDihapus, setAkanDihapus] =
    useState<Soal | null>(null);
  const [search, setSearch] = useState("");
  const [filterMateri, setFilterMateri] = useState("all");
  const [page, setPage] = useState(1);
  const firstRowRef = useRef<HTMLTableRowElement>(null);

  const namaMateri = (item: Soal) =>
    materi.find((m) => m.id === item.materiId)?.judul ??
    item.materiJudul ??
    "-";

  const filteredSoal = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return soal.filter((item) => {
      const cocokMateri =
        filterMateri === "all" ||
        String(item.materiId) === filterMateri;

      const cocokSearch =
        `${item.pertanyaan} ${item.jawaban} ${namaMateri(item)}`
          .toLowerCase()
          .includes(keyword);

      return cocokMateri && cocokSearch;
    });
  }, [soal, materi, search, filterMateri]);

  const totalPages = Math.ceil(
    filteredSoal.length / PAGE_SIZE
  );

  const currentPage = Math.min(
    page,
    Math.max(totalPages, 1)
  );

  const displayedSoal = filteredSoal.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search, filterMateri]);

  useEffect(() => {
    if (loading || soal.length === 0) return;

    const shouldScroll =
      sessionStorage.getItem("scrollToNewItem") === "soal";

    if (shouldScroll) {
      sessionStorage.removeItem("scrollToNewItem");
      requestAnimationFrame(() => {
        firstRowRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [loading, soal]);

  async function handleConfirmHapus() {
    if (!akanDihapus) return;

    try {
      await deleteSoal(akanDihapus.id);
      showFlash("Soal berhasil dihapus.");
    } catch (err) {
      showFlash(
        err instanceof Error
          ? err.message
          : "Gagal menghapus soal."
      );
    } finally {
      setAkanDihapus(null);
    }
  }

  return (
    <>
      <CrudHeader
        title="Kelola Soal"
        buttonLabel="Tambah Soal"
        buttonHref="/soal/tambah"
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
          placeholder="Cari pertanyaan, jawaban, atau materi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Cari soal"
        />

        <select
          className="table-filter table-filter--select"
          value={filterMateri}
          onChange={(e) => setFilterMateri(e.target.value)}
          aria-label="Filter berdasarkan materi"
        >
          <option value="all">Semua Materi</option>
          {materi.map((item) => (
            <option key={item.id} value={String(item.id)}>
              {item.judul}
            </option>
          ))}
        </select>

        <span className="table-count">
          {filteredSoal.length} soal
        </span>
      </div>

      <div className="card-table">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>No.</th>
              <th>Pertanyaan</th>
              <th>Jawaban</th>
              <th>Materi</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="empty">
                  Memuat data soal...
                </td>
              </tr>
            )}

            {!loading && displayedSoal.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  {error
                    ? "Tidak dapat memuat data soal."
                    : "Tidak ada soal yang cocok."}
                </td>
              </tr>
            )}

            {!loading &&
              displayedSoal.map((item, index) => (
                <tr
                  key={item.id}
                  ref={index === 0 ? firstRowRef : null}
                >
                  <td>
                    {(currentPage - 1) * PAGE_SIZE +
                      index +
                      1}
                  </td>

                  <td className="strong">
                    {item.pertanyaan}
                  </td>

                  <td>{item.jawaban}</td>

                  <td>
                    <span className="tag">
                      {namaMateri(item)}
                    </span>
                  </td>

                  <td>
                    <div className="row-actions">
                      <Link
                        href={`/soal/${item.id}/edit`}
                        className="btn-action-edit"
                        aria-label="Edit soal"
                        title="Edit"
                      >
                        <Icon name="pencil" size={17} />
                      </Link>

                      <button
                        type="button"
                        className="btn-action-delete"
                        onClick={() => setAkanDihapus(item)}
                        aria-label="Hapus soal"
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
        title="Hapus Soal?"
        itemName={akanDihapus?.pertanyaan}
        isOpen={Boolean(akanDihapus)}
        onConfirm={() => void handleConfirmHapus()}
        onCancel={() => setAkanDihapus(null)}
      />
    </>
  );
}