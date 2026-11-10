import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f4f4f6", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8, color: "#22192a" }}>404 - Halaman Tidak Ditemukan</h1>
      <p style={{ color: "#6b6875", marginBottom: 24 }}>Halaman yang Anda tuju tidak tersedia.</p>
      <Link href="/dashboard" style={{ padding: "10px 20px", borderRadius: 8, background: "#b3245b", color: "#fff", textDecoration: "none", fontWeight: 600 }}>
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
