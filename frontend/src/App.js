import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar  from "./components/common/Navbar";
import Home    from "./components/Home";
import Blogs   from "./components/Blogs";
import Login   from "./components/Login";
import Signup  from "./components/Signup";
import About   from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/"        element={<Navigate to="/home" replace />} />
              <Route path="/home"    element={<Home />} />
              <Route path="/login"   element={<Login />} />
              <Route path="/signup"  element={<Signup />} />
              <Route path="/about"   element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs"   element={<Blogs />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
