import React from "react";

export default function BrandCard({ name, logo, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full max-w-[220px] mx-auto !bg-white rounded-xl shadow-lg p-3 text-black cursor-pointer hover:scale-105 transition-transform duration-200 ${className}`}
    >
      <img src={logo} alt={name} className="h-16 object-contain mb-2" />
      <span className="font-semibold text-center uppercase">{name}</span>
    </div>
  );
}
