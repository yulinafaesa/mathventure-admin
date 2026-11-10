import { CrudHeader } from "@/components/crud/ui";
import { SoalForm } from "@/components/crud/forms";

export default function TambahSoalPage() {
  return (
    <>
      <CrudHeader title="Tambah Soal" description="Isi semua kolom, lalu klik Simpan." />
      <SoalForm />
    </>
  );
}
