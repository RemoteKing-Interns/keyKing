import React, { useState } from "react";

// Helper for badge rendering with color and clickable image functionality
function renderBrandBadge(brand, color, image = null, onImageClick = null) {
  // If image is provided, make the badge clickable
  const badge = (
    <span
      className="inline-flex items-center px-2 py-1 text-xs font-bold rounded-full"
      style={{
        background: color,
        color: "#fff",
        cursor: image ? "pointer" : "default",
      }}
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

export default function VariantDetails({ model, variant, data, onBack }) {
  const [customerComment, setCustomerComment] = useState("");
  const [comments, setComments] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isTextDropdownOpen, setIsTextDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

  // Destructure data from MongoDB structure with default values
  const {
    name = variant || "Unknown Variant",
    vehicleInfo = {},
    keyBladeProfiles = { KD: {}, JMA: {}, Silica: {} },
    programmingInfo = {},
    pathways = [],
    tools = [],
    resources = { videos: [] },
    images = {},
    emergencyStart = "Not available",
    obdPortLocation = "Not available",
  } = data || {};

  // --- Unique Brands Calculation ---
  // Collect all unique 'name' values from all arrays in programmingInfo
  const programmingArrays = [
    programmingInfo.remoteOptions,
    programmingInfo.keyBladeOptions,
    programmingInfo.cloningOptions,
    programmingInfo.allKeysLost,
    programmingInfo.addSpareKey,
    programmingInfo.remoteProgramming,
    programmingInfo.pinRequired,
    programmingInfo.pinReading,
  ];
  const uniqueBrandsSet = new Set();
  programmingArrays.forEach((arr) => {
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        if (item && item.name) uniqueBrandsSet.add(item.name);
      });
    }
  });
  const uniqueBrands = Array.from(uniqueBrandsSet);
  const filteredBrands = uniqueBrands.filter((b) => b && b !== "NA");
  // --- End Unique Brands Calculation ---

  // --- Programming Info Rows Aggregation ---
  // Each array in programmingInfo is a feature group, e.g. remoteOptions, keyBladeOptions, etc.
  // We want to show a row per feature (group), with all brands for that group as badges, and filter by selectedBrand if set.
  const programmingFeatureMap = [
    { key: "remoteOptions", label: "Remote Options" },
    { key: "keyBladeOptions", label: "Key Blade Options" },
    { key: "cloningOptions", label: "Cloning" },
    { key: "allKeysLost", label: "All Keys Lost" },
    { key: "addSpareKey", label: "Add Spare Key" },
    { key: "remoteProgramming", label: "Remote Programming" },
    { key: "pinRequired", label: "PIN Required" },
    { key: "pinReading", label: "PIN Reading" },
  ];

  const allRows = programmingFeatureMap.map(({ key, label }) => {
    const arr = programmingInfo[key] || [];
    // Build value (brands), colors, images, models per brand
    const value = arr.map((item) => item.name);
    const colors = {};
    const images = {};
    const models = {};
    arr.forEach((item) => {
      if (item && item.name) {
        colors[item.name] = item.Color || "#2563eb";
        if (item.image) images[item.name] = item.image;
        if (item.models) models[item.name] = item.models;
      }
    });
    return { feature: label, value, colors, images, models };
  });

  // Filter rows: if selectedBrand, only include rows where that brand is present
  const filteredRows = selectedBrand
    ? allRows.filter((row) => row.value.includes(selectedBrand))
    : allRows.filter((row) => row.value.length > 0);
  // --- End Programming Info Rows Aggregation ---

  // Handle comment submission
  const handleAddComment = (e) => {
    e.preventDefault();
    const trimmed = customerComment.trim();
    if (trimmed) {
      setComments([trimmed, ...comments]);
      setCustomerComment("");
    }
  };

  // Format Lishi (supports string or array) with matching links
  const formatLishi = () => {
    const label = vehicleInfo.Lishi ?? vehicleInfo.lishi;
    const link = vehicleInfo.LishiLink ?? vehicleInfo.lishiLink;
    if (!label) return null;

    const labels = Array.isArray(label) ? label : [label];
    const links = Array.isArray(link) ? link : [link];

    return labels.map((item, idx) => (
      <React.Fragment key={`${item}-${idx}`}>
        {links[idx] ? (
          <a
            href={links[idx]}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item}
          </a>
        ) : (
          item
        )}
        {idx < labels.length - 1 && ", "}
      </React.Fragment>
    ));
  };

  // Format transponder chips for display
  const formatTransponderChips = () => {
    if (
      !vehicleInfo.transponderChip ||
      !Array.isArray(vehicleInfo.transponderChip)
    ) {
      return "Not available";
    }

    return vehicleInfo.transponderChip.map((chip, idx) => (
      <React.Fragment key={chip}>
        {vehicleInfo.transponderChipLinks?.[idx] ? (
          <a
            href={vehicleInfo.transponderChipLinks[idx]}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {chip}
          </a>
        ) : (
          chip
        )}
        {idx < vehicleInfo.transponderChip.length - 1 && ", "}
      </React.Fragment>
    ));
  };

  return (
    <>
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
            {name}
          </h2>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left Column: Car image, Vehicle Info */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Car and Key Images */}
              <div className="order-1 bg-white border-2 border-black rounded-xl shadow p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <img
                    src={images.car || "/images/placeholder-car.png"}
                    alt={vehicleInfo.make + " " + vehicleInfo.model || "Car"}
                    className="w-full sm:w-auto max-w-xs sm:max-w-sm lg:max-w-md object-contain rounded"
                    style={{ minHeight: 150, maxHeight: 380 }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder-car.png";
                    }}
                  />
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="order-2 bg-white border-2 border-black rounded-xl shadow p-4 sm:p-6">
                <h3 className="font-semibold text-blue-700 mb-3 sm:mb-4 text-lg">
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 gap-x-4 sm:gap-x-8 gap-y-2 text-gray-800 text-sm sm:text-base">
                  {vehicleInfo.make && (
                    <div>
                      <strong>Make:</strong> {vehicleInfo.make}
                    </div>
                  )}
                  {vehicleInfo.model && (
                    <div>
                      <strong>Model:</strong> {vehicleInfo.model}
                    </div>
                  )}
                  {vehicleInfo.series && (
                    <div>
                      <strong>Series:</strong> {vehicleInfo.series}
                    </div>
                  )}
                  {vehicleInfo.yearRange && (
                    <div>
                      <strong>Year Range:</strong> {vehicleInfo.yearRange}
                    </div>
                  )}
                  {vehicleInfo.keyType && (
                    <div>
                      <strong>Key Type:</strong> {vehicleInfo.keyType}
                    </div>
                  )}

                  {/* Key Blade Profiles */}
                  <div>
                    <strong>Key Blade Profile:</strong>
                    <ol className="ml-4 sm:ml-7 list-disc text-black mt-1">
                      {keyBladeProfiles.KD?.refNo &&
                        keyBladeProfiles.KD.refNo !== "NA" && (
                          <li>
                            KD:{" "}
                            <a
                              href={keyBladeProfiles.KD.link}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {keyBladeProfiles.KD.refNo}
                            </a>
                          </li>
                        )}
                      {keyBladeProfiles.JMA?.refNo &&
                        keyBladeProfiles.JMA.refNo !== "NA" && (
                          <li>
                            JMA:{" "}
                            <a
                              href={keyBladeProfiles.JMA.link}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {keyBladeProfiles.JMA.refNo}
                            </a>
                          </li>
                        )}
                      {keyBladeProfiles.Silica?.refNo &&
                        keyBladeProfiles.Silica.refNo !== "NA" && (
                          <li>
                            Silica:{" "}
                            <a
                              href={keyBladeProfiles.Silica.link}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {keyBladeProfiles.Silica.refNo}
                            </a>
                          </li>
                        )}
                    </ol>
                  </div>

                  {/* Transponder Chip */}
                  <div>
                    <strong>Transponder Chip:</strong>{" "}
                    {formatTransponderChips()}
                  </div>

                  {vehicleInfo.remoteFrequency && (
                    <div>
                      <strong>Remote Frequency:</strong>{" "}
                      {vehicleInfo.remoteFrequency}
                    </div>
                  )}

                  {/* Remote King Parts */}
                  {vehicleInfo.KingParts &&
                    vehicleInfo.KingParts.length > 0 && (
                      <div>
                        <strong>Remote King Parts:</strong>{" "}
                        {vehicleInfo.KingParts.map((part, idx) => (
                          <React.Fragment key={part}>
                            <a
                              href={vehicleInfo.KingPartsLinks?.[idx] || "#"}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {part}
                            </a>
                            {idx < vehicleInfo.KingParts.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                  {/* Lishi */}
                  {(vehicleInfo.Lishi || vehicleInfo.lishi) && (
                    <div>
                      <strong>Lishi:</strong>{" "}
                      {formatLishi()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Programming Info, Pathways, Resources, Comments */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Programming Information */}
              <div className="order-3 xl:order-1 bg-white border-2 border-black rounded-xl shadow p-4 sm:p-6">
                <h3 className="font-semibold text-blue-700 mb-3 sm:mb-4 text-lg">
                  Programming Information
                </h3>
                <div className="mb-4 flex justify-end">
                  <select
                    className="border border-gray-300 rounded px-2 py-1 text-black text-sm w-full sm:w-auto max-w-xs"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    {filteredBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Programming Rows */}
                <div className="space-y-2">
                  {filteredRows.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center bg-gray-50 rounded-lg px-3 sm:px-4 py-2"
                    >
                      <div className="w-full sm:w-40 lg:w-48 font-semibold text-gray-700 text-sm sm:text-base mb-2 sm:mb-0">
                        {item.feature}:
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
                                  brand === "NA" ? "NOT APPLICABLE" : brand,
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

              {/* Pathways Section */}
              <div className="order-4 xl:order-2 bg-white border-2 border-black rounded-xl shadow p-4 sm:p-6">
                <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                  Pathways
                </h3>
                <div className="space-y-2">
                  {pathways.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center bg-gray-50 rounded p-3"
                    >
                      <span className="font-semibold text-gray-700 w-full sm:w-32 mb-1 sm:mb-0">
                        {p.name}:
                      </span>
                      <div className="flex-1">
                        <span className="ml-0 sm:ml-2 text-sm text-gray-800 break-all sm:break-normal">
                          {p.path}
                        </span>
                        {p.notes && (
                          <div className="text-xs text-gray-600 mt-1 ml-0 sm:ml-2">
                            Note: {p.notes}
                          </div>
                        )}
                        {p.version && (
                          <div className="text-xs text-blue-600 mt-1 ml-0 sm:ml-2">
                            Version: {p.version}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources Section */}
              <div className="order-5 xl:order-3 bg-white border-2 border-black rounded-xl shadow p-4 sm:p-6">
                <button
                  onClick={() =>
                    setIsResourcesDropdownOpen(!isResourcesDropdownOpen)
                  }
                  className="font-semibold text-blue-700 flex items-center gap-1 text-lg w-full justify-between"
                >
                  <span>Resources & Information</span>
                  <span
                    className={`transform transition-transform ${
                      isResourcesDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isResourcesDropdownOpen && (
                  <div className="mt-4 space-y-6">
                    {/* Emergency Start & OBD Port - Quick Reference */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-yellow-800 mb-3 text-base">
                        🚨 Quick Reference Guide
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <h5 className="font-semibold text-yellow-700 text-sm mb-1">
                            Emergency Start:
                          </h5>
                          <p className="text-yellow-800 text-sm leading-relaxed">
                            {emergencyStart}
                          </p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-yellow-700 text-sm mb-1">
                            OBD Port Location:
                          </h5>
                          <p className="text-yellow-800 text-sm leading-relaxed">
                            {obdPortLocation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Videos */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        🎥 Training Videos
                      </h4>
                      <div className="ml-0 sm:ml-4 space-y-3">
                        {resources.videos && resources.videos.length > 0 ? (
                          resources.videos.map((video, idx) => (
                            <div key={idx}>
                              <h5 className="text-sm font-medium text-gray-800 mb-1">
                                {video.title}
                              </h5>
                              <div className="w-full max-w-sm">
                                <iframe
                                  width="100%"
                                  height="157"
                                  src={`https://www.youtube.com/embed/${video.embedId}`}
                                  title={video.title}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="rounded border w-full max-w-xs sm:max-w-sm"
                                ></iframe>
                              </div>
                            </div>
                          ))
                        ) : (
                          <>
                            <div>
                              <h5 className="text-sm font-medium text-gray-800 mb-1">
                                How to Program Car Keys (YouTube)
                              </h5>
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
                                ></iframe>
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-800 mb-1">
                                OBD Port Location Guide (YouTube)
                              </h5>
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
                                ></iframe>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Reference Photos */}
                    {images.referencePhotos &&
                      images.referencePhotos.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            📸 Reference Photos
                          </h4>
                          <div className="ml-0 sm:ml-4 flex flex-wrap gap-2">
                            {images.referencePhotos.map((photo, idx) => (
                              <img
                                key={idx}
                                src={photo.src || photo}
                                alt={photo.alt || `Reference ${idx + 1}`}
                                className="rounded border w-20 sm:w-24 cursor-pointer transition-transform duration-200 hover:scale-105 shadow-sm"
                                onClick={() => setExpandedImage(photo)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Additional Information Dropdown */}
                    <div>
                      <button
                        onClick={() =>
                          setIsTextDropdownOpen(!isTextDropdownOpen)
                        }
                        className="font-semibold text-gray-700 flex items-center gap-1 text-sm sm:text-base"
                      >
                        <span>💡 Additional Tips & Information</span>
                        <span
                          className={`transform transition-transform ${
                            isTextDropdownOpen ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                      {isTextDropdownOpen && (
                        <div className="mt-2 text-gray-800 text-sm space-y-3 bg-gray-50 p-4 rounded border">
                          <div>
                            <h6 className="font-semibold text-gray-700 mb-1">
                              🔑 Key Programming Tips:
                            </h6>
                            <p>
                              For BMW vehicles, ensure all existing keys are
                              present during programming. The vehicle may
                              require a security code which can be obtained from
                              the dealer or calculated using specialized
                              software.
                            </p>
                          </div>
                          <div>
                            <h6 className="font-semibold text-gray-700 mb-1">
                              🔌 OBD Connection Guide:
                            </h6>
                            <p>
                              {obdPortLocation ||
                                "The OBD port is typically located under the dashboard. Ensure the ignition is ON but engine is not running before connecting diagnostic tools."}
                            </p>
                          </div>
                          <div>
                            <h6 className="font-semibold text-gray-700 mb-1">
                              🚗 Emergency Start Procedure:
                            </h6>
                            <p>
                              {emergencyStart ||
                                "Refer to vehicle manual for emergency start procedures."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Comments Section */}
              <div className="order-6 xl:order-4 bg-white border-2 border-black rounded-xl shadow p-4 sm:p-6">
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
                      <span className="text-gray-800 text-sm break-words">
                        {comment}
                      </span>
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
              src={expandedImage.src || expandedImage}
              alt={expandedImage.alt || "Expanded view"}
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
    </>
  );
}
