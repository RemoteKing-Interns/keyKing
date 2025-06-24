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

const carimages = [
  { name: "Giulia", img: "/images/Giulia.png" },
  { name: "Stelvio", img: "/images/Stelvio.png" },
  { name: "4C", img: "/images/4C.png" },
  { name: "Giulietta", img: "/images/Giulietta.png" },
];

const brandModels = {
  "ALFA-ROMEO": ["Giulia", "Stelvio", "4C", "Giulietta"],
  BMW: ["3 Series", "5 Series", "X5", "X3", "7 Series", "i4", "iX"],
  CHRYSLER: ["300", "Pacifica", "Voyager"],
  DODGE: ["Charger", "Challenger", "Durango", "Journey", "Grand Caravan"],
  FORD: ["Fiesta", "Focus", "Mustang", "F-150", "Explorer", "Escape", "Edge"],
  HOLDEN: ["Commodore", "Astra", "Trax", "Equinox", "Acadia"],
  HONDA: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V", "Passport"],
  HUMMER: ["H1", "H2", "H3", "EV"],
};

export default function VehicleSelection() {
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleBrandClick = (brandName) => {
    setSelectedBrand(brandName);
    setSelectedModel(null); // Reset model when brand changes
  };

  const handleModelClick = (model) => {
    setSelectedModel(model);
  };

  const handleBackToBrands = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#e9ecf2] to-[#d1ddf4] flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Remote SVG */}
          <div className="z-10">
            <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
              <rect x="10" y="10" width="40" height="100" rx="20" fill="#222" />
              <circle cx="30" cy="30" r="8" fill="#4F8EF7" />
              <rect x="20" y="50" width="20" height="40" rx="5" fill="#fff" />
            </svg>
          </div>
          {/* Waves */}
          <span className="wave"></span>
          <span className="wave delay-1"></span>
          <span className="wave delay-2"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e9ecf2] to-[#dbe7ff] font-inter fade-in">
      <Header />
      <main className="px-6 py-10 text-white">
        <div className="logo-container mb-12">
          <img
            src="/logos/remoteking.png"
            alt="RemoteKing"
            className="remoteking-logo"
          />
        </div>

        {!selectedBrand ? (
          // Brand Selection View
          <>
            <h1 className="text-4xl font-bold mb-12 text-center text-black">
              Select Your Vehicle Brand
            </h1>
            <p className="text-center text-black/90 mb-16">
              Choose from our wide range of vehicle brands
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {brands.map((brand) => (
                <BrandCard
                  key={brand.name}
                  name={brand.name}
                  logo={brand.logo}
                  className="brand-card cursor-pointer transform hover:scale-105 transition-transform duration-200"
                  onClick={() => handleBrandClick(brand.name)}
                />
              ))}
            </div>
          </>
        ) : (
          // Model Selection View
          <>
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={handleBackToBrands}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors duration-200 mr-4"
              >
                ← Back to Brands
              </button>
              <h1 className="text-4xl font-bold text-center text-black">
                Select {selectedBrand} Model
              </h1>
            </div>

            <p className="text-center text-black/90 mb-12">
              Choose your preferred {selectedBrand} model
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {brandModels[selectedBrand].map((model) => (
                  <div
                    key={model}
                    className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 border-2 ${
                      selectedModel === model
                        ? "border-blue-500 bg-blue-50"
                        : "border-transparent hover:border-blue-300"
                    }`}
                    onClick={() => handleModelClick(model)}
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {model}
                      </h3>
                      <div className="w-200 h-2000  rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                        {carimages.find((c) => c.name === model) ? (
                          <img
                            src={carimages.find((c) => c.name === model).img}
                            alt={model}
                            className="object-contain w-50 h-50"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No image
                          </span>
                        )}
                      </div>
                      {selectedModel === model && (
                        <div className="text-blue-600 font-medium">
                          ✓ Selected
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedModel && (
                <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Selection Complete!
                  </h2>
                  <p className="text-gray-700 mb-6">You have selected:</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-xl font-semibold text-gray-800">
                      {selectedBrand} {selectedModel}
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setSelectedModel(null)}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      Change Model
                    </button>
                    <button
                      onClick={() => {
                        // Add your next step logic here
                        alert(
                          `Proceeding with ${selectedBrand} ${selectedModel}`
                        );
                      }}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
