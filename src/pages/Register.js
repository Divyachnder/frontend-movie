import React, { useState, useContext } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "", role: "user" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData); // debug
    try {
      const data = await registerUser(formData);
      console.log("Registration success:", data); // debug
      login(data);
      navigate("/");
    } catch (err) {
      console.error("Register failed:", err); // debug
      const msg = err.response?.data?.message || err.message || "Registration failed";
      alert("Registration failed: " + msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md w-80 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        {/* Username */}
        <label htmlFor="username" className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full mb-2 p-2 border rounded"
        />

        {/* Password */}
        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-2 p-2 border rounded"
        />

        {/* Role */}
        <label htmlFor="role" className="block mb-1 font-medium">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
