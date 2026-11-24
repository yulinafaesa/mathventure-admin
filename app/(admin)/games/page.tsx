
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  useData,
  type Game,
} from "@/lib/DataContext";

import {
  CrudHeader,
  DeleteConfirmModal,
  Icon,
} from "@/components/crud/ui";

import { Pagination } from "@/components/crud/Pagination";

const PAGE_SIZE = 5;

export default function GamesPage() {
  const {
    games,
    loading,
    error,
    refreshData,
    deleteGame,
    showFlash,
  } = useData();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [akanDihapus, setAkanDihapus] =
    useState<Game | null>(null);

  const filteredGames = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return games.filter((game) =>
      `${game.nama} ${game.deskripsi} ${game.kategori}`
        .toLowerCase()
        .includes(keyword)
    );
  }, [games, search]);

  const totalPages = Math.ceil(
    filteredGames.length / PAGE_SIZE
  );

  const currentPage = Math.min(
    page,
    Math.max(totalPages, 1)
  );

  const displayedGames = filteredGames.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  async function handleConfirmHapus() {
    if (!akanDihapus) return;

    try {
      await deleteGame(akanDihapus.id);
      showFlash("Games berhasil dihapus.");
    } catch (err) {
      showFlash(
        err instanceof Error
          ? err.message
          : "Gagal menghapus Games."
      );
    } finally {
      setAkanDihapus(null);
    }
  }

  return (
    <>
      <CrudHeader
        title="Kelola Games"
        description="Kelola daftar permainan MathVenture."
        buttonLabel="Tambah Games"
        buttonHref="/games/tambah"
      />

      {error && (
        <div className="alert-error" role="alert">
          <div>
            <b>Gagal memuat data Games</b>
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
          placeholder="Cari nama, deskripsi, atau kategori Games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Cari Games"
        />

        <span className="table-count">
          {filteredGames.length} Games
        </span>
      </div>

      <div className="card-table">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>No.</th>
              <th>Nama Games</th>
              <th>Kategori</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="empty">
                  Memuat data Games...
                </td>
              </tr>
            )}

            {!loading && displayedGames.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  {error
                    ? "Data Games tidak dapat dimuat."
                    : "Belum ada Games yang tersedia."}
                </td>
              </tr>
            )}

            {!loading &&
              displayedGames.map((game, index) => (
                <tr key={game.id}>
                  <td>
                    {(currentPage - 1) * PAGE_SIZE +
                      index +
                      1}
                  </td>

                  <td className="with-sub">
                    <div className="games-name-cell">
                      {game.gambar && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={game.gambar}
                          alt={game.nama}
                          className="games-thumbnail"
                        />
                      )}

                      <div>
                        <div className="cell-title">
                          {game.nama}
                        </div>

                        <div className="cell-sub">
                          {game.deskripsi}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{game.kategori}</td>

                  <td>
                    <span
                      className={`games-status ${
                        game.status === "aktif"
                          ? "games-status--active"
                          : "games-status--inactive"
                      }`}
                    >
                      {game.status === "aktif"
                        ? "Aktif"
                        : "Nonaktif"}
                    </span>
                  </td>

                  <td>
                    <div className="row-actions">
                      <Link
                        href={`/games/${game.id}/edit`}
                        className="btn-action-edit"
                        aria-label={`Edit ${game.nama}`}
                        title="Edit"
                      >
                        <Icon name="pencil" size={17} />
                      </Link>

                      <button
                        type="button"
                        className="btn-action-delete"
                        onClick={() => setAkanDihapus(game)}
                        aria-label={`Hapus ${game.nama}`}
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
        title="Hapus Games?"
        itemName={akanDihapus?.nama}
        isOpen={Boolean(akanDihapus)}
        onConfirm={() => void handleConfirmHapus()}
        onCancel={() => setAkanDihapus(null)}
      />
    </>
  );
}
