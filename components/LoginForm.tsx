"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LockIcon, MailIcon } from "./icons";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError(false);

    const noEmail = email.trim() === "";
    const noPassword = password === "";
    setEmptyEmail(noEmail);
    setEmptyPassword(noPassword);
    if (noEmail || noPassword) return;

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.replace("/dashboard");
        router.refresh();
        return;
      }
      setLoginError(true);
    } catch {
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1 className="form__title">Masuk ke Admin Panel</h1>
      <p className="form__desc">Masukkan email dan password admin.</p>

      <label className="form__label form__label--email" htmlFor="email">
        Email
      </label>
      <div className={`input input--email${emptyEmail ? " input--error" : ""}`}>
        <span className="input__icon">
          <MailIcon />
        </span>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmptyEmail(false);
            setLoginError(false);
          }}
        />
        {emptyEmail && <span className="input__error">Email wajib diisi.</span>}
      </div>

      <label className="form__label form__label--password" htmlFor="password">
        Password
      </label>
      <div className={`input input--password${emptyPassword ? " input--error" : ""}`}>
        <span className="input__icon input__icon--lock">
          <LockIcon />
        </span>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setEmptyPassword(false);
            setLoginError(false);
          }}
        />
        {emptyPassword && <span className="input__error">Password wajib diisi.</span>}
      </div>

      <button type="submit" className="btn" disabled={loading}>
        Masuk
      </button>

      {loginError && (
        <div className="alert" role="alert">
          <strong>Email atau password salah</strong>
          <span>Periksa kembali, lalu coba lagi.</span>
        </div>
      )}
    </form>
  );
}