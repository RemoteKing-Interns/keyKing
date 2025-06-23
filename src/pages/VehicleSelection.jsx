
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BrandCard from "../components/BrandCard";
import Footer from "../components/Footer";

const brands = [
  { name: "ALFA-ROMEO", logo: "/logos/alfa-romeo.png" },
  { name: "BMW", logo: "/logos/bmw.png" },
  { name: "CHRYSLER", logo: "/logos/chrysler.png" },
  { name: "DODGE", logo: "/logos/dodge.png" },
  { name: "FORD", logo: "/logos/ford.png" },
  { name: "HOLDEN", logo: "/logos/holden.png" },
  { name: "HONDA", logo: "/logos/honda.png" },
  { name: "HUMMER", logo: "/logos/hummer.png" },
];

export default function VehicleSelection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 flex items-center justify-center">
        <div className="loading-spinner animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#112253] to-[#fff] font-inter fade-in">
      <Header />
      <main className="px-6 py-10 text-white">
        <div className="logo-container mb-12">
          <img src="/logos/remoteking.png" alt="RemoteKing" className="remoteking-logo" />
        </div>
        <h1 className="text-4xl font-bold mb-12 text-center">Select Your Vehicle Brands</h1>
        <p className="text-center text-gray-300 mb-16">
          Choose from our wide range of vehicle brands
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <BrandCard 
              key={brand.name} 
              name={brand.name} 
              logo={brand.logo}
              className="brand-card"
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
