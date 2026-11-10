"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "@/lib/DataContext";
import { CrudHeader } from "@/components/crud/ui";
import { UserForm } from "@/components/crud/forms";

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const { users, loading } = useData();
  const userLama = users.find((item) => item.id === Number(id));

  if (loading) {
    return <CrudHeader title="Edit User" description="Memuat data siswa..." />;
  }

  if (!userLama) {
    return (
      <>
        <CrudHeader title="User tidak ditemukan" description="User ini mungkin sudah dihapus." />
        <Link href="/user" className="btn btn-secondary">
          Kembali ke Kelola User
        </Link>
      </>
    );
  }

  return (
    <>
      <CrudHeader title="Edit User" description="Ubah kolom yang perlu, lalu klik Simpan." />
      <UserForm userLama={userLama} />
    </>
  );
}
