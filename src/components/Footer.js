// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
      &copy; {new Date().getFullYear()} Movie Review App. All rights reserved.
    </footer>
  );
};

export default Footer;
