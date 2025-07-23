import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrands } from "../features/brandsSlice";
import BrandCard from "../components/BrandCard";
import Footer from "../components/Footer";
import { variantData } from "../variantData";
import VariantDetails from "../components/VariantDetails";

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

const modelVariants = {
  Giulia: ["2016-2018", "2018-Current"],
  Stelvio: ["Base", "Ti", "Quadrifoglio"],
  "4C": ["Coupe", "Spider"],
  Giulietta: ["Super", "Veloce"],
  "3 Series": ["320i", "330i", "M340i"],
  "5 Series": ["520i", "530i", "540i"],
  // Add more as needed...
};

export default function VehicleSelection() {
  // redux
  const dispatch = useDispatch();
  const { items: brands, status: brandsStatus } = useSelector((state) => state.brands);
  const loading = brandsStatus === "loading";
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  

  useEffect(() => {
    if (brandsStatus === "idle") {
      dispatch(fetchBrands());
    }
  }, [brandsStatus, dispatch]);

  const handleBrandClick = (brandName) => {
    setSelectedBrand(brandName);
    setSelectedModel(null);
    setSelectedVariant(null);
  };

  const handleModelClick = (model) => {
    setSelectedModel(model);
    setSelectedVariant(null);
  };

  const handleVariantClick = (variant, model) => {
    setSelectedVariant(variant);
    setSelectedModel(model);
  };

  const handleBackToBrands = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedVariant(null);
  };

  const handleBackToModels = () => {
    setSelectedModel(null);
    setSelectedVariant(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#e9ecf2] to-[#d1ddf4] flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="z-10">
            <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
              <rect x="10" y="10" width="40" height="100" rx="20" fill="#222" />
              <circle cx="30" cy="30" r="8" fill="#4F8EF7" />
              <rect x="20" y="50" width="20" height="40" rx="5" fill="#fff" />
            </svg>
          </div>
          <span className="wave"></span>
          <span className="wave delay-1"></span>
          <span className="wave delay-2"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e9ecf2] to-[#dbe7ff] font-inter fade-in pt-20">
      <Header />
      <main className="px-6 py-10 text-white">
        {/* Brand Selection */}
        {!selectedBrand && (
          <>
            <h1 className="text-4xl font-bold mb-12 text-center text-black">
              Select Your Vehicle Brand
            </h1>
            <p className="text-center text-black/90 mb-16">
              Choose from our wide range of vehicle brands
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Array.isArray(brands) &&
                brands.map((brand) => (
                  <BrandCard
                    key={brand.name}
                    name={brand.name}
                    logo={brand.logoUrl}
                    className="brand-card cursor-pointer transform hover:scale-105 transition-transform duration-200"
                    onClick={() => handleBrandClick(brand.name)}
                  />
                ))}
            </div>
          </>
        )}

        {/* Model Selection */}
        {selectedBrand && !selectedModel && (
          <>
            <div className="flex items-center justify-left mb-8">
              <button
                onClick={handleBackToBrands}
                className="bg-white text-black font-bold px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors duration-200 mr-4"
              >
                ← Back to Brands
              </button>
            </div>
            <h1 className="text-4xl font-bold text-center text-black mb-12">
              Select {selectedBrand} Model
            </h1>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {brandModels[selectedBrand].map((model) => (
                  <div
                    key={model}
                    className={`bg-[#0f172a1a] border-black rounded-lg shadow-md p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 border-2 ${
                      selectedModel === model
                        ? "border-blue-500 bg-blue-50"
                        : "border"
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Variant Selection */}
        {selectedBrand && selectedModel && !selectedVariant && (
          <>
            <div className="flex items-center justify-left mb-8">
              <button
                onClick={handleBackToModels}
                className="bg-white text-black font-bold px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors duration-200 mr-4"
              >
                ← Back to Models
              </button>
            </div>
            <h1 className="text-4xl font-bold text-center text-black mb-12">
              {selectedBrand} {selectedModel}
              <br></br>
              <br></br>
              Select Variant
            </h1>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {(modelVariants[selectedModel] || ["Standard"]).map(
                  (variant) => (
                    <div
                      key={variant}
                      className={`bg-[#0f172a1a] border-black rounded-lg shadow-md p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 border-2 ${
                        selectedVariant === variant
                          ? "border-blue-500 bg-blue-50"
                          : "border-black "
                      }`}
                      onClick={() => handleVariantClick(variant, selectedModel)}
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {selectedBrand}
                          <br></br>
                          {selectedModel}
                          <br></br>
                          {variant}
                        </h3>
                        <div className="w-200 h-2000  rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                          {carimages.find((c) => c.name === selectedModel) ? (
                            <img
                              src={
                                carimages.find((c) => c.name === selectedModel)
                                  .img
                              }
                              alt={selectedModel}
                              className="object-contain w-50 h-50"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">
                              No image
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}
        {/* Confirmation */}
        {selectedBrand && selectedModel && selectedVariant && (
          <VariantDetails
            model={selectedModel}
            variant={selectedVariant}
            data={variantData[selectedModel]?.[selectedVariant]}
            onBack={() => setSelectedVariant(null)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
