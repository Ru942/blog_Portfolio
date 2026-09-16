// backend/index.js
//
// Express + Firebase Admin SDK
// Works locally with serviceAccountKey.json
// Works on Vercel with FIREBASE_SERVICE_ACCOUNT_BASE64

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// ======================================================
// FIREBASE ADMIN INITIALIZATION
// ======================================================

let serviceAccount;

// ------------------------------------------------------
// Vercel / Production
// ------------------------------------------------------
if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  try {
    const decoded = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
      "base64"
    ).toString("utf8");

    serviceAccount = JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to decode Firebase service account:", error);
    process.exit(1);
  }
}

// ------------------------------------------------------
// Local development
// ------------------------------------------------------
else {
  const serviceAccountPath = path.join(
    __dirname,
    "serviceAccountKey.json"
  );

  if (!fs.existsSync(serviceAccountPath)) {
    console.error(
      "Firebase credentials not found. " +
      "Place serviceAccountKey.json inside backend/ " +
      "or configure FIREBASE_SERVICE_ACCOUNT_BASE64."
    );

    process.exit(1);
  }

  serviceAccount = require(serviceAccountPath);
}

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// ======================================================
// EXPRESS SETUP
// ======================================================

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.json());

// ======================================================
// HELPER
// ======================================================

function docToObj(docSnap) {
  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
}

// ======================================================
// GET /api/blogs
// List all blogs, newest first
// ======================================================

app.get("/api/blogs", async (req, res) => {
  try {
    const snap = await db
      .collection("blogs")
      .orderBy("createdAt", "desc")
      .get();

    const blogs = snap.docs.map(docToObj);

    res.json(blogs);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ======================================================
// POST /api/blogs
// Create a new blog post
// ======================================================

app.post("/api/blogs", async (req, res) => {
  const {
    newTitle,
    newContent,
    date,
    likes = 0,
  } = req.body;

  if (!newTitle || !newContent) {
    return res.status(400).json({
      message: "Title and content are required.",
    });
  }

  try {
    const ref = await db.collection("blogs").add({
      newTitle: newTitle.trim(),

      newContent: newContent.trim(),

      date:
        date ||
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),

      likes: typeof likes === "number" ? likes : 0,

      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const created = await ref.get();

    res.status(201).json(docToObj(created));
  } catch (err) {
    console.error(err);

    res.status(400).json({
      message: err.message,
    });
  }
});

// ======================================================
// PATCH /api/blogs/like/:id
// Increment likes
// ======================================================

app.patch("/api/blogs/like/:id", async (req, res) => {
  try {
    const ref = db
      .collection("blogs")
      .doc(req.params.id);

    await ref.update({
      likes: admin.firestore.FieldValue.increment(1),
    });

    const updated = await ref.get();

    if (!updated.exists) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    res.json(docToObj(updated));
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ======================================================
// DELETE /api/blogs/:id
// ======================================================

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const ref = db
      .collection("blogs")
      .doc(req.params.id);

    const snap = await ref.get();

    if (!snap.exists) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    await ref.delete();

    res.json({
      message: "Deleted.",
      id: req.params.id,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

// ======================================================
// LOCAL SERVER
// ======================================================
//
// Vercel handles the Express application itself.
// app.listen() is only used when running locally.
//

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `🚀 Backend running on http://localhost:${PORT}`
    );
  });
}

// ======================================================
// EXPORT FOR VERCEL
// ======================================================

module.exports = app;