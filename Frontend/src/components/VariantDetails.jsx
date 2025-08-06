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

  // Destructure data from props with default values to prevent errors
  const {
    vehicleInfo: info = {},
    keyBladeProfiles = { KD: {}, JMA: {}, Silica: {} },
    programmingInfo = {},
    pathways = [],
    tools = [],
    resources = { videos: [] },
    images = {},
    emergencyStart = "Not available",
    obdPortLocation = "Not available",
  } = data || {};

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
            {variant}
          </h2>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left Column: Car image, Vehicle Info */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Car and Key Images */}
              <div className="order-1 bg-white border-2 border-black rounded-xl shadow p-4 sm:p-6">
                <div className="ml-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <img
                    src={images.car || "/images/placeholder-car.png"}
                    alt={model || "Car"}
                    className=" w-full sm:w-auto max-w-xs sm:max-w-sm lg:max-w-md object-contain rounded"
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
                  <div>
                    <strong>Country:</strong> {info.country}
                  </div>
                  <div>
                    <strong>Series:</strong> {info.series}
                  </div>
                  <div>
                    <strong>Body:</strong> {info.body}
                  </div>
                  <div>
                    <strong>Engine:</strong> {info.engine}
                  </div>
                  <div>
                    <strong>Drive:</strong> {info.drive}
                  </div>
                  <div>
                    <strong>Date Range:</strong> {info.dateRange}
                  </div>
                  <div>
                    <strong>Key Type:</strong> {info.keyType}
                  </div>
                  <div>
                    <strong>Key Blade Profile:</strong>
                    <ol className="ml-4 sm:ml-7 list-disc text-black mt-1">
                      {keyBladeProfiles.KD?.refNo && (
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
                      {keyBladeProfiles.JMA?.refNo && (
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
                      {keyBladeProfiles.Silica?.refNo && (
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
                  <div>
                    <strong>Transponder Chip:</strong> {info.transponderChip}
                  </div>
                  <div>
                    <strong>Remote Frequency:</strong> {info.remoteFrequency}
                  </div>
                  <div>
                    <strong>Remote King Parts:</strong>{" "}
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
                    <strong>Lishi:</strong>{" "}
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
                  <div>
                    <strong>OBD Location:</strong> {info.obdLocation}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Programming Info, Pathways, Resources, Comments */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Programming Information */}
              <div className="order-3 xl:order-1 bg-[#0f172a1a] border-2 border-black rounded-xl shadow p-4 sm:p-6">
                <h3 className="font-semibold text-blue-700 mb-3 sm:mb-4 text-lg">
                  Programming Information
                </h3>

                {/* Filter Dropdown */}
                <div className="mb-4 flex justify-end">
                  {/*
                  // TODO: Brand filter temporarily disabled due to missing uniqueBrands definition. Fix uniqueBrands calculation before re-enabling.
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
                  */}
                </div>

                {/* Programming Rows */}
                {/*
                  TODO: Programming rows temporarily disabled due to missing filteredRows definition. Fix filteredRows calculation before re-enabling.
                  Example block:
                  <div className="space-y-2"> ... </div>
                  <p className="font-semibold text-red-500 text-center mt-4 text-sm">...</p>
                */}
              </div>

              {/* Pathways Section */}
              <div className="order-4 xl:order-2 bg-white border-2 border-black rounded-xl shadow p-4 sm:p-6">
                <h3 className="font-semibold text-blue-700 mb-2 text-lg">
                  Pathways
                </h3>
                <div className="space-y-2">
                  {pathways.map((p) => (
                    <div
                      key={p.name}
                      className="flex flex-col sm:flex-row sm:items-center"
                    >
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

              {/* Resources Section - Now includes Emergency Start & OBD Port */}
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
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "block";
                              }}
                            ></iframe>
                            <div
                              style={{ display: "none" }}
                              className="text-blue-700"
                            >
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
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "block";
                              }}
                            ></iframe>
                            <div
                              style={{ display: "none" }}
                              className="text-blue-700"
                            >
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
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        📄 Documentation & Manuals
                      </h4>
                      <ul className="ml-0 sm:ml-4 space-y-2">
                        <li>
                          <a
                            href="https://example.com/giulia-programming-guide.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm hover:text-blue-800"
                          >
                            📋 Giulia Programming Guide
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://example.com/giulia-key-specs.docx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm hover:text-blue-800"
                          >
                            📊 Key Specs Document
                          </a>
                        </li>
                        <li>
                          <div className="text-gray-800 text-sm font-medium mb-1">
                            🔧 Programming Tool Manuals:
                          </div>
                          <ul className="ml-4 space-y-1">
                            <li>
                              <a
                                href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm hover:text-blue-800"
                              >
                                • Autel Maxim KM100
                              </a>
                            </li>
                            <li>
                              <a
                                href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm hover:text-blue-800"
                              >
                                • Maxim 1M508S
                              </a>
                            </li>
                            <li>
                              <a
                                href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm hover:text-blue-800"
                              >
                                • Xhorse VVDI Key Tool
                              </a>
                            </li>
                            <li>
                              <a
                                href="http://xdn-product.cdn.lonsdor.com/instructions/K518PRO/9542b9af36571aca5cc1510d031e1f0b.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm hover:text-blue-800"
                              >
                                • Lonsdor K518 Pro
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>

                    {/* Photos */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        📸 Reference Photos
                      </h4>
                      <div className="ml-0 sm:ml-4 flex flex-wrap gap-2">
                        {[
                          { src: "public/images/Giulia.png", alt: "Car" },
                          { src: "public/images/Key1.png", alt: "Remote" },
                          { src: "public/images/obd.jpg", alt: "OBD Port" },
                        ].map((img) => (
                          <img
                            key={img.alt}
                            src={img.src}
                            alt={img.alt}
                            className="rounded border w-20 sm:w-24 cursor-pointer transition-transform duration-200 hover:scale-105 shadow-sm"
                            onClick={() => setExpandedImage(img)}
                          />
                        ))}
                      </div>
                    </div>

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
                              🔑 Remote Battery Tips:
                            </h6>
                            <p>
                              "Insert the remote near the gear lever and press
                              the button once when prompted. If the vehicle does
                              not recognize the remote, ensure the battery is
                              not depleted and try again. In some cases, holding
                              the remote closer to the start button may help
                              establish a connection. Always keep a spare
                              battery for the remote in your glove compartment
                              to avoid unexpected issues during emergencies or
                              long trips."
                            </p>
                          </div>
                          <div>
                            <h6 className="font-semibold text-gray-700 mb-1">
                              🔌 OBD Connection Guide:
                            </h6>
                            <p>
                              "The OBD port is located under the dashboard, near
                              the pedals. For easier access, move the driver's
                              seat back fully and use a flashlight to locate the
                              port. Before connecting any diagnostic or
                              programming tool, ensure the ignition is in the ON
                              position but the engine is not running. Avoid
                              using excessive force when plugging in the OBD
                              connector, as this may damage the port or the
                              tool. If you encounter resistance, double-check
                              the alignment and try again gently."
                            </p>
                          </div>
                          <div>
                            <h6 className="font-semibold text-gray-700 mb-1">
                              🚗 Emergency Start Procedure:
                            </h6>
                            <p>
                              "For emergency start, ensure the vehicle is in
                              park mode and the brake pedal is pressed. The
                              emergency key blade can be found inside the remote
                              housing. To access it, slide the release button on
                              the back of the remote and pull out the blade.
                              Insert the blade into the key slot, usually hidden
                              behind a small cover near the steering column or
                              gear lever. After starting the vehicle, remember
                              to return the emergency blade to the remote to
                              prevent loss. If the vehicle fails to start,
                              consult the owner's manual or contact roadside
                              assistance for further instructions."
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
    </>
  );
}
