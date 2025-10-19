import React, { useState, useContext } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    try {
      const data = await loginUser(formData);
      login(data); // Save user info and token in context
      navigate("/"); // Redirect to movies page
    } catch (err) {
      // Proper error handling
      const msg = err.response?.data?.message || err.message || "Login failed";
      alert("Login failed: " + msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md w-80 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
