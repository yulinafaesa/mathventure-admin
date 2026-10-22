export interface Material {
  id: string;
  title: string;
  description: string;
}

export const INITIAL_MATERIALS: Material[] = [
  {
    id: "1",
    title: "Mengenal Bilangan",
    description: "Bilangan dapat diurutkan dari yang terkecil hingga terbesar...",
  },
  {
    id: "2",
    title: "Nilai Tempat",
    description: "Mengenal satuan, puluhan, dan ratusan",
  },
  {
    id: "3",
    title: "Penjumlahan",
    description: "Penjumlahan bersusun hingga ratusan",
  },
  {
    id: "4",
    title: "Pengurangan",
    description: "Pengurangan bersusun dengan meminjam",
  },
];
