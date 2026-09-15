import React from "react";
import Footer from "./common/Footer";

export default function About() {
  return (
    <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "60px 28px 0" }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-blue)", marginBottom: "12px" }}>
          <span style={{ display: "block", width: "28px", height: "2px", background: "linear-gradient(90deg,var(--accent-blue),var(--accent-violet))", borderRadius: "2px" }} />
          About
        </div>
        <h1 className="display-lg" style={{ marginBottom: "10px" }}>About Rupesh</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "16px", maxWidth: "540px", lineHeight: 1.65 }}>
          B.Tech IT graduate building toward a full stack engineering career — combining enterprise operational experience with hands-on development.
        </p>
      </div>

      <div className="glass-card" style={{ padding: "36px", marginBottom: "24px", lineHeight: 1.8, color: "var(--text-secondary)", fontSize: "15px" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "none"; }}>
        <p>I'm Rupesh K R, a Resolution Coordinator at Walmart Global Tech and a self-driven developer working toward a full stack software engineering role. My day job involves triaging and resolving 90+ tickets per week across 7 lines of business — Transportation, Pickup, Online Grocery, and more — using Oracle, WMTS, and VMware. The skills I apply there — structured root-cause analysis, systematic debugging, cross-functional communication — transfer directly to writing production-grade code.</p>
        <p style={{ marginTop: "16px" }}>Outside work, I build. I've shipped projects in React, vanilla JavaScript, Node.js with Express, and Android (Java/Kotlin/.NET MAUI). I'm currently deepening my MERN stack skills to make the transition into a full-time engineering role.</p>
        <p style={{ marginTop: "16px" }}>I hold a CCNA certification and have worked hands-on with OSPF, BGP, and EIGRP at BSNL. I'm also Pega CSA and CSSA certified. I've received 6 awards at Walmart — 3 Excellence and 3 Bravo — for consistent performance and ownership.</p>
      </div>
      <Footer />
    </div>
  );
}
