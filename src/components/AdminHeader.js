import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminHeader = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="bg-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHeader;
