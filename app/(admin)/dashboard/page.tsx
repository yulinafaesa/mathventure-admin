"use client";

import PageHeader from "@/components/PageHeader";
import { MateriIcon, SoalIcon, UserIcon } from "@/components/icons";
import { useData } from "@/lib/DataContext";

export default function DashboardPage() {
  const { users, materi, soal, loading, error, refreshData } = useData();

  const stats = [
    {
      label: "Total Siswa",
      value: loading ? "..." : users.length,
      Icon: UserIcon,
      bg: "#c9bcf0",
      color: "#544380",
    },
    {
      label: "Total Materi",
      value: loading ? "..." : materi.length,
      Icon: MateriIcon,
      bg: "#f6c2d7",
      color: "#b3245b",
    },
    {
      label: "Total Soal",
      value: loading ? "..." : soal.length,
      Icon: SoalIcon,
      bg: "#b6e0f8",
      color: "#257db3",
    },
  ];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Ringkasan data MathVenture" />
      {error && (
        <div className="alert-error" role="alert" style={{ marginBottom: 16 }}>
          <div>
            <b>Gagal memuat data dari Backend</b>
            <div>{error}</div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => void refreshData()} style={{ marginLeft: "auto" }}>
            Coba Lagi
          </button>
        </div>
      )}
      <div className="cards">
        {stats.map((s) => (
          <div className="card" key={s.label}>
            <div className="card__badge" style={{ background: s.bg, color: s.color }}>
              <s.Icon width={19} height={19} />
            </div>
            <div className="card__info">
              <div className="card__label">{s.label}</div>
              <div className="card__value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
