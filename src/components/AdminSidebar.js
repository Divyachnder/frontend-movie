import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li className="mb-4">
          <Link to="/admin/movies" className="hover:text-yellow-400">
            Manage Movies
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/reviews" className="hover:text-yellow-400">
            Manage Reviews
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/users" className="hover:text-yellow-400">
            Manage Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
