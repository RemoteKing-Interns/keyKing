import React, { useState } from "react";
import { variantData } from "../variantData";

// Helper for badge rendering with color and clickable image functionality
function renderBrandBadge(brand, color, image = null, onImageClick = null) {
  // If image is provided, make the badge clickable
  const badge = (
    <span
      className="inline-flex items-center px-2 py-1 text-xs font-bold rounded-full"
      style={{ background: color, color: "#fff", cursor: image ? "pointer" : "default" }}
      onClick={image && onImageClick ? () => onImageClick(image) : undefined}
      title={image ? `Click to view ${brand} image` : undefined}
    >
      {brand}
    </span>
  );
  return (
    <span key={brand} className="inline-flex items-center mr-2">
      {badge}
    </span>
  );
}

// Example programmingRows with models, colors, and images
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
    // images: {
    //   KD: { src: "public/images/kd-tool.png", alt: "KD Remote" },
    //   // You can add images for XH and OEM here if you want
    //    XH: { src: "public/images/xh-tool.png", alt: "XH Remote" },
    //    OEM: { src: "public/images/OEM-remote.png", alt: "OEM Remote" },
    // },
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
  const [isTextDropdownOpen, setIsTextDropdownOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

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
                <div>
                  <b>Transponder Chip:</b>{" "}
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
                  <b>Remote King Parts:</b>{" "}
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
                  <b>Lishi:</b>{" "}
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
                  <option value="">Select Brand</option>
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
                            item.colors[selectedBrand],
                            item.images?.[selectedBrand],
                            setExpandedImage
                          )
                        : item.value.map((brand) =>
                            renderBrandBadge(
                              brand,
                              item.colors[brand],
                              item.images?.[brand],
                              setExpandedImage
                            )
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
          </div>
          {/* Right: Emergency, Pathways, Resources, Comments */}
          <div className="flex flex-col gap-6">
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
            {/* Resources Section */}
            <div className="bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                Resources
              </h3>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 w-20">
                  Videos:
                </span>
                <div className="ml-4 space-y-3 mt-2">
                  {/* YouTube Videos */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-1">
                      How to Program Car Keys (YouTube)
                    </h4>
                    <iframe
                      width="280"
                      height="157"
                      src="https://www.youtube.com/embed/towNfsz6QOc"
                      title="How to Program Car Keys"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded border"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    ></iframe>
                    <div style={{ display: "none" }} className="text-blue-700">
                      <a
                        href="https://youtu.be/towNfsz6QOc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Watch: How to Program Car Keys
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-1">
                      OBD Port Location Guide (YouTube)
                    </h4>
                    <iframe
                      width="280"
                      height="157"
                      src="https://www.youtube.com/embed/SxPRZEGMqpM"
                      title="OBD Port Location"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded border"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    ></iframe>
                    <div style={{ display: "none" }} className="text-blue-700">
                      <a
                        href="https://youtu.be/SxPRZEGMqpM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Watch: OBD Port Location Guide
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 w-20">
                  Documents:
                </span>
                <ul className="ml-4 list-disc text-blue-700">
                  <li>
                    <a
                      href="https://example.com/giulia-programming-guide.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Giulia Programming Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://example.com/giulia-key-specs.docx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Key Specs Document
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-800">Programming User Guides:</span>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>
                        <a
                          href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Autel Maxim KM100
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Maxim 1M508S
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Xhorse VVDI Key Tool
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Lonsdor K518 Pro
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 w-20">
                  Photos:
                </span>
                <div className="ml-4 flex gap-2">
                  {[
                    { src: "public/images/Giulia.png", alt: "Car" },
                    { src: "public/images/Key1.png", alt: "Remote" },
                    { src: "public/images/obd.jpg", alt: "OBD Port" },
                  ].map((img) => (
                    <img
                      key={img.alt}
                      src={img.src}
                      alt={img.alt}
                      className="rounded border w-24 cursor-pointer transition-transform duration-200 hover:scale-105"
                      onClick={() => setExpandedImage(img)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="ml-4">
                  <button
                    onClick={() => setIsTextDropdownOpen(!isTextDropdownOpen)}
                    className="font-semibold text-gray-700 flex items-center gap-1"
                  >
                    <span>Additional Information</span>
                    <span
                      className={`transform transition-transform ${
                        isTextDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {isTextDropdownOpen && (
                    <div className="mt-2 text-gray-800 text-sm space-y-2 bg-gray-50 p-3 rounded border">
                      <p>
                        "Insert the remote near the gear lever and press the
                        button once when prompted. If the vehicle does not
                        recognize the remote, ensure the battery is not depleted
                        and try again. In some cases, holding the remote closer
                        to the start button may help establish a connection.
                        Always keep a spare battery for the remote in your glove
                        compartment to avoid unexpected issues during
                        emergencies or long trips."
                      </p>
                      <p>
                        "The OBD port is located under the dashboard, near the
                        pedals. For easier access, move the driver's seat back
                        fully and use a flashlight to locate the port. Before
                        connecting any diagnostic or programming tool, ensure
                        the ignition is in the ON position but the engine is not
                        running. Avoid using excessive force when plugging in
                        the OBD connector, as this may damage the port or the
                        tool. If you encounter resistance, double-check the
                        alignment and try again gently."
                      </p>
                      <p>
                        "For emergency start, ensure the vehicle is in park mode
                        and the brake pedal is pressed. The emergency key blade
                        can be found inside the remote housing. To access it,
                        slide the release button on the back of the remote and
                        pull out the blade. Insert the blade into the key slot,
                        usually hidden behind a small cover near the steering
                        column or gear lever. After starting the vehicle,
                        remember to return the emergency blade to the remote to
                        prevent loss. If the vehicle fails to start, consult the
                        owner's manual or contact roadside assistance for
                        further instructions."
                      </p>
                    </div>
                  )}
                </div>
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

      {/* Image Expansion Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setExpandedImage(null)}
          style={{ cursor: "zoom-out" }}
        >
          <img
            src={expandedImage.src}
            alt={expandedImage.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg border-4 border-white"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold"
            onClick={() => setExpandedImage(null)}
            aria-label="Close"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}