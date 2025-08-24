import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrands, clearBrands } from "../features/brandsSlice";
import { fetchModels, clearModels } from "../features/modelsSlice";
import {
  fetchVariantsByModelId,
  clearVariants,
} from "../features/variantsSlice";
import BrandCard from "../components/BrandCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VariantDetails from "../components/VariantDetails";

const defaultCarImage = "/images/default-car.png";

const VehicleSelection = () => {
  const dispatch = useDispatch();

  // Select data from Redux store
  const { items: brands = [], status: brandsStatus } = useSelector(
    (state) => state.brands
  );

  const {
    items: models = [],
    status: modelsStatus,
    error: modelsError,
  } = useSelector((state) => state.models);

  const {
    items: variants = [],
    status: variantsStatus,
    error: variantsError,
  } = useSelector((state) => state.variants);

  // Local state
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Ensure models is always an array and sort it by name
  const modelItems = Array.isArray(models)
    ? [...models].sort((a, b) => a.name.localeCompare(b.name))
    : [];

  // Log state changes for debugging
  useEffect(() => {
    console.log("Models state changed:", { models, modelsStatus, modelsError });
  }, [models, modelsStatus, modelsError]);

  // Load brands on component mount
  useEffect(() => {
    console.log("Component mounted - initializing");
    dispatch(fetchBrands());

    return () => {
      console.log("Component unmounting - cleaning up");
      dispatch(clearBrands());
      dispatch(clearModels());
      dispatch(clearVariants());
    };
  }, [dispatch]);

  // Handle brand selection
  const handleBrandClick = async (brand) => {
    console.log("Brand selected:", brand);
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedVariant(null);

    if (brand && brand._id) {
      console.log("Dispatching fetchModels with brand ID:", brand._id);
      try {
        const resultAction = await dispatch(fetchModels(brand._id));
        if (fetchModels.fulfilled.match(resultAction)) {
          console.log("Successfully fetched models:", resultAction.payload);
        } else if (fetchModels.rejected.match(resultAction)) {
          console.error("Failed to fetch models:", resultAction.error);
        }
      } catch (error) {
        console.error("Error in handleBrandClick:", error);
      }
    } else {
      console.error("Invalid brand or brand ID:", brand);
    }
  };

  // Handle model selection
  const handleModelClick = async (model) => {
    console.log("Model selected:", model);
    setSelectedModel(model);
    setSelectedVariant(null);

    try {
      // Fetch variants for the selected model
      await dispatch(fetchVariantsByModelId(model._id));
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  };

  // Handle variant selection
  const handleVariantClick = (variant) => {
    console.log("Variant selected:", variant);
    setSelectedVariant(variant);
  };

  // Navigation handlers
  const handleBackToBrands = () => {
    console.log("Going back to brands");
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedVariant(null);
    dispatch(clearModels());
    dispatch(clearVariants());
  };

  const handleBackToVariants = () => {
    console.log("Going back to variants");
    setSelectedVariant(null); // Only clear variant, keep model selected
    // Do not clear variants here!
  };

  const handleBackToModels = () => {
    console.log("Going back to models");
    setSelectedModel(null); // Go back to model selection
    setSelectedVariant(null);
    dispatch(clearVariants());
  };

  // Show loading state
  const isLoading =
    brandsStatus === "loading" ||
    (selectedBrand && modelsStatus === "loading") ||
    (selectedModel && variantsStatus === "loading");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#e9ecf2] to-[#d1ddf4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">
            {selectedBrand && !selectedModel
              ? "Loading models..."
              : selectedBrand && selectedModel && !selectedVariant
              ? "Loading variants..."
              : "Loading brands..."}
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  const hasError =
    brandsStatus === "failed" ||
    modelsStatus === "failed" ||
    variantsStatus === "failed";
  const errorMessage = modelsError || variantsError || "An error occurred";

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#e9ecf2] to-[#d1ddf4] flex items-center justify-center">
        <div className="text-center p-6 bg-red-100 rounded-lg max-w-md mx-4">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{errorMessage}</p>
          <button
            onClick={() => {
              if (selectedBrand && selectedModel) {
                dispatch(fetchVariantsByModelId(selectedModel._id));
              } else if (selectedBrand) {
                dispatch(fetchModels(selectedBrand._id));
              } else {
                dispatch(fetchBrands());
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e9ecf2] to-[#dbe7ff] font-inter pt-20">
      <Header />

      <main className="px-6 py-10">
        {/* Brand Selection */}
        {!selectedBrand && (
          <div className="w-full px-2 md:px-8 lg:px-16 xl:px-24">
            <h1 className="text-4xl font-bold mb-12 text-center text-black">
              Select Your Vehicle Brand
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
              {brands.map((brand) => (
                <BrandCard
                  key={brand._id}
                  name={brand.name}
                  logo={brand.logoUrl}
                  className="brand-card cursor-pointer transform hover:scale-105 transition-transform duration-200"
                  onClick={() => handleBrandClick(brand)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Model Selection */}
        {selectedBrand && !selectedModel && !selectedVariant && (
          <div className="w-full px-2 md:px-8 lg:px-16 xl:px-24">
            <div className="mb-8">
              <button
                onClick={handleBackToBrands}
                className="bg-white text-black font-bold px-4 py-2 rounded-lg shadow hover:bg-gray-50 mr-4"
              >
                ← Back to Brands
              </button>
            </div>

            <h1 className="text-4xl font-bold text-center text-black mb-12">
              Select {selectedBrand?.name} Model
            </h1>

            {modelItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  No models found for this brand.
                </p>
                <button
                  onClick={handleBackToBrands}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Back to Brands
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                {modelItems.map((model) => {
                  const modelName = model.name || "Unnamed Model";
                  const imageUrl = model.imageUrl
                    ? `${model.imageUrl}?${new Date().getTime()}` // Cache buster
                    : defaultCarImage;

                  return (
                    <div
                      key={model._id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200 w-full max-w-[360px] mx-auto flex flex-col"
                      onClick={() => handleModelClick(model)}
                    >
                      <div className="h-32 flex items-center justify-center p-3">
                        <img
                          src={imageUrl}
                          alt={modelName}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            console.error(`Error loading image: ${imageUrl}`);
                            e.target.onerror = null;
                            e.target.src = defaultCarImage;
                          }}
                        />
                      </div>
                      <div className="p-4 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 text-center">
                          {modelName}
                        </h3>
                        {model.brandName && (
                          <p className="text-sm text-gray-500 text-center">
                            {model.brandName}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Variant Selection */}
        {selectedBrand && selectedModel && !selectedVariant && (
          <div className="w-full px-2 md:px-8 lg:px-16 xl:px-24">
            <div className="mb-8">
              <button
                onClick={handleBackToModels}
                className="bg-white text-black font-bold px-4 py-2 rounded-lg shadow hover:bg-gray-50 mr-4"
              >
                ← Back to Models
              </button>
            </div>

            <h1 className="text-4xl font-bold text-center text-black mb-12">
              Select {selectedModel?.name} Variant
            </h1>

            {variants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  No variants found for this model.
                </p>
                <button
                  onClick={handleBackToModels}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Back to Models
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                {variants.map((variant) => (
                  <div
                    key={variant._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200 w-full max-w-[360px] mx-auto flex flex-col"
                    onClick={() => handleVariantClick(variant)}
                  >
                    <div className="h-48 flex items-center justify-center p-6">
                      {variant.images?.car ? (
                        <img
                          src={variant.images.car}
                          alt={variant.name}
                          className="h-full w-full object-contain"
                          style={{ minHeight: 150, maxHeight: 380 }}
                          onError={(e) => {
                            console.error(
                              `Error loading image: ${variant.images.car}`
                            );
                            e.target.onerror = null;
                            e.target.src = defaultCarImage;
                          }}
                        />
                      ) : (
                        <div className="text-gray-300 text-center">
                          <svg
                            className="w-16 h-16 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          <span className="text-sm">No Image Available</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 text-center">
                        {variant.name}
                      </h3>
                      {variant.vehicleInfo?.yearRange && (
                        <p className="text-sm text-gray-500 text-center mt-1">
                          {variant.vehicleInfo.yearRange}
                        </p>
                      )}
                      {variant.vehicleInfo?.keyType && (
                        <p className="text-xs text-gray-400 mt-2 text-center">
                          {variant.vehicleInfo.keyType}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Variant Details */}
        {selectedBrand && selectedModel && selectedVariant && (
          <div className="w-full">
            <VariantDetails
              model={selectedModel.name || ""}
              variant={selectedVariant.name || ""}
              data={{
                ...selectedVariant,
                vehicleInfo: {
                  ...(selectedVariant.vehicleInfo || {}),
                  country: selectedVariant.vehicleInfo?.country || "",
                  series: selectedVariant.vehicleInfo?.series || "",
                  body: selectedVariant.vehicleInfo?.body || "",
                  engine: selectedVariant.vehicleInfo?.engine || "",
                  drive: selectedVariant.vehicleInfo?.drive || "",
                  dateRange: selectedVariant.vehicleInfo?.dateRange || "",
                  keyType: selectedVariant.vehicleInfo?.keyType || "",
                  silcaKeyProfile:
                    selectedVariant.vehicleInfo?.silcaKeyProfile || "",
                  transponderChip: Array.isArray(
                    selectedVariant.vehicleInfo?.transponderChip
                  )
                    ? selectedVariant.vehicleInfo.transponderChip
                    : [],
                  remoteFrequency:
                    selectedVariant.vehicleInfo?.remoteFrequency || "",
                  KingParts: Array.isArray(
                    selectedVariant.vehicleInfo?.KingParts
                  )
                    ? selectedVariant.vehicleInfo.KingParts
                    : [],
                  Lishi: selectedVariant.vehicleInfo?.Lishi || "",
                  LishiLink: selectedVariant.vehicleInfo?.LishiLink || "",
                },
                images: {
                  car: selectedVariant.images?.car || "",
                  key: selectedVariant.images?.key || "/images/key1.png",
                },
                emergencyStart: selectedVariant.emergencyStart || "",
                obdPortLocation: selectedVariant.obdPortLocation || "",
              }}
              onBack={handleBackToVariants}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default VehicleSelection;
