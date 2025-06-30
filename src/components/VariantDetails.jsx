// src/components/VariantDetails.jsx
import React, { useState } from "react";
import { variantData } from "../variantData";

// Helper for badge rendering
function renderValue(val) {
  if (Array.isArray(val)) {
    return (
      <div className="flex flex-wrap gap-2">
        {val.map((item) => (
          <span
            key={item}
            className="inline-flex items-center px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }
  if (val === "No Data" || val === "Not Applicable") {
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-bold rounded-full bg-gray-200 text-gray-500">
        {val}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
      {val}
    </span>
  );
}

export default function VariantDetails({
  model = "Giulia",
  variant = "2016-2018",
  data,
  onBack,
}) {
  // State for customer comments
  const [customerComment, setCustomerComment] = useState("");
  const [comments, setComments] = useState([]);

  // Use data from props if provided, otherwise use variantData
  const info =
    data?.vehicleInfo || variantData?.[model]?.[variant]?.vehicleInfo || {};
  const programming = data?.programmingInfo || [
    { feature: "Remote Series", value: ["KD", "XH", "OEM"] },
    { feature: "Blade", value: "TKG" },
    { feature: "Cloning Option", value: "No Data" },
    { feature: "All Keys Lost", value: ["Autel", "Lonsdor"] },
    { feature: "Add Spare Key", value: ["Autel", "Lonsdor"] },
    { feature: "Add Remote", value: ["Autel", "Lonsdor"] },
    { feature: "Pin Required", value: ["Autel", "Lonsdor"] },
    { feature: "Pin Reading", value: "No Data" },
  ];
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
                <div>
                  <b> Transponder:</b> {info.silcaTransponder}
                </div>
                <div>
                  <b>Remote Frequency:</b> {info.transponderChip}
                </div>
                <div>
                  <b>Remote King Parts:</b> {info.KingParts?.join(", ")}
                </div>
                <div>
                  <b>Lishi:</b> {info.Lishi}
                </div>
                {/* <div>
                  <b>RWS/Smart Aerial Plus:</b>{" "}
                  {info.rwsSmartAerialPlus ? "Yes" : "No"}
                </div>
                <div>
                  <b>RWA Plus M-Box:</b> {info.rwaPlusMBox ? "Yes" : "No"}
                </div> */}
              </div>
            </div>
          </div>
          {/* Right: Programming Info, Emergency, Comments */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-6">
              <h3 className="font-semibold text-blue-700 mb-4 text-lg">
                Programming Information
              </h3>
              <div className="space-y-2">
                {[
                  { feature: "Remote Options", value: ["KD", "XH", "OEM"] },
                  { feature: "Blade Supplier", value: "KD" },
                  { feature: "Cloning Options", value: "No Data" },
                  { feature: "All Keys Lost", value: ["Autel", "Lonsdor"] },
                  { feature: "Add Spare Key", value: ["Autel", "Lonsdor"] },
                  { feature: "Add Remote", value: ["Autel", "Lonsdor"] },
                  { feature: "Pin Required", value: ["Autel", "Lonsdor"] },
                  { feature: "Pin Reading", value: "No Data" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center bg-[#f6f8fc] rounded-lg px-4 py-2"
                  >
                    <div className="w-full sm:w-48 font-medium text-gray-700">
                      {item.feature}
                    </div>
                    <div className="flex-1 mt-2 sm:mt-0">
                      {renderValue(item.value)}
                    </div>
                  </div>
                ))}
              </div>
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
            <div className="bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                Comments from Customer
              </h3>
              {/* Display comments */}
              <div className="space-y-2 mb-4">
                {/* {comments.map((comment, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-blue-50 rounded px-3 py-1"
                  >
                    <span className="inline-block bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 mr-2">
                      Customer
                    </span>
                    <span className="text-gray-800 text-sm">{comment}</span>
                  </div>
                ))} */}
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
                  className="bg-blue-600 text-Black px-4 py-2 rounded-lg font-semibold hover:bg-black-700 transition"
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
