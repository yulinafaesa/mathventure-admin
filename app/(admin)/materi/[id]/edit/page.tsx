"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "@/lib/DataContext";
import { CrudHeader } from "@/components/crud/ui";
import { MateriForm } from "@/components/crud/forms";

export default function EditMateriPage() {
  const { id } = useParams<{ id: string }>();
  const { materi, loading } = useData();
  const materiLama = materi.find((item) => item.id === Number(id));

  if (loading) {
    return <CrudHeader title="Edit Materi" description="Memuat data materi..." />;
  }

  if (!materiLama) {
    return (
      <>
        <CrudHeader title="Materi tidak ditemukan" description="Materi ini mungkin sudah dihapus." />
        <Link href="/materi" className="btn btn-secondary">
          Kembali ke Kelola Materi
        </Link>
      </>
    );
  }

  return (
    <>
      <CrudHeader title="Edit Materi" description="Ubah kolom yang perlu, lalu klik Simpan." />
      <MateriForm materiLama={materiLama} />
    </>
  );
}
