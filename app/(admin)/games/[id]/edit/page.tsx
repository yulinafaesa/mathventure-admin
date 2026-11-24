
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  useData,
} from "@/lib/DataContext";

import { CrudHeader } from "@/components/crud/ui";
import { GamesForm } from "@/components/crud/GamesForm";

export default function EditGamesPage() {
  const { id } = useParams<{ id: string }>();

  const { games, loading } = useData();

  const gameLama = games.find(
    (item) => item.id === Number(id)
  );

  if (loading) {
    return (
      <CrudHeader
        title="Edit Games"
        description="Memuat data Games..."
      />
    );
  }

  if (!gameLama) {
    return (
      <>
        <CrudHeader
          title="Games tidak ditemukan"
          description="Games ini mungkin sudah dihapus."
        />

        <Link
          href="/games"
          className="btn btn-secondary"
        >
          Kembali ke Kelola Games
        </Link>
      </>
    );
  }

  return (
    <>
      <CrudHeader
        title="Edit Games"
        description="Ubah informasi Games, kemudian klik Simpan."
      />

      <GamesForm gameLama={gameLama} />
    </>
  );
}
