import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Movie Rating & Review</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
