"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "@/lib/DataContext";
import { CrudHeader } from "@/components/crud/ui";
import { SoalForm } from "@/components/crud/forms";

export default function EditSoalPage() {
  const { id } = useParams<{ id: string }>();
  const { soal, loading } = useData();
  const soalLama = soal.find((item) => item.id === Number(id));

  if (loading) {
    return <CrudHeader title="Edit Soal" description="Memuat data soal..." />;
  }

  if (!soalLama) {
    return (
      <>
        <CrudHeader title="Soal tidak ditemukan" description="Soal ini mungkin sudah dihapus." />
        <Link href="/soal" className="btn btn-secondary">
          Kembali ke Kelola Soal
        </Link>
      </>
    );
  }

  return (
    <>
      <CrudHeader title="Edit Soal" description="Ubah kolom yang perlu, lalu klik Simpan." />
      <SoalForm soalLama={soalLama} />
    </>
  );
}
