import React from "react";

export default function BrandCard({ name, logo, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 text-black cursor-pointer hover:scale-105 transition-transform duration-200 ${className}`}
    >
      <img src={logo} alt={name} className="h-24 object-contain mb-4" />
      <span className="font-semibold text-center uppercase">{name}</span>
    </div>
  );
}
