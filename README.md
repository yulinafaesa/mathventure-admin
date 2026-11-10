# MathVenture Admin Panel (Next.js) + Backend (Express + SQLite)

Halaman login dan dashboard admin MathVenture, dibuat dengan Next.js (App Router) + TypeScript dan terhubung ke Backend Express + SQLite (`node:sqlite`).

## Menjalankan Proyek

### 1. Jalankan Backend API (Port 4000)
Buka terminal pertama:
```bash
cd backend
npm run dev
```
Server backend akan berjalan di `http://localhost:4000` dan otomatis membuat database SQLite di `backend/data/mathventure.db` beserta data awal (Materi, Soal, Siswa, dan Admin).

### 2. Jalankan Admin Panel (Port 3000)
Buka terminal kedua:
```bash
cd adminmath
npm run dev
```
Buka `http://localhost:3000` di browser.

## Akun Login Admin Default

| Variabel | Nilai Default |
| :--- | :--- |
| `ADMIN_EMAIL` | `adminmathventure@gmail.com` |
| `ADMIN_PASSWORD` | `Admin@123456` |

## Struktur Endpoint Backend (`http://localhost:4000`)

- `GET /api/health` – Cek status server backend
- `GET /api/bootstrap` – Ambil seluruh data awal (`materi`, `soal`, `users`, `stats`)
- `GET /api/stats` – Statistik jumlah materi, soal, dan siswa
- `POST /api/auth/login` – Autentikasi admin
- `POST /api/auth/student-login` – Autentikasi siswa (untuk aplikasi Flutter `mathventure`)
- `GET|POST /api/materi` & `GET|PUT|DELETE /api/materi/:id` – CRUD Materi
- `GET|POST /api/soal` & `GET|PUT|DELETE /api/soal/:id` – CRUD Soal
- `GET|POST /api/users` & `GET|PUT|DELETE /api/users/:id` – CRUD Siswa (User)
