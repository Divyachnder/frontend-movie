import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isDarkMode, toggleTheme } = useContext(AuthContext);

  return (
    <nav className={`p-4 flex justify-between ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="font-bold text-xl">🎬 Movie Review</h1>
      <div className="flex gap-4 items-center">
        <button onClick={toggleTheme} className="border px-3 py-1 rounded">
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        {user ? (
          <>
            <span>{user.role === "admin" ? "Admin" : "User"}</span>
            <button onClick={logout} className="border px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
