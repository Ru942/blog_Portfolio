import React, { useState } from "react";
import Footer from "./common/Footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handle = e => {
    e.preventDefault();
    const sub = encodeURIComponent(`Portfolio contact from ${name}`);
    const bod = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
    window.location.href = `mailto:rupeshkuppusamy@gmail.com?subject=${sub}&body=${bod}`;
    setSent(true);
  };

  return (
    <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "60px 28px 0" }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-blue)", marginBottom: "12px" }}>
          <span style={{ display: "block", width: "28px", height: "2px", background: "linear-gradient(90deg,var(--accent-blue),var(--accent-violet))", borderRadius: "2px" }} />
          Contact
        </div>
        <h1 className="display-lg" style={{ marginBottom: "10px" }}>Let's Build Something</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "16px", maxWidth: "460px", lineHeight: 1.65 }}>
          Open to full stack engineering roles, freelance projects, and interesting collaborations.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "28px" }} className="c-grid">
        <div className="glass-card" style={{ padding: "28px" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "none"; }}>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "22px" }}>
            Send a message and I'll get back to you within 24 hours.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "22px" }}>
            {[
              { icon:"✉", label:"rupeshkuppusamy@gmail.com", href:"mailto:rupeshkuppusamy@gmail.com" },
              { icon:"📞", label:"+91 8056822299", href:"tel:+918056822299" },
              { icon:"📍", label:"Trichy, India", href:null },
            ].map(it => it.href ? (
              <a key={it.label} href={it.href} style={{ display:"flex", alignItems:"center", gap:"11px", color:"var(--accent-blue)", textDecoration:"none", fontSize:"14px", fontWeight:500, transition:"opacity var(--transition-fast)" }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <span style={{ fontSize:"15px", width:"32px", height:"32px", background:"color-mix(in srgb,var(--accent-blue) 10%,transparent)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{it.icon}</span>
                {it.label}
              </a>
            ) : (
              <div key={it.label} style={{ display:"flex", alignItems:"center", gap:"11px", color:"var(--text-muted)", fontSize:"14px" }}>
                <span style={{ fontSize:"15px", width:"32px", height:"32px", background:"color-mix(in srgb,var(--accent-blue) 8%,transparent)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{it.icon}</span>
                {it.label}
              </div>
            ))}
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", paddingTop:"16px", borderTop:"1px solid var(--border-subtle)" }}>
            {[["📄 Resume","https://ru942.github.io/Portfolio/"],["GitHub","https://github.com/Ru942"],["LinkedIn","https://www.linkedin.com/in/rupesh-k-r-70864a204/"]].map(([l,h])=>(
              <a key={l} href={h} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize:"13px", padding:"7px 14px" }}>{l}</a>
            ))}
          </div>
        </div>

        <form onSubmit={handle} className="glass-card" style={{ padding:"28px", display:"flex", flexDirection:"column", gap:"14px" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "none"; }}>
          <input className="rk-input" type="text" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} required />
          <input className="rk-input" type="email" placeholder="Your Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <textarea className="rk-input" placeholder="Your Message" rows={6} value={msg} onChange={e=>setMsg(e.target.value)} required style={{ resize:"vertical", fontFamily:"'Inter',sans-serif" }} />
          <button type="submit" className="btn-primary" style={{ fontSize:"15px", padding:"13px 24px", justifyContent:"center" }}>
            {sent ? "✓ Message sent — check your email app" : "Send Message →"}
          </button>
        </form>
      </div>
      <style>{`@media(max-width:700px){.c-grid{grid-template-columns:1fr!important;}}`}</style>
      <Footer />
    </div>
  );
}
