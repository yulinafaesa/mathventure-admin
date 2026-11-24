
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  useData,
  type Game,
} from "@/lib/DataContext";

import { Field, FormAlert } from "./ui";

export function GamesForm({
  gameLama,
}: {
  gameLama?: Game;
}) {
  const router = useRouter();

  const {
    addGame,
    updateGame,
    showFlash,
  } = useData();

  const [form, setForm] = useState({
    nama: gameLama?.nama ?? "",
    deskripsi: gameLama?.deskripsi ?? "",
    kategori: gameLama?.kategori ?? "",
    gambar: gameLama?.gambar ?? "",
    status: gameLama?.status ?? "aktif",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!form.nama.trim()) {
      newErrors.nama = "Nama Games wajib diisi.";
    }

    if (!form.deskripsi.trim()) {
      newErrors.deskripsi = "Deskripsi wajib diisi.";
    }

    if (!form.kategori.trim()) {
      newErrors.kategori = "Kategori wajib dipilih.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    setServerError("");

    try {
      const data = {
        nama: form.nama.trim(),
        deskripsi: form.deskripsi.trim(),
        kategori: form.kategori.trim(),
        gambar: form.gambar.trim() || null,
        status: form.status as "aktif" | "nonaktif",
      };

      if (gameLama) {
        await updateGame(gameLama.id, data);
        showFlash("Games berhasil diperbarui.");
      } else {
        await addGame(data);
        showFlash("Games berhasil ditambahkan.");
      }

      router.push("/games");
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan Games."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="form-card"
      onSubmit={handleSubmit}
      noValidate
    >
      {Object.values(errors).some(Boolean) && (
        <FormAlert />
      )}

      {serverError && (
        <div className="alert-error" role="alert">
          <b>Gagal menyimpan Games</b>
          <div>{serverError}</div>
        </div>
      )}

      <Field
        label="Nama Games"
        htmlFor="nama"
        error={errors.nama}
      >
        <input
          id="nama"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Contoh: Petualangan Matematika"
          className={`input ${errors.nama ? "error" : ""}`}
        />
      </Field>

      <Field
        label="Deskripsi Games"
        htmlFor="deskripsi"
        error={errors.deskripsi}
      >
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={5}
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Masukkan deskripsi Games"
          className={`input ${errors.deskripsi ? "error" : ""}`}
        />
      </Field>

      <Field
        label="Kategori"
        htmlFor="kategori"
        error={errors.kategori}
      >
        <select
          id="kategori"
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className={`input input-select ${
            errors.kategori ? "error" : ""
          } ${form.kategori ? "" : "is-empty"}`}
        >
          <option value="">Pilih kategori</option>
          <option value="Penjumlahan">Penjumlahan</option>
          <option value="Pengurangan">Pengurangan</option>
          <option value="Perkalian">Perkalian</option>
          <option value="Pembagian">Pembagian</option>
          <option value="Campuran">Campuran</option>
          <option value="Logika">Logika</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </Field>

      <Field
        label="URL Gambar"
        htmlFor="gambar"
      >
        <input
          id="gambar"
          name="gambar"
          type="url"
          value={form.gambar}
          onChange={handleChange}
          placeholder="https://contoh.com/gambar.png"
          className="input"
        />

        <small className="field-hint">
          Masukkan tautan gambar Games. Kosongkan jika belum tersedia.
        </small>
      </Field>

      {form.gambar && (
        <div className="games-image-preview">
          <p>Preview gambar:</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={form.gambar}
            alt="Preview Games"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      <Field
        label="Status Games"
        htmlFor="status"
      >
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="input input-select"
        >
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
      </Field>

      <div className="form-actions">
        <Link
          href="/games"
          className="btn-cancel"
        >
          Batal
        </Link>

        <button
          type="submit"
          className="btn-submit"
          disabled={submitting}
        >
          {submitting ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
