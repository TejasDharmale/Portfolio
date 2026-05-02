"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      const next = attempts + 1;
      setAttempts(next);
      if (res.status === 429) {
        setError("Too many attempts. Try again in 15 minutes.");
      } else if (next >= 3) {
        setError(`Incorrect password. ${5 - next} attempt${5 - next === 1 ? "" : "s"} remaining.`);
      } else {
        setError("Incorrect password.");
      }
      setPassword("");
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const locked = attempts >= 5;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      padding: "1rem",
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(var(--accent-rgb, 99,102,241),0.08) 0%, transparent 70%)",
      }} />

      <div style={{
        width: "100%",
        maxWidth: "400px",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Card */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            boxShadow: "0 4px 40px rgba(0,0,0,0.18)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "48px", height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, var(--accent, #6366f1), #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "1.4rem",
            }}>
              🔐
            </div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>
              Admin Access
            </h1>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "0.35rem 0 0" }}>
              Portfolio content manager
            </p>
          </div>

          {/* Password field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                ref={inputRef}
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter your password"
                required
                disabled={locked || loading}
                style={{
                  width: "100%",
                  padding: "0.75rem 3rem 0.75rem 1rem",
                  borderRadius: "10px",
                  border: error ? "1.5px solid #f87171" : "1.5px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--fg)",
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                  opacity: locked ? 0.5 : 1,
                }}
              />
              {/* Show/hide toggle */}
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                disabled={locked}
                aria-label={show ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: locked ? "not-allowed" : "pointer",
                  padding: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  color: "var(--muted)",
                  fontSize: "1rem",
                  lineHeight: 1,
                }}
              >
                {show ? (
                  /* Eye-off SVG */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  /* Eye SVG */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 0.75rem",
                background: "rgba(248,113,113,0.1)",
                border: "1px solid rgba(248,113,113,0.25)",
                borderRadius: "8px",
                fontSize: "0.8rem",
                color: "#f87171",
              }}>
                <span>⚠</span> {error}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || locked || !password.trim()}
            style={{
              padding: "0.8rem",
              borderRadius: "10px",
              border: "none",
              background: locked
                ? "var(--border)"
                : "linear-gradient(135deg, var(--accent, #6366f1), #8b5cf6)",
              color: locked ? "var(--muted)" : "#fff",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: loading || locked || !password.trim() ? "not-allowed" : "pointer",
              opacity: !password.trim() && !locked ? 0.6 : 1,
              transition: "opacity 0.15s, transform 0.1s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: "14px", height: "14px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.7s linear infinite",
                }} />
                Signing in…
              </>
            ) : locked ? "Account locked" : "Sign In"}
          </button>
        </form>

        <p style={{
          textAlign: "center",
          fontSize: "0.72rem",
          color: "var(--muted)",
          marginTop: "1.25rem",
          opacity: 0.6,
        }}>
          This page is not publicly linked.
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
