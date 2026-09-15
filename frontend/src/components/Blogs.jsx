import React, { useEffect, useState, useRef } from "react";
import {
  collection, getDocs, addDoc, doc, updateDoc, deleteDoc,
  increment, orderBy, query, serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import Footer from "./common/Footer";

function WordCount({ text }) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins  = Math.max(1, Math.ceil(words / 200));
  return <span>{mins} min read · {words} words</span>;
}

const CATEGORIES = ["All", "Tech", "Dev", "React", "Career", "Personal"];

export default function Blogs() {
  const { currentUser } = useAuth();
  const [blogs,      setBlogs]      = useState([]);
  const [fetching,   setFetching]   = useState(true);
  const [fetchErr,   setFetchErr]   = useState("");
  const [newTitle,   setNewTitle]   = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCat,     setNewCat]     = useState("Tech");
  const [submitting, setSubmitting] = useState(false);
  const [formErr,    setFormErr]    = useState("");
  const [likedIds,   setLikedIds]   = useState(new Set());
  const [expanded,   setExpanded]   = useState(null);
  const [filter,     setFilter]     = useState("All");
  const [showForm,   setShowForm]   = useState(false);
  const formRef = useRef(null);

  const fetchBlogs = async () => {
    setFetching(true); setFetchErr("");
    try {
      const q    = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
      setFetchErr("Could not load posts. Check your Firebase configuration.");
    } finally { setFetching(false); }
  };

  useEffect(() => { window.scrollTo(0, 0); fetchBlogs(); }, []);

  useEffect(() => {
    if (showForm && formRef.current) formRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [showForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) { setFormErr("You must be logged in to post."); return; }
    const title   = newTitle.trim();
    const content = newContent.trim();
    if (!title || !content) { setFormErr("Title and content are required."); return; }
    setFormErr(""); setSubmitting(true);
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    try {
      await addDoc(collection(db, "blogs"), {
        newTitle: title, newContent: content,
        category: newCat, date,
        likes: 0,
        authorEmail: currentUser.email, authorId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setNewTitle(""); setNewContent(""); setShowForm(false);
      await fetchBlogs();
    } catch (err) {
      console.error(err);
      setFormErr("Failed to publish. Please try again.");
    } finally { setSubmitting(false); }
  };

  const handleLike = async (id) => {
    if (likedIds.has(id)) return;
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, likes: (b.likes || 0) + 1 } : b));
    setLikedIds(prev => new Set([...prev, id]));
    try { await updateDoc(doc(db, "blogs", id), { likes: increment(1) }); }
    catch (err) {
      setBlogs(prev => prev.map(b => b.id === id ? { ...b, likes: Math.max(0, (b.likes || 1) - 1) } : b));
      setLikedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post permanently?")) return;
    setBlogs(prev => prev.filter(b => b.id !== id));
    try { await deleteDoc(doc(db, "blogs", id)); }
    catch (err) { console.error(err); alert("Delete failed."); await fetchBlogs(); }
  };

  const filtered = filter === "All" ? blogs : blogs.filter(b => (b.category || "Tech") === filter);

  return (
    <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 28px" }}>

      {/* ── Hero ── */}
      <div style={{ paddingTop: "60px", paddingBottom: "52px" }}>
        <div style={{ marginBottom: "12px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "var(--accent-blue)",
          }}>
            <span style={{ display: "block", width: "28px", height: "2px", background: "linear-gradient(90deg,var(--accent-blue),var(--accent-violet))", borderRadius: "2px" }} />
            Writing
          </span>
        </div>
        <h1 className="display-lg" style={{ marginBottom: "12px" }}>
          <span className="grad-text">Ideas & Experiments</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "16px", maxWidth: "480px", lineHeight: 1.65, marginBottom: "24px" }}>
          Lessons from enterprise debugging, React patterns, and what I'm learning on the way to full stack.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Filter tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{
                  padding: "6px 14px", borderRadius: "999px",
                  border: `1.5px solid ${filter === cat ? "var(--accent-blue)" : "var(--border-subtle)"}`,
                  background: filter === cat ? "linear-gradient(135deg,var(--accent-blue),var(--accent-violet))" : "var(--bg-glass)",
                  color: filter === cat ? "#fff" : "var(--text-muted)",
                  fontSize: "12px", fontWeight: 600, cursor: "pointer",
                  backdropFilter: "blur(10px)", transition: "all var(--transition-base)",
                  boxShadow: filter === cat ? "0 2px 12px var(--glow-blue)" : "none",
                }}>{cat}</button>
            ))}
          </div>

          {currentUser && (
            <button onClick={() => setShowForm(f => !f)} className="btn-primary"
              style={{ marginLeft: "auto", fontSize: "13px", padding: "8px 18px" }}>
              {showForm ? "✕ Cancel" : "✏ Write Post"}
            </button>
          )}
        </div>
      </div>

      {/* ── Write form ── */}
      {currentUser && showForm && (
        <div ref={formRef} className="glass-card"
          style={{ padding: "28px", marginBottom: "36px", borderRadius: "24px" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "none"; }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "20px" }}>
            ✍ New Post
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {formErr && (
              <div style={{ background: "color-mix(in srgb, var(--accent-red) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-red) 25%, transparent)", borderRadius: "10px", padding: "10px 14px", color: "var(--accent-red)", fontSize: "13px" }}>
                {formErr}
              </div>
            )}
            <input className="rk-input" type="text" placeholder="Post title"
              value={newTitle} onChange={e => setNewTitle(e.target.value)} required disabled={submitting} />

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <select
                value={newCat} onChange={e => setNewCat(e.target.value)}
                style={{
                  padding: "11px 16px", background: "var(--bg-input)",
                  border: "1.5px solid var(--border-subtle)", borderRadius: "var(--r-md)",
                  color: "var(--text-primary)", fontSize: "14px",
                  fontFamily: "'Inter',sans-serif", cursor: "pointer",
                  outline: "none",
                }}
              >
                {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <textarea className="rk-input" placeholder="Write your post…" rows={6}
              value={newContent} onChange={e => setNewContent(e.target.value)}
              required disabled={submitting}
              style={{ resize: "vertical", fontFamily: "'Inter',sans-serif" }} />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button type="button" className="btn-ghost" onClick={() => setShowForm(false)} style={{ fontSize: "14px" }}>Cancel</button>
              <button type="submit" disabled={submitting} className="btn-primary" style={{ fontSize: "14px", padding: "10px 24px" }}>
                {submitting ? "Publishing…" : "Publish →"}
              </button>
            </div>
          </form>
        </div>
      )}

      {!currentUser && (
        <div style={{
          background: "color-mix(in srgb, var(--accent-blue) 7%, transparent)",
          border: "1px solid var(--border-subtle)", borderRadius: "16px",
          padding: "16px 20px", marginBottom: "32px", fontSize: "14px", color: "var(--text-muted)",
        }}>
          <a href="/login" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>Sign in</a> to write a blog post.
        </div>
      )}

      {/* ── Blog list ── */}
      {fetching && (
        <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-faint)" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px", animation: "spinSlow 1.5s linear infinite", display: "inline-block" }}>⏳</div>
          <p style={{ fontSize: "14px" }}>Loading posts…</p>
        </div>
      )}
      {fetchErr && (
        <div style={{
          background: "color-mix(in srgb, var(--accent-red) 8%, transparent)",
          border: "1px solid color-mix(in srgb, var(--accent-red) 20%, transparent)",
          borderRadius: "16px", padding: "24px", textAlign: "center",
          color: "var(--accent-red)", marginBottom: "40px",
        }}>{fetchErr}</div>
      )}
      {!fetching && !fetchErr && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-faint)" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📝</div>
          <p style={{ fontSize: "15px" }}>
            {filter !== "All" ? `No posts in "${filter}" yet.` : "No posts yet — be the first!"}
          </p>
        </div>
      )}

      {!fetching && !fetchErr && filtered.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px", marginBottom: "60px" }} className="blogs-grid">
          {filtered.map((blog, i) => {
            const isOwner = currentUser && currentUser.uid === blog.authorId;
            const hasLiked = likedIds.has(blog.id);
            const isExpanded = expanded === blog.id;
            const cat = blog.category || "Tech";

            return (
              <article key={blog.id}
                className="glass-card"
                style={{
                  padding: "24px", display: "flex", flexDirection: "column", gap: "10px",
                  animation: `fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both`,
                }}
              >
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                  <span style={{
                    background: "color-mix(in srgb, var(--accent-blue) 12%, transparent)",
                    color: "var(--accent-blue)", border: "1px solid color-mix(in srgb, var(--accent-blue) 25%, transparent)",
                    borderRadius: "999px", fontSize: "11px", fontWeight: 700, padding: "3px 10px",
                  }}>{cat}</span>
                  {blog.date && (
                    <span style={{ fontSize: "11px", color: "var(--text-faint)" }}>
                      📅 {blog.date}
                    </span>
                  )}
                </div>

                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.25 }}>
                  {blog.newTitle}
                </h3>

                {blog.authorEmail && (
                  <div style={{ fontSize: "12px", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{
                      width: "20px", height: "20px", borderRadius: "50%",
                      background: "linear-gradient(135deg,var(--accent-blue),var(--accent-violet))",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: "9px", fontWeight: 800, flexShrink: 0,
                    }}>
                      {blog.authorEmail[0].toUpperCase()}
                    </span>
                    {blog.authorEmail.split("@")[0]}
                    &nbsp;·&nbsp;
                    <WordCount text={blog.newContent} />
                  </div>
                )}

                <p style={{
                  fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7,
                  display: isExpanded ? "block" : "-webkit-box",
                  WebkitLineClamp: isExpanded ? "unset" : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: isExpanded ? "visible" : "hidden",
                  transition: "all 0.3s",
                }}>{blog.newContent}</p>

                {/* Footer row */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  paddingTop: "12px", borderTop: "1px solid var(--border-subtle)", marginTop: "auto",
                }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => handleLike(blog.id)} disabled={hasLiked}
                      style={{
                        display: "flex", alignItems: "center", gap: "5px",
                        background: hasLiked ? "color-mix(in srgb, var(--accent-red) 12%, transparent)" : "var(--bg-glass)",
                        border: `1px solid ${hasLiked ? "color-mix(in srgb, var(--accent-red) 30%, transparent)" : "var(--border-subtle)"}`,
                        borderRadius: "999px", padding: "5px 12px",
                        color: hasLiked ? "var(--accent-red)" : "var(--text-faint)",
                        fontSize: "13px", fontWeight: 500,
                        cursor: hasLiked ? "default" : "pointer",
                        fontFamily: "'Inter',sans-serif",
                        transition: "all var(--transition-fast)",
                        backdropFilter: "blur(8px)",
                      }}
                      onMouseEnter={e => { if (!hasLiked) { e.currentTarget.style.borderColor = "color-mix(in srgb, var(--accent-red) 40%, transparent)"; e.currentTarget.style.color = "var(--accent-red)"; }}}
                      onMouseLeave={e => { if (!hasLiked) { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-faint)"; }}}
                    >{hasLiked ? "♥" : "♡"} {blog.likes || 0}</button>

                    <button onClick={() => setExpanded(expanded === blog.id ? null : blog.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: "5px",
                        background: "var(--bg-glass)", border: "1px solid var(--border-subtle)",
                        borderRadius: "999px", padding: "5px 12px",
                        color: "var(--text-faint)", fontSize: "12px", fontWeight: 500,
                        cursor: "pointer", fontFamily: "'Inter',sans-serif",
                        backdropFilter: "blur(8px)", transition: "all var(--transition-fast)",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-blue)"; e.currentTarget.style.color = "var(--accent-blue)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-faint)"; }}
                    >{isExpanded ? "▲ Less" : "▼ Read more"}</button>
                  </div>

                  {(isOwner || currentUser) && (
                    <button onClick={() => handleDelete(blog.id)}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: "12px", color: "var(--text-faint)",
                        fontFamily: "'Inter',sans-serif", padding: "4px 8px",
                        borderRadius: "8px", transition: "color var(--transition-fast)",
                      }}
                      onMouseEnter={e => e.target.style.color = "var(--accent-red)"}
                      onMouseLeave={e => e.target.style.color = "var(--text-faint)"}
                    >🗑</button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <style>{`@media(max-width:640px){.blogs-grid{grid-template-columns:1fr!important;}}`}</style>
      <Footer />
    </div>
  );
}
