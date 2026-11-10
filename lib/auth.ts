export const SESSION_COOKIE = "mv_admin_session";

export function getAdminConfig() {
  return {
    email: process.env.ADMIN_EMAIL ?? "adminmathventure@gmail.com",
    password: process.env.ADMIN_PASSWORD ?? "Admin@123456",
    secret: process.env.AUTH_SECRET ?? "mathventure-dev-secret",
    backendUrl: process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  };
}

// Token sesi = SHA-256(email:secret). Dipakai di route handler dan middleware.
export async function createSessionToken(email: string, secret: string) {
  const data = new TextEncoder().encode(`${email.trim().toLowerCase()}:${secret}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
