
import { CrudHeader } from "@/components/crud/ui";
import { GamesForm } from "@/components/crud/GamesForm";

export default function TambahGamesPage() {
  return (
    <>
      <CrudHeader
        title="Tambah Games"
        description="Isi informasi Games, kemudian klik Simpan."
      />

      <GamesForm />
    </>
  );
}
