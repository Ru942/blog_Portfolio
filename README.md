# Blog Project — Firebase Edition

The original MongoDB/mongoose backend has been replaced with **Firebase**  
(Firestore for data + Firebase Authentication for login/signup).

---

## Project Structure

```
blog-fixed/
├── frontend/          ← React app (Create React App + Tailwind)
│   └── src/
│       ├── config/firebase.js       ← ⚠️  Fill in your Firebase config here
│       ├── context/AuthContext.js   ← Global auth state (login / logout / signup)
│       ├── components/
│       │   ├── Login.jsx            ← Firebase email+password login
│       │   ├── Signup.jsx           ← Firebase registration
│       │   ├── Blogs.jsx            ← Firestore CRUD (read/add/like/delete)
│       │   ├── Home.jsx             ← unchanged
│       │   └── common/
│       │       ├── Navbar.jsx       ← shows Login or Logout depending on auth state
│       │       └── PrivateRoute.jsx ← redirects unauthenticated users to /login
│       └── App.js                   ← routes + AuthProvider wrapper
└── backend/           ← Optional Express + Firebase Admin SDK REST API
    ├── index.js
    └── serviceAccountKey.json  ← ⚠️  Download from Firebase Console (see below)
```

---

## Step 1 — Create a Firebase Project

1. Go to **https://console.firebase.google.com**
2. Click **Add project** → give it a name → Continue
3. Disable Google Analytics (optional) → **Create project**

---

## Step 2 — Enable Email/Password Authentication

1. In the Firebase Console left menu: **Authentication** → **Sign-in method**
2. Click **Email/Password** → toggle **Enable** → **Save**

---

## Step 3 — Create a Firestore Database

1. Left menu: **Firestore Database** → **Create database**
2. Choose **Start in test mode** (open for 30 days — fine for development)
3. Pick a region → **Enable**

---

## Step 4 — Get your Web App Config (Frontend)

1. Left menu: **Project Overview** → gear icon → **Project settings**
2. Scroll to **Your apps** → click **</>** (Add web app)
3. Give it a nickname → **Register app**
4. Copy the `firebaseConfig` object shown

Paste it into **`frontend/src/config/firebase.js`**:

```js
const firebaseConfig = {
  apiKey:            "AIza...",
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123",
};
```

---

## Step 5 — Run the Frontend

```bash
cd frontend
npm install          # installs React + Firebase SDK + Tailwind
npm start            # opens http://localhost:3000
```

**That's it for basic usage.** The frontend talks directly to Firebase —  
no backend server is required for the blog to work.

---

## Step 6 — (Optional) Run the Express Backend

The backend is a REST API layer on top of Firestore.  
Skip this if you only need the frontend.

### Get a Service Account Key

1. Firebase Console → **Project settings** → **Service accounts**
2. Click **Generate new private key** → confirm → a JSON file downloads
3. Rename it `serviceAccountKey.json` and place it in the `backend/` folder

```bash
cd backend
npm install
node index.js        # http://localhost:5000
```

REST endpoints:
```
GET    /api/blogs           list all posts
POST   /api/blogs           create a post
PATCH  /api/blogs/like/:id  increment likes
DELETE /api/blogs/:id       delete a post
GET    /health              status check
```

---

## How Authentication Works

| Page / Feature       | Behaviour |
|----------------------|-----------|
| `/signup`            | Creates a Firebase Auth account + logs in immediately |
| `/login`             | Signs in with email + password via Firebase |
| Navbar               | Shows **Login** when logged out, **Logout + email** when in |
| Blog compose form    | Visible **only** when logged in |
| Like button          | Available to **everyone** (one like per session) |
| Delete button        | Visible to **logged-in users** only |
| `/blogs` route       | Public — anyone can read posts |

---

## Firestore Security Rules (recommended for production)

In the Firebase Console → Firestore → **Rules**, replace the default with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogs/{blogId} {
      // Anyone can read
      allow read: if true;
      // Only authenticated users can create
      allow create: if request.auth != null;
      // Only the post author can delete their own post
      allow delete: if request.auth != null && request.auth.uid == resource.data.authorId;
      // Anyone can update likes (increment only)
      allow update: if request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes']);
    }
  }
}
```
