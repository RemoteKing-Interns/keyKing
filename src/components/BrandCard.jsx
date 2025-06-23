
import React from "react";

export default function BrandCard({ name, logo }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-transparent text-black ">
      <img src={logo} alt={name} className="h-24 object-contain mb-4" />
      <span className="font-semibold text-center uppercase">{name}</span>
    </div>
  );
}
