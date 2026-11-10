import { NextResponse } from "next/server";
import { SESSION_COOKIE, createSessionToken, getAdminConfig } from "@/lib/auth";

export async function POST(req: Request) {
  let body: { email?: string; password?: string } = {};
  try {
    body = await req.json();
  } catch {
    // body kosong / bukan JSON -> dianggap gagal login
  }

  const { email, password, secret, backendUrl } = getAdminConfig();
  const inputEmail = (body.email ?? "").trim().toLowerCase();
  const inputPassword = body.password ?? "";

  if (!inputEmail || !inputPassword) {
    return NextResponse.json({ ok: false, message: "Email dan password wajib diisi." }, { status: 400 });
  }

  let isAuthenticated = false;

  // Verifikasi ke backend database terlebih dahulu
  try {
    const backendRes = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inputEmail, password: inputPassword }),
      cache: "no-store",
    });

    if (backendRes.ok) {
      isAuthenticated = true;
    } else if (backendRes.status === 401 || backendRes.status === 400) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  } catch {
    // Fallback ke konfigurasi lokal jika backend belum dijalankan
    if (inputEmail === email.toLowerCase() && inputPassword === password) {
      isAuthenticated = true;
    }
  }

  if (!isAuthenticated) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(email, secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
