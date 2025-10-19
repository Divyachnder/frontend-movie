// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

// ProtectedRoute component
function ProtectedRoute({ children, role }) {
  const { user } = React.useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // Logged in but not authorized
    return <Navigate to="/" />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Home page displaying movies */}
          <Route path="/" element={<Movies />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin dashboard - protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
