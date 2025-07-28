import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrands, clearBrands } from "../features/brandsSlice";
import { fetchModels, clearModels } from "../features/modelsSlice";
import BrandCard from "../components/BrandCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VariantDetails from "../components/VariantDetails";

const defaultCarImage = "/images/default-car.png";

const VehicleSelection = () => {
  const dispatch = useDispatch();
  const { items: brands = [], status: brandsStatus } = useSelector(
    (state) => state.brands
  );
  const {
    items: models = [],
    status: modelsStatus,
    error: modelsError,
  } = useSelector((state) => state.models);

  // State declarations at the top
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  // Ensure models is always an array
  const modelItems = Array.isArray(models) ? models : [];

  // Log state changes for debugging
  useEffect(() => {
    console.log("Models state changed:", { models, modelsStatus, modelsError });
  }, [models, modelsStatus, modelsError]);

  // Log when selected brand changes and set up test function
  useEffect(() => {
    if (selectedBrand) {
      console.log("Selected brand:", selectedBrand);
      // Add test function to window for debugging
      window.testModelsEndpoint = async () => {
        try {
          console.log(
            "Testing models endpoint for brand ID:",
            selectedBrand._id
          );
          const url = `${import.meta.env.VITE_API_BASE_URL}/api/models/brand/${
            selectedBrand._id
          }`;
          console.log("Fetching from URL:", url);
          const response = await fetch(url);
          console.log("Response status:", response.status);
          const data = await response.json();
          console.log("Response data:", data);
          
          // Test image URLs if we have data
          if (data?.success && Array.isArray(data.data)) {
            console.log('Testing image URLs...');
            for (const model of data.data) {
              if (model.imageUrl) {
                try {
                  console.log(`Testing image URL: ${model.imageUrl}`);
                  const imgTest = new Image();
                  imgTest.onload = () => console.log(`✅ Image loaded: ${model.imageUrl}`);
                  imgTest.onerror = (e) => console.error(`❌ Failed to load image: ${model.imageUrl}`, e);
                  imgTest.src = model.imageUrl;
                } catch (error) {
                  console.error(`Error testing image URL ${model.imageUrl}:`, error);
                }
              }
            }
          }
          
          return data;
        } catch (error) {
          console.error("Error testing endpoint:", error);
          throw error;
        }
      };
    }
  }, [selectedBrand]);

  // Initialize and clean up
  useEffect(() => {
    console.log("Component mounted - initializing");
    dispatch(fetchBrands());

    return () => {
      console.log("Component unmounting - cleaning up");
      dispatch(clearBrands());
      dispatch(clearModels());
    };
  }, [dispatch]);

  // Log state changes for debugging
  useEffect(() => {
    console.log("Brands in state:", brands);
  }, [brands]);

  useEffect(() => {
    console.log("Models in state:", models);
  }, [models]);

  const handleBrandClick = async (brand) => {
    console.log("Brand selected:", brand);
    setSelectedBrand(brand);
    setSelectedModel(null);

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

  const handleModelClick = (model) => {
    console.log("Model selected:", model);
    setSelectedModel(model);
  };

  const handleBackToBrands = () => {
    console.log("Going back to brands");
    setSelectedBrand(null);
    setSelectedModel(null);
    setShowJson(false);
    dispatch(clearModels());
  };

  // Show loading state
  if (
    brandsStatus === "loading" ||
    (selectedBrand && modelsStatus === "loading")
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#e9ecf2] to-[#d1ddf4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">
            {selectedBrand ? "Loading models..." : "Loading brands..."}
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (brandsStatus === "failed" || modelsStatus === "failed") {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#e9ecf2] to-[#d1ddf4] flex items-center justify-center">
        <div className="text-center p-6 bg-red-100 rounded-lg max-w-md mx-4">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">
            {error || "Failed to load data. Please try again."}
          </p>
          <button
            onClick={() => {
              if (selectedBrand) {
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
        {!selectedBrand ? (
          // Brand Selection
          <>
            <h1 className="text-4xl font-bold mb-12 text-center text-black">
              Select Your Vehicle Brand
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
          </>
        ) : !selectedModel ? (
          // Model Selection
          <>
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

            {modelsStatus === "loading" ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading models...</p>
              </div>
            ) : modelsStatus === "failed" ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">
                  Error loading models: {modelsError || "Unknown error"}
                </p>
                <button
                  onClick={() =>
                    selectedBrand && dispatch(fetchModels(selectedBrand._id))
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mr-2"
                >
                  Retry
                </button>
                <button
                  onClick={handleBackToBrands}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                >
                  Back to Brands
                </button>
              </div>
            ) : modelItems.length === 0 ? (
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
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {modelItems.map((model) => {
                    const modelName = model.name || "Unnamed Model";
                    // Ensure the URL is properly formatted and add cache busting
                    const imageUrl = model.imageUrl 
                      ? `${model.imageUrl}?${new Date().getTime()}` // Cache buster
                      : defaultCarImage;
                    
                    console.log('Model image details:', {
                      modelId: model._id,
                      originalUrl: model.imageUrl,
                      finalUrl: imageUrl,
                      hasImage: !!model.imageUrl
                    });

                    console.log(`Rendering model card: ${modelName}`, {
                      modelId: model._id,
                      imageUrl: model.imageUrl,
                      hasImage: !!model.imageUrl
                    });
                    
                    return (
                      <div
                        key={model._id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200 h-full flex flex-col"
                        onClick={() => handleModelClick(model)}
                      >
                        <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={modelName}
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                console.error(`Error loading image: ${imageUrl}`, e);
                                e.target.onerror = null;
                                e.target.src = defaultCarImage;
                              }}
                              onLoad={() => console.log(`Successfully loaded image: ${imageUrl}`)}
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
                        <div className="p-4 border-t border-gray-100 flex-grow flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 text-center">
                              {modelName}
                            </h3>
                            {model.brandName && (
                              <p className="text-sm text-gray-500 text-center">
                                {model.brandName}
                              </p>
                            )}
                          </div>
                          {model.description && (
                            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                              {model.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          // Variant Selection
          <VariantDetails
            model={selectedModel}
            onBack={() => setSelectedModel(null)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VehicleSelection;
