import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
  const { dark } = useTheme();
  return (
    <footer style={{
      marginTop: "80px",
      padding: "36px 28px",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--bg-glass)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    }}>
      <div style={{
        maxWidth: "1120px", margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "16px",
      }}>
        <div>
          <div style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700, fontSize: "17px",
            background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: "4px",
          }}>Rupesh K R</div>
          <p style={{ fontSize: "12px", color: "var(--text-faint)" }}>
            Full Stack Developer · Trichy, India
          </p>
        </div>
        <p style={{ fontSize: "12px", color: "var(--text-faint)" }}>
          © {new Date().getFullYear()} Rupesh K R. Built with React.
        </p>
      </div>
    </footer>
  );
}
