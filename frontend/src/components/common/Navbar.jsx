import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const NAV_LINKS = [
  { label: "About",    href: "#about" },
  { label: "Journey",  href: "#journey" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog",     page: "/blogs" },
  { label: "Contact",  href: "#contact" },
];

function ThemeToggle({ dark, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: "40px", height: "22px",
        background: dark
          ? "linear-gradient(135deg,#6378ff,#9d6bff)"
          : "linear-gradient(135deg,#e0e7ff,#c7d2fe)",
        border: "none",
        borderRadius: "11px",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.3s",
        flexShrink: 0,
      }}
    >
      <span style={{
        position: "absolute",
        top: "3px",
        left: dark ? "21px" : "3px",
        width: "16px", height: "16px",
        borderRadius: "50%",
        background: dark ? "#fff" : "#6378ff",
        transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "9px",
      }}>
        {dark ? "🌙" : "☀"}
      </span>
    </button>
  );
}

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { currentUser, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState("");
  const [loggingOut,  setLoggingOut]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== "/home" && !location.pathname.startsWith("/home")) return;
    const ids = ["about","journey","skills","projects","contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveLink(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [location.pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try { await logout(); navigate("/login"); }
    catch (e) { console.error(e); }
    finally { setLoggingOut(false); }
  };

  const handleNavClick = (link, e) => {
    setMobileOpen(false);
    if (link.page) { navigate(link.page); return; }
    if (link.href) {
      if (location.pathname !== "/home") {
        e.preventDefault();
        navigate("/home");
        setTimeout(() => {
          document.getElementById(link.href.replace("#",""))?.scrollIntoView({ behavior:"smooth" });
        }, 100);
      }
    }
  };

  const navBg = dark
    ? scrolled ? "rgba(6,9,20,0.92)" : "rgba(6,9,20,0.75)"
    : scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.78)";

  return (
    <>
      <header style={{
        position: "fixed",
        top: "14px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(calc(100% - 40px), 1080px)",
        zIndex: 1000,
        background: navBg,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "18px",
        border: `1px solid ${dark ? "rgba(99,120,255,0.14)" : "rgba(255,255,255,0.7)"}`,
        boxShadow: scrolled
          ? `0 8px 32px ${dark ? "rgba(0,0,0,0.5)" : "rgba(79,110,247,0.12)"}`
          : `0 2px 16px ${dark ? "rgba(0,0,0,0.3)" : "rgba(79,110,247,0.07)"}`,
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 22px",
          gap: "16px",
        }}>
          {/* Logo */}
          <Link to="/home" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "19px",
            }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "9px",
                background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "13px", fontWeight: 800,
                boxShadow: "0 2px 10px var(--glow-blue)",
              }}>RK</div>
              <span style={{ color: "var(--text-primary)", display: "none" }}
                className="md-block">Rupesh</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2px" }} className="desktop-nav">
            {NAV_LINKS.map(link => {
              const id = (link.href || "").replace("#","");
              const isActive = link.page
                ? location.pathname === link.page
                : activeLink === id;
              return (
                <a
                  key={link.label}
                  href={link.href || link.page}
                  onClick={e => handleNavClick(link, e)}
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "13.5px",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--accent-blue)" : "var(--text-secondary)",
                    textDecoration: "none",
                    padding: "7px 14px",
                    borderRadius: "10px",
                    position: "relative",
                    background: isActive
                      ? `color-mix(in srgb, var(--accent-blue) 10%, transparent)`
                      : "transparent",
                    transition: "all var(--transition-fast)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = `color-mix(in srgb, var(--accent-blue) 8%, transparent)`;
                      e.currentTarget.style.color = "var(--accent-blue)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: "absolute", bottom: "3px", left: "50%",
                      transform: "translateX(-50%)",
                      width: "16px", height: "2px", borderRadius: "1px",
                      background: "var(--accent-blue)",
                    }} />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <ThemeToggle dark={dark} toggle={toggle} />

            {currentUser ? (
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="btn-ghost"
                style={{ fontSize: "13px", padding: "7px 16px" }}
              >
                {loggingOut ? "…" : "Logout"}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="btn-primary"
                style={{ fontSize: "13px", padding: "7px 18px" }}
              >
                Login
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              style={{
                display: "none",
                background: "none", border: "none",
                cursor: "pointer", color: "var(--text-primary)",
                padding: "4px", borderRadius: "8px",
              }}
              className="hamburger"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                {mobileOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div style={{
            borderTop: "1px solid var(--border-subtle)",
            padding: "12px 16px 16px",
            display: "flex", flexDirection: "column", gap: "2px",
          }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href || link.page}
                onClick={e => handleNavClick(link, e)}
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "14px", fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  padding: "9px 12px",
                  borderRadius: "10px",
                  transition: "all var(--transition-fast)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `color-mix(in srgb, var(--accent-blue) 8%, transparent)`;
                  e.currentTarget.style.color = "var(--accent-blue)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <div style={{ height: "76px" }} aria-hidden="true" />

      <style>{`
        @media (max-width: 740px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
