"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useData,
  type Materi,
  type Soal,
  type User,
} from "@/lib/DataContext";
import { Field, FormAlert } from "./ui";

type Errors = Record<string, string>;

function Actions({
  cancelHref,
  submitting,
}: {
  cancelHref: string;
  submitting?: boolean;
}) {
  return (
    <div className="form-actions">
      <Link href={cancelHref} className="btn-cancel">
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
  );
}

// ==========================================
// FORM MATERI
// ==========================================

export function MateriForm({
  materiLama,
}: {
  materiLama?: Materi;
}) {
  const router = useRouter();
  const { addMateri, updateMateri, showFlash } = useData();

  const [form, setForm] = useState({
    judul: materiLama?.judul ?? "",
    deskripsi: materiLama?.deskripsi ?? "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setServerError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!form.judul.trim()) {
      newErrors.judul = "Judul materi wajib diisi.";
    }

    if (!form.deskripsi.trim()) {
      newErrors.deskripsi = "Deskripsi wajib diisi.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    setServerError("");

    try {
      const data = {
        judul: form.judul.trim(),
        deskripsi: form.deskripsi.trim(),
      };

      if (materiLama) {
        await updateMateri(materiLama.id, data);
        showFlash("Materi berhasil diperbarui.");
      } else {
        await addMateri(data);
        sessionStorage.setItem("scrollToNewItem", "materi");
        showFlash("Materi berhasil disimpan.");
      }

      router.push("/materi");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Gagal menyimpan materi."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {Object.values(errors).some(Boolean) && <FormAlert />}

      {serverError && (
        <div className="alert-error" role="alert">
          <b>Gagal menyimpan</b>
          <div>{serverError}</div>
        </div>
      )}

      <Field label="Judul Materi" htmlFor="judul" error={errors.judul}>
        <input
          id="judul"
          name="judul"
          value={form.judul}
          onChange={handleChange}
          placeholder="Masukkan judul materi"
          className={`input ${errors.judul ? "error" : ""}`}
        />
      </Field>

      <Field label="Deskripsi" htmlFor="deskripsi" error={errors.deskripsi}>
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={6}
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Isi detail materi"
          className={`input ${errors.deskripsi ? "error" : ""}`}
        />
      </Field>

      <Actions cancelHref="/materi" submitting={submitting} />
    </form>
  );
}

// ==========================================
// FORM SOAL
// ==========================================

export function SoalForm({
  soalLama,
}: {
  soalLama?: Soal;
}) {
  const router = useRouter();

  const { materi, addSoal, updateSoal, showFlash } = useData();

  const [form, setForm] = useState({
    materiId: soalLama ? String(soalLama.materiId) : "",
    pertanyaan: soalLama?.pertanyaan ?? "",
    jawaban: soalLama?.jawaban ?? "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setServerError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!form.materiId) {
      newErrors.materiId = "Materi wajib dipilih.";
    }

    if (!form.pertanyaan.trim()) {
      newErrors.pertanyaan = "Pertanyaan wajib diisi.";
    }

    if (!form.jawaban.trim()) {
      newErrors.jawaban = "Jawaban wajib diisi.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    setServerError("");

    try {
      const data = {
        materiId: Number(form.materiId),
        pertanyaan: form.pertanyaan.trim(),
        jawaban: form.jawaban.trim(),
      };

      if (soalLama) {
        await updateSoal(soalLama.id, data);
        showFlash("Soal berhasil diperbarui.");
      } else {
        await addSoal(data);
        sessionStorage.setItem("scrollToNewItem", "soal");
        showFlash("Soal berhasil disimpan.");
      }

      router.push("/soal");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Gagal menyimpan soal."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {Object.values(errors).some(Boolean) && <FormAlert />}

      {serverError && (
        <div className="alert-error" role="alert">
          <b>Gagal menyimpan</b>
          <div>{serverError}</div>
        </div>
      )}

      <Field label="Materi" htmlFor="materiId" error={errors.materiId}>
        <select
          id="materiId"
          name="materiId"
          value={form.materiId}
          onChange={handleChange}
          className={`input input-select ${
            errors.materiId ? "error" : ""
          } ${form.materiId ? "" : "is-empty"}`}
        >
          <option value="">Pilih materi</option>

          {materi.map((m) => (
            <option key={m.id} value={m.id}>
              {m.judul}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Pertanyaan"
        htmlFor="pertanyaan"
        error={errors.pertanyaan}
      >
        <input
          id="pertanyaan"
          name="pertanyaan"
          value={form.pertanyaan}
          onChange={handleChange}
          placeholder="Masukkan pertanyaan"
          className={`input ${errors.pertanyaan ? "error" : ""}`}
        />
      </Field>

      <Field label="Jawaban" htmlFor="jawaban" error={errors.jawaban}>
        <input
          id="jawaban"
          name="jawaban"
          value={form.jawaban}
          onChange={handleChange}
          placeholder="Masukkan jawaban"
          className={`input ${errors.jawaban ? "error" : ""}`}
        />
      </Field>

      <Actions cancelHref="/soal" submitting={submitting} />
    </form>
  );
}

// ==========================================
// FORM USER - KHUSUS KELAS 3 SD
// ==========================================

export function UserForm({
  userLama,
}: {
  userLama?: User;
}) {
  const router = useRouter();

  const { addUser, updateUser, showFlash } = useData();

  const [form, setForm] = useState({
    nama: userLama?.nama ?? "",
    sekolah: userLama?.sekolah ?? "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setServerError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!form.nama.trim()) {
      newErrors.nama = "Nama lengkap wajib diisi.";
    }

    if (!form.sekolah.trim()) {
      newErrors.sekolah = "Asal sekolah wajib diisi.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    setServerError("");

    try {
      const data = {
        nama: form.nama.trim(),
        kelas: "3 SD",
        sekolah: form.sekolah.trim(),
      };

      if (userLama) {
        await updateUser(userLama.id, data);
        showFlash("Data siswa berhasil diperbarui.");
      } else {
        await addUser(data);
        sessionStorage.setItem("scrollToNewItem", "user");
        showFlash("Data siswa kelas 3 SD berhasil ditambahkan.");
      }

      router.push("/user");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Gagal menyimpan data siswa."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {Object.values(errors).some(Boolean) && <FormAlert />}

      {serverError && (
        <div className="alert-error" role="alert">
          <b>Gagal menyimpan</b>
          <div>{serverError}</div>
        </div>
      )}

      <Field label="Nama Lengkap" htmlFor="nama" error={errors.nama}>
        <input
          id="nama"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap"
          className={`input ${errors.nama ? "error" : ""}`}
        />
      </Field>

      <Field label="Kelas" htmlFor="kelas">
        <input
          id="kelas"
          name="kelas"
          type="text"
          value="3 SD"
          disabled
          tabIndex={-1}
          className="input class-disabled"
        />

        <small className="field-hint">
          MathVenture khusus untuk siswa kelas 3 SD.
        </small>
      </Field>

      <Field label="Asal Sekolah" htmlFor="sekolah" error={errors.sekolah}>
        <input
          id="sekolah"
          name="sekolah"
          value={form.sekolah}
          onChange={handleChange}
          placeholder="Masukkan asal sekolah"
          className={`input ${errors.sekolah ? "error" : ""}`}
        />
      </Field>

      <Actions cancelHref="/user" submitting={submitting} />
    </form>
  );
}