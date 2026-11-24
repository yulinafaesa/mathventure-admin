
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Materi = {
  id: number;
  judul: string;
  deskripsi: string;
};

export type Soal = {
  id: number;
  materiId: number;
  pertanyaan: string;
  jawaban: string;
  materiJudul?: string;
};

export type User = {
  id: number;
  nama: string;
  kelas: string;
  sekolah: string;
};

export type Game = {
  id: number;
  nama: string;
  deskripsi: string;
  kategori: string;
  gambar: string | null;
  status: "aktif" | "nonaktif";
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api`
  : "/api/backend";

type GameInput = Omit<Game, "id">;

type DataContextValue = {
  materi: Materi[];
  addMateri: (data: Omit<Materi, "id">) => Promise<void>;
  updateMateri: (id: number, data: Omit<Materi, "id">) => Promise<void>;
  deleteMateri: (id: number) => Promise<void>;

  soal: Soal[];
  addSoal: (data: Omit<Soal, "id">) => Promise<void>;
  updateSoal: (id: number, data: Omit<Soal, "id">) => Promise<void>;
  deleteSoal: (id: number) => Promise<void>;

  users: User[];
  addUser: (data: Omit<User, "id">) => Promise<void>;
  updateUser: (id: number, data: Omit<User, "id">) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;

  games: Game[];
  addGame: (data: GameInput) => Promise<void>;
  updateGame: (id: number, data: GameInput) => Promise<void>;
  deleteGame: (id: number) => Promise<void>;

  loading: boolean;
  error: string;
  refreshData: () => Promise<void>;
  flash: string;
  showFlash: (message: string) => void;
  clearFlash: () => void;
};

const DataContext = createContext<DataContextValue | null>(null);

async function requestJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `Gagal memproses permintaan (${res.status})`;

    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // Respons bukan JSON.
    }

    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [materi, setMateri] = useState<Materi[]>([]);
  const [soal, setSoal] = useState<Soal[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [data, gamesData] = await Promise.all([
        requestJson<{
          materi: Materi[];
          soal: Soal[];
          users: User[];
        }>(`${API_BASE}/bootstrap`, { cache: "no-store" }),

        requestJson<Game[]>(`${API_BASE}/games`, {
          cache: "no-store",
        }),
      ]);

      setMateri(data.materi);
      setSoal(data.soal);
      setUsers(data.users);
      setGames(gamesData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Tidak dapat terhubung ke backend."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshData();
  }, [refreshData]);

  // MATERI
  const addMateri = async (data: Omit<Materi, "id">) => {
    const created = await requestJson<Materi>(
      `${API_BASE}/materi`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    setMateri((list) => [created, ...list]);
  };

  const updateMateri = async (
    id: number,
    data: Omit<Materi, "id">
  ) => {
    const updated = await requestJson<Materi>(
      `${API_BASE}/materi/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    setMateri((list) =>
      list.map((item) => (item.id === id ? updated : item))
    );

    setSoal((list) =>
      list.map((item) =>
        item.materiId === id
          ? { ...item, materiJudul: updated.judul }
          : item
      )
    );
  };

  const deleteMateri = async (id: number) => {
    await requestJson(`${API_BASE}/materi/${id}`, {
      method: "DELETE",
    });

    setMateri((list) => list.filter((item) => item.id !== id));
    setSoal((list) => list.filter((item) => item.materiId !== id));
  };

  // SOAL
  const addSoal = async (data: Omit<Soal, "id">) => {
    const created = await requestJson<Soal>(
      `${API_BASE}/soal`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    setSoal((list) => [created, ...list]);
  };

  const updateSoal = async (
    id: number,
    data: Omit<Soal, "id">
  ) => {
    const updated = await requestJson<Soal>(
      `${API_BASE}/soal/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    setSoal((list) =>
      list.map((item) => (item.id === id ? updated : item))
    );
  };

  const deleteSoal = async (id: number) => {
    await requestJson(`${API_BASE}/soal/${id}`, {
      method: "DELETE",
    });

    setSoal((list) => list.filter((item) => item.id !== id));
  };

  // USER
  const addUser = async (data: Omit<User, "id">) => {
    const created = await requestJson<User>(
      `${API_BASE}/users`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    setUsers((list) => [created, ...list]);
  };

  const updateUser = async (
    id: number,
    data: Omit<User, "id">
  ) => {
    const updated = await requestJson<User>(
      `${API_BASE}/users/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    setUsers((list) =>
      list.map((item) => (item.id === id ? updated : item))
    );
  };

  const deleteUser = async (id: number) => {
    await requestJson(`${API_BASE}/users/${id}`, {
      method: "DELETE",
    });

    setUsers((list) => list.filter((item) => item.id !== id));
  };

  // GAMES
  const addGame = async (data: GameInput) => {
    const created = await requestJson<Game>(
      `${API_BASE}/games`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    setGames((list) => [created, ...list]);
  };

  const updateGame = async (id: number, data: GameInput) => {
    const updated = await requestJson<Game>(
      `${API_BASE}/games/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    setGames((list) =>
      list.map((item) => (item.id === id ? updated : item))
    );
  };

  const deleteGame = async (id: number) => {
    await requestJson(`${API_BASE}/games/${id}`, {
      method: "DELETE",
    });

    setGames((list) => list.filter((item) => item.id !== id));
  };

  const clearFlash = useCallback(() => setFlash(""), []);

  const value: DataContextValue = {
    materi,
    addMateri,
    updateMateri,
    deleteMateri,

    soal,
    addSoal,
    updateSoal,
    deleteSoal,

    users,
    addUser,
    updateUser,
    deleteUser,

    games,
    addGame,
    updateGame,
    deleteGame,

    loading,
    error,
    refreshData,
    flash,
    showFlash: setFlash,
    clearFlash,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error(
      "useData() harus dipakai di dalam <DataProvider>."
    );
  }

  return context;
}
