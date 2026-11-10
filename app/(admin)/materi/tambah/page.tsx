import { CrudHeader } from "@/components/crud/ui";
import { MateriForm } from "@/components/crud/forms";

export default function TambahMateriPage() {
  return (
    <>
      <CrudHeader title="Tambah Materi" description="Isi semua kolom, lalu klik Simpan." />
      <MateriForm />
    </>
  );
}
