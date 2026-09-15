import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, signInWithGoogle, currentUser } = useAuth();
  const { dark } = useTheme();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [gLoading, setGLoading] = useState(false);

  useEffect(() => { if (currentUser) navigate("/blogs", { replace: true }); }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      await login(email, password);
      navigate("/blogs", { replace: true });
    } catch (err) {
      const map = {
        "auth/user-not-found": "No account with that email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/invalid-credential": "Invalid email or password.",
        "auth/invalid-email": "Enter a valid email address.",
        "auth/too-many-requests": "Too many attempts — wait and try again.",
      };
      setError(map[err.code] || "Login failed. Please try again.");
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setError(""); setGLoading(true);
    try { await signInWithGoogle(); navigate("/blogs", { replace: true }); }
    catch (err) {
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request")
        setError("Google sign-in failed. Please try again.");
    } finally { setGLoading(false); }
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 76px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 24px",
    }}>
      {/* Background glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${dark ? "rgba(99,120,255,0.10)" : "rgba(79,110,247,0.07)"} 0%, transparent 70%)`,
      }} />

      <div style={{ width: "100%", maxWidth: "400px", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "52px", height: "52px", borderRadius: "16px",
            background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
            boxShadow: "0 4px 20px var(--glow-blue)",
            marginBottom: "16px",
            animation: "pulseGlow 3s ease-in-out infinite",
          }}>
            <span style={{ color: "#fff", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "17px" }}>RK</span>
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk',sans-serif", fontSize: "26px",
            fontWeight: 700, color: "var(--text-primary)", margin: "0 0 5px",
          }}>Welcome back</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: "32px", borderRadius: "24px" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "none"; }}
        >
          {error && (
            <div style={{
              background: "color-mix(in srgb, var(--accent-red) 10%, transparent)",
              border: "1px solid color-mix(in srgb, var(--accent-red) 25%, transparent)",
              borderRadius: "10px", padding: "10px 14px", marginBottom: "18px",
              color: "var(--accent-red)", fontSize: "13px", fontWeight: 500,
            }}>{error}</div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Email</label>
              <input className="rk-input" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input className="rk-input" type={showPw ? "text" : "password"} placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)}
                  required disabled={loading} style={{ paddingRight: "44px" }} />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  style={{
                    position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--text-faint)", fontSize: "16px", lineHeight: 1, padding: 0,
                  }}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >{showPw ? "🙈" : "👁"}</button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/signup" style={{ fontSize: "13px", color: "var(--accent-blue)", fontWeight: 500 }}>
                New here? Create account →
              </Link>
            </div>

            <button type="submit" disabled={loading || gLoading} className="btn-primary"
              style={{ fontSize: "15px", padding: "13px", justifyContent: "center", width: "100%" }}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
            <span style={{ fontSize: "12px", color: "var(--text-faint)", fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          </div>

          {/* Google */}
          <button type="button" onClick={handleGoogle} disabled={loading || gLoading}
            className="btn-ghost"
            style={{ width: "100%", justifyContent: "center", padding: "12px 20px", fontSize: "14px" }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.4C29.6 35.4 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.5 39.6 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.6 5.4C41.5 35.8 44 30.3 44 24c0-1.3-.1-2.6-.4-3.5z"/>
            </svg>
            {gLoading ? "Signing in…" : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}
