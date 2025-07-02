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
    images: {
      KD: { src: "public/images/kd-tool.png", alt: "KD Remote" },
      // You can add images for XH and OEM here if you want
      // XH: { src: "public/images/xh-tool.png", alt: "XH Remote" },
      // OEM: { src: "public/images/OEM-remote.png", alt: "OEM Remote" },
    },
  },
  {
    feature: "Key Blade Options",
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
    <div className="w-full min-h-screen py-4 sm:py-6 lg:py-8 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Back Button */}
      <div className="flex items-center justify-start mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="bg-white text-black font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
        >
          ← Back to Variants
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-4 sm:mb-6 px-2">
          {model} <span className="font-normal">{variant}</span>
        </h2>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Column: Car image, Vehicle Info, Resources */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Car and Key Images */}
            <div className="order-1 bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-4 sm:p-6">
              <div className="ml-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <img
                  src={images.car}
                  alt={model}
                  className="pr-5 w-full sm:w-auto max-w-xs sm:max-w-sm lg:max-w-md object-contain rounded"
                  style={{ minHeight: 150, maxHeight: 250 }}
                />
                <img
                  src="public/images/key1.png"
                  alt="Key"
                  className="-ml-20 w-full sm:w-auto max-w-xs sm:max-w-sm object-contain rounded"
                  style={{ minHeight: 150, maxHeight: 200 }}
                />
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="order-2 bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-4 sm:p-6">
              <h3 className="font-semibold text-blue-700 mb-3 sm:mb-4 text-lg">
                Vehicle Information
              </h3>
              <div className="grid grid-cols-1 gap-x-4 sm:gap-x-8 gap-y-2 text-gray-800 text-sm sm:text-base">
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
                  <b>Key Blade Profile:</b> {info.silcaKeyProfile}
                  <ol className="ml-4 sm:ml-7 list-disc text-black mt-1">
                    <li>KD: <a href="#" className="text-blue-600 underline">ref no</a></li>
                    <li>JMA: <a href="#" className="text-blue-600 underline">ref no</a></li>
                    <li>Silica: <a href="#" className="text-blue-600 underline">ref no</a></li>
                  </ol>
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

            {/* Resources Section */}
            <div className="order-6 xl:order-3 bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-4 sm:p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                Resources
              </h3>
              
              {/* Videos */}
              <div className="mb-4">
                <span className="font-semibold text-gray-700">Videos:</span>
                <div className="ml-0 sm:ml-4 space-y-3 mt-2">
                  {/* YouTube Videos */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-1">
                      How to Program Car Keys (YouTube)
                    </h4>
                    <div className="w-full max-w-sm">
                      <iframe
                        width="100%"
                        height="157"
                        src="https://www.youtube.com/embed/towNfsz6QOc"
                        title="How to Program Car Keys"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded border w-full max-w-xs sm:max-w-sm"
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
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-1">
                      OBD Port Location Guide (YouTube)
                    </h4>
                    <div className="w-full max-w-sm">
                      <iframe
                        width="100%"
                        height="157"
                        src="https://www.youtube.com/embed/SxPRZEGMqpM"
                        title="OBD Port Location"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded border w-full max-w-xs sm:max-w-sm"
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
              </div>

              {/* Documents */}
              <div className="mb-4">
                <span className="font-semibold text-gray-700">Documents:</span>
                <ul className="ml-0 sm:ml-4 list-disc text-blue-700 mt-1 space-y-1">
                  <li>
                    <a
                      href="https://example.com/giulia-programming-guide.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-sm"
                    >
                      Giulia Programming Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://example.com/giulia-key-specs.docx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-sm"
                    >
                      Key Specs Document
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-800 text-sm">Programming User Guides:</span>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>
                        <a
                          href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-sm"
                        >
                          Autel Maxim KM100
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-sm"
                        >
                          Maxim 1M508S
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-sm"
                        >
                          Xhorse VVDI Key Tool
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-sm"
                        >
                          Lonsdor K518 Pro
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Photos */}
              <div className="mb-4">
                <span className="font-semibold text-gray-700">Photos:</span>
                <div className="ml-0 sm:ml-4 flex flex-wrap gap-2 mt-2">
                  {[
                    { src: "public/images/Giulia.png", alt: "Car" },
                    { src: "public/images/Key1.png", alt: "Remote" },
                    { src: "public/images/obd.jpg", alt: "OBD Port" },
                  ].map((img) => (
                    <img
                      key={img.alt}
                      src={img.src}
                      alt={img.alt}
                      className="rounded border w-20 sm:w-24 cursor-pointer transition-transform duration-200 hover:scale-105"
                      onClick={() => setExpandedImage(img)}
                    />
                  ))}
                </div>
              </div>

              {/* Additional Information Dropdown */}
              <div>
                <div className="ml-0 sm:ml-4">
                  <button
                    onClick={() => setIsTextDropdownOpen(!isTextDropdownOpen)}
                    className="font-semibold text-gray-700 flex items-center gap-1 text-sm sm:text-base"
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
          </div>

          {/* Right Column: Programming Info, Emergency, Pathways, Comments */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Programming Information */}
            <div className="order-3 xl:order-1 bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-4 sm:p-6">
              <h3 className="font-semibold text-blue-700 mb-3 sm:mb-4 text-lg">
                Programming Information
              </h3>
              
              {/* Filter Dropdown */}
              <div className="mb-4 flex justify-end">
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-black text-sm w-full sm:w-auto max-w-xs"
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

              {/* Programming Rows */}
              <div className="space-y-2">
                {filteredRows.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center bg-[#f6f8fc] rounded-lg px-3 sm:px-4 py-2"
                  >
                    <div className="w-full sm:w-40 lg:w-48 font-medium text-gray-700 text-sm sm:text-base mb-2 sm:mb-0">
                      {item.feature}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
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
                      </div>
                      {/* Show models if filtered and available */}
                      {selectedBrand &&
                        item.models[selectedBrand] &&
                        item.models[selectedBrand].length > 0 && (
                          <div className="mt-2 ml-0 sm:ml-2">
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
                  <div className="text-gray-500 text-center py-4 text-sm">
                    No features match the selected brand.
                  </div>
                )}
              </div>
              <p className="font-semibold text-red-500 text-center mt-4 text-sm">
                <strong>*</strong> Select brand to see supported models
              </p>
            </div>

            {/* Emergency Start */}
            <div className="order-4 xl:order-2 bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-4 sm:p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                Emergency Start
              </h3>
              <p className="text-gray-700 text-sm">{emergencyStart}</p>
            </div>

            {/* OBD Port Location */}
            <div className="order-5 xl:order-3 bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-4 sm:p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                OBD Port Location
              </h3>
              <p className="text-gray-700 text-sm">{obdPortLocation}</p>
            </div>

            {/* Pathways Section */}
            <div className="order-7 xl:order-4 bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-4 sm:p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                Pathways
              </h3>
              <div className="space-y-2">
                {pathways.map((p) => (
                  <div key={p.name} className="flex flex-col sm:flex-row sm:items-center">
                    <span className="font-semibold text-gray-700 w-full sm:w-20 mb-1 sm:mb-0">
                      {p.name}:
                    </span>
                    <span className="ml-0 sm:ml-2 text-sm text-gray-800 break-all sm:break-normal">
                      {p.path}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="order-8 xl:order-5 bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-4 sm:p-6">
              <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                Comments from Customer
              </h3>
              
              {/* Display comments */}
              <div className="space-y-2 mb-4">
                {comments.map((comment, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-blue-50 rounded px-3 py-2"
                  >
                    <span className="inline-block bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 flex-shrink-0">
                      Customer
                    </span>
                    <span className="text-gray-800 text-sm break-words">{comment}</span>
                  </div>
                ))}
              </div>
              
              {/* Input box and button */}
              <form
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                onSubmit={handleAddComment}
                autoComplete="off"
              >
                <input
                  type="text"
                  className="flex-1 border-2 border-gray-300 text-black rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Add a comment..."
                  value={customerComment}
                  onChange={(e) => setCustomerComment(e.target.value)}
                  maxLength={200}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setExpandedImage(null)}
          style={{ cursor: "zoom-out" }}
        >
          <img
            src={expandedImage.src}
            alt={expandedImage.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg border-4 border-white object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-8 text-white text-2xl sm:text-3xl font-bold bg-black bg-opacity-50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            onClick={() => setExpandedImage(null)}
            aria-label="Close"
            style={{ cursor: "pointer" }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}