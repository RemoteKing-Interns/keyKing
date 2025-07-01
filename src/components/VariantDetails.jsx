import React, { useState } from "react";
import { variantData } from "../variantData";

// Helper for badge rendering with color
function renderBrandBadge(brand, color) {
  return (
    <span
      key={brand}
      className="inline-flex items-center px-2 py-1 text-xs font-bold rounded-full mr-2"
      style={{ background: color, color: "#fff" }}
    >
      {brand}
    </span>
  );
}

// Example programmingRows with models and colors
const programmingRows = [
  {
    feature: "Remote Options",
    value: ["KD", "XH", "OEM"],
    models: {
      KD: ["KD-01", "KD-02"],
      XH: ["XH-01"],
      OEM: ["OEM-01", "OEM-02"],
    },
    colors: {
      KD: "#1e40af",
      XH: "#f59e42",
      OEM: "#10b981",
    },
  },
  {
    feature: "Blade Supplier",
    value: ["KD"],
    models: {
      KD: ["KD-B1"],
    },
    colors: {
      KD: "#1e40af",
    },
  },
  {
    feature: "Cloning Options",
    value: ["Not Applicable"],
    models: {
      "Not Applicable": [],
    },
    colors: {
      "Not Applicable": "#6b7280",
    },
  },
  {
    feature: "All Keys Lost",
    value: ["Autel", "Lonsdor"],
    models: {
      Autel: ["Autel-A1"],
      Lonsdor: ["Lonsdor-L1"],
    },
    colors: {
      Autel: "#f43f5e",
      Lonsdor: "#6366f1",
    },
  },
  {
    feature: "Add Spare Key",
    value: ["Autel", "Lonsdor"],
    models: {
      Autel: ["Autel-S1"],
      Lonsdor: ["Lonsdor-S1"],
    },
    colors: {
      Autel: "#f43f5e",
      Lonsdor: "#6366f1",
    },
  },
  {
    feature: "Add Remote",
    value: ["Autel", "Lonsdor"],
    models: {
      Autel: ["Autel-R1"],
      Lonsdor: ["Lonsdor-R1"],
    },
    colors: {
      Autel: "#f43f5e",
      Lonsdor: "#6366f1",
    },
  },
  {
    feature: "Pin Required",
    value: ["Autel", "Lonsdor"],
    models: {
      Autel: ["Autel-P1"],
      Lonsdor: ["Lonsdor-P1"],
    },
    colors: {
      Autel: "#f43f5e",
      Lonsdor: "#6366f1",
    },
  },
  {
    feature: "Pin Reading",
    value: ["Not Applicable"],
    models: {
      "Not Applicable": [],
    },
    colors: {
      "Not Applicable": "#6b7280",
    },
  },
];

// Example pathways data
const pathways = [
  {
    name: "Autel",
    path: "Alfa Romeo > ALL Remotes > Giulia",
  },
  {
    name: "Xhorse",
    path: "Alfa Romeo > Giulia > Smart Key",
  },
];

// Get all unique brands
function getAllUniqueBrands(rows) {
  const set = new Set();
  rows.forEach((row) => {
    row.value.forEach((v) => set.add(v));
  });
  return Array.from(set);
}

export default function VariantDetails({
  model = "Giulia",
  variant = "2016-2018",
  data,
  onBack,
}) {
  const [customerComment, setCustomerComment] = useState("");
  const [comments, setComments] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  // Use data from props if provided, otherwise use variantData
  const info =
    data?.vehicleInfo || variantData?.[model]?.[variant]?.vehicleInfo || {};
  const emergencyStart =
    data?.emergencyStart ||
    variantData?.[model]?.[variant]?.emergencyStart ||
    "There is an emergency key position in the vehicle for starting when the remote battery is flat. The key is inserted near the gear lever and the remote buttons are pressed once when prompted.";
  const obdPortLocation =
    data?.obdPortLocation ||
    variantData?.[model]?.[variant]?.obdPortLocation ||
    "Under the dashboard, near pedals.";
  const images = data?.images ||
    variantData?.[model]?.[variant]?.images || {
      car: "https://cdn.abacus.ai/images/75623b27-9642-41be-b8d7-74c062b4e41b.png",
    };

  // Handle comment submission
  const handleAddComment = (e) => {
    e.preventDefault();
    const trimmed = customerComment.trim();
    if (trimmed) {
      setComments([trimmed, ...comments]);
      setCustomerComment("");
    }
  };

  // Unique brands for dropdown
  const uniqueBrands = getAllUniqueBrands(programmingRows);

  // Filtered rows: only show rows where value includes selectedBrand
  const filteredRows = selectedBrand
    ? programmingRows.filter((row) => row.value.includes(selectedBrand))
    : programmingRows;

  return (
    <div className="w-full min-h-screen py-8 px-2 md:px-8">
      <div className="flex items-center justify-left mb-8">
        <button
          onClick={onBack}
          className="bg-white text-black font-bold px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors duration-200"
        >
          ← Back to Variants
        </button>
      </div>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black text-center mb-6">
          {model} <span className="font-normal">{variant}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Car image and Vehicle Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-6 flex flex-col items-center">
              <img
                src={images.car}
                alt={model}
                className="w-full max-w-md object-contain rounded"
                style={{ minHeight: 200 }}
              />
            </div>
            <div className="bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-6 flex-1">
              <h3 className="font-semibold text-blue-700 mb-4 text-lg">
                Vehicle Information
              </h3>
              <div className="grid grid-cols-1  gap-x-8 gap-y-2 text-gray-800 text-base">
                <div>
                  <b>Country:</b> {info.country}
                </div>
                <div>
                  <b>Series:</b> {info.series}
                </div>
                <div>
                  <b>Body:</b> {info.body}
                </div>
                <div>
                  <b>Engine:</b> {info.engine}
                </div>
                <div>
                  <b>Drive:</b> {info.drive}
                </div>
                <div>
                  <b>Date Range:</b> {info.dateRange}
                </div>
                <div>
                  <b>Key Type:</b> {info.keyType}
                </div>
                <div>
                  <b> Key Profile:</b> {info.silcaKeyProfile}
                </div>
                {/* <div>
                  <b> Transponder:</b> {info.silcaTransponder}
                </div> */}
                <div>
                  <b>Transponder Chip:</b>
                  {info.transponderChip?.map((chip, idx) => (
                    <React.Fragment key={chip}>
                      <a
                        href={info.transponderChipLinks?.[idx] || "#"}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {chip}
                      </a>
                      {idx < info.transponderChip.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </div>
                <div>
                  <b>Remote Frequency:</b> {info.remoteFrequency}
                </div>
                <div>
                  <b>Remote King Parts:</b>
                  {info.KingParts?.map((part, idx) => (
                    <React.Fragment key={part}>
                      <a
                        href={info.KingPartsLinks?.[idx] || "#"}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {part}
                      </a>
                      {idx < info.KingParts.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </div>
                <div>
                  <b>Lishi:</b>
                  {info.Lishi && (
                    <a
                      href={info.LishiLink || "#"}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {info.Lishi}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Right: Programming Info, Emergency, Pathways, Comments */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-6">
              <h3 className="font-semibold text-blue-700 mb-4 text-lg">
                Programming Information
              </h3>
              {/* Single filter dropdown */}
              <div className="mb-4 flex justify-end">
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-black text-sm"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">All</option>
                  {uniqueBrands.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                {filteredRows.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center bg-[#f6f8fc] rounded-lg px-4 py-2"
                  >
                    <div className="w-full sm:w-48 font-medium text-gray-700">
                      {item.feature}
                    </div>
                    <div className="flex-1 mt-2 sm:mt-0">
                      {/* Only show the selected brand as badge if filtered, else show all */}
                      {selectedBrand
                        ? renderBrandBadge(
                            selectedBrand,
                            item.colors[selectedBrand]
                          )
                        : item.value.map((brand) =>
                            renderBrandBadge(brand, item.colors[brand])
                          )}
                      {/* Show models if filtered and available */}
                      {selectedBrand &&
                        item.models[selectedBrand] &&
                        item.models[selectedBrand].length > 0 && (
                          <div className="mt-2 ml-2">
                            <span className="text-xs text-gray-500">
                              Models:{" "}
                            </span>
                            <span className="text-xs font-semibold text-gray-700">
                              {item.models[selectedBrand].join(", ")}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
                {filteredRows.length === 0 && (
                  <div className="text-gray-500 text-center py-4">
                    No features match the selected brand.
                  </div>
                )}
              </div>
              <p className="font-semibold text-red-500 text-center mt-4">
                <strong>*</strong> Select brand to see supported models
              </p>
            </div>
            <div className="bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                Emergency Start
              </h3>
              <p className="text-gray-700 text-sm">{emergencyStart}</p>
            </div>
            <div className="bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                OBD Port Location
              </h3>
              <p className="text-gray-700 text-sm">{obdPortLocation}</p>
            </div>
            {/* Pathways Section */}
            <div className="bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                Pathways
              </h3>
              <div className="space-y-2">
                {pathways.map((p) => (
                  <div key={p.name} className="flex items-center">
                    <span className="font-semibold text-gray-700 w-20">
                      {p.name}:
                    </span>
                    <span className="ml-2 text-sm text-gray-800">{p.path}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Comments Section */}
            <div className="bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                Comments from Customer
              </h3>
              {/* Display comments */}
              <div className="space-y-2 mb-4">
                {comments.map((comment, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-blue-50 rounded px-3 py-1"
                  >
                    <span className="inline-block bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 mr-2">
                      Customer
                    </span>
                    <span className="text-gray-800 text-sm">{comment}</span>
                  </div>
                ))}
              </div>
              {/* Input box and button */}
              <form
                className="flex items-center gap-2"
                onSubmit={handleAddComment}
                autoComplete="off"
              >
                <input
                  type="text"
                  className="flex-1 border-2 border-gray-300 text-black rounded-lg p-2 text-base focus:outline-none focus:ring-2 focus:ring-black-400"
                  placeholder="Add a comment..."
                  value={customerComment}
                  onChange={(e) => setCustomerComment(e.target.value)}
                  maxLength={200}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-black-700 transition"
                >
                  Enter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
