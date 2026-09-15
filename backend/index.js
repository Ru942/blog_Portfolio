// backend/index.js
//
// Express + Firebase Admin SDK
// Replaces the original mongoose/MongoDB backend.
//
// SETUP:
//   1. Go to Firebase Console → Project Settings → Service accounts
//   2. Click "Generate new private key" → download the JSON file
//   3. Rename it to  serviceAccountKey.json  and place it in this folder
//   4. npm install  (installs firebase-admin, express, cors, body-parser, dotenv)
//   5. node index.js  (or: npm start)
//
// All blog data is stored in Firestore collection "blogs".
// The frontend also writes to Firestore directly — this backend is
// provided as an optional REST API layer (e.g. for server-side use).

const express    = require("express");
const cors       = require("cors");
const bodyParser = require("body-parser");
const admin      = require("firebase-admin");
const path       = require("path");

// ── Firebase Admin Init ───────────────────────────────────────────────────────
// Make sure serviceAccountKey.json is in this same directory
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ── Express Setup ─────────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ── Helper: convert Firestore doc to plain object ─────────────────────────────
function docToObj(docSnap) {
  return { id: docSnap.id, ...docSnap.data() };
}

// ── GET /api/blogs — list all blogs, newest first ─────────────────────────────
app.get("/api/blogs", async (req, res) => {
  try {
    const snap  = await db.collection("blogs").orderBy("createdAt", "desc").get();
    const blogs = snap.docs.map(docToObj);
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ── POST /api/blogs — create a new blog post ─────────────────────────────────
app.post("/api/blogs", async (req, res) => {
  const { newTitle, newContent, date, likes = 0 } = req.body;

  if (!newTitle || !newContent) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const ref = await db.collection("blogs").add({
      newTitle:   newTitle.trim(),
      newContent: newContent.trim(),
      date:       date || new Date().toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      }),
      likes:     typeof likes === "number" ? likes : 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const created = await ref.get();
    res.status(201).json(docToObj(created));
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// ── PATCH /api/blogs/like/:id — increment likes ──────────────────────────────
app.patch("/api/blogs/like/:id", async (req, res) => {
  try {
    const ref = db.collection("blogs").doc(req.params.id);
    await ref.update({ likes: admin.firestore.FieldValue.increment(1) });
    const updated = await ref.get();
    if (!updated.exists) return res.status(404).json({ message: "Blog not found." });
    res.json(docToObj(updated));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ── DELETE /api/blogs/:id ─────────────────────────────────────────────────────
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const ref = db.collection("blogs").doc(req.params.id);
    const snap = await ref.get();
    if (!snap.exists) return res.status(404).json({ message: "Blog not found." });
    await ref.delete();
    res.json({ message: "Deleted.", id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
