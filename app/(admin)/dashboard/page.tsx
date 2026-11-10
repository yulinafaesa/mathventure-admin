import PageHeader from "@/components/PageHeader";
import { MateriIcon, SoalIcon, UserIcon } from "@/components/icons";

// Ganti angka ini dengan data asli dari database / API kamu.
const STATS = [
  { label: "Total Siswa", value: 5, tone: "siswa", Icon: UserIcon },
  { label: "Total Materi", value: 4, tone: "materi", Icon: MateriIcon },
  { label: "Total Soal", value: 5, tone: "soal", Icon: SoalIcon },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Ringkasan data MathVenture" />
      <div className="cards">
        {STATS.map(({ label, value, tone, Icon }) => (
          <div className="card" key={label}>
            <div className="card__head">
              <span className={`card__icon card__icon--${tone}`}>
                <Icon width={24} height={24} />
              </span>
              <div className="card__label">{label}</div>
            </div>
            <div className="card__value">{value}</div>
          </div>
        ))}
      </div>
    </>
  );
}