import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-black text-white font-semibold text-sm p-1 text-center">
      <p>&copy; Copyright {new Date().getFullYear()} | Design & Developed by Utsab Adhikari</p>
    </div>
  );
};

export default Footer;
