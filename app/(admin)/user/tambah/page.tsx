import { CrudHeader } from "@/components/crud/ui";
import { UserForm } from "@/components/crud/forms";

export default function TambahUserPage() {
  return (
    <>
      <CrudHeader title="Tambah User" description="Isi semua kolom, lalu klik Simpan." />
      <UserForm />
    </>
  );
}
