import React, { useState } from 'react';
import PropTypes from 'prop-types';

const VariantDetails = ({ model = "", variant = "", data = {}, onBack }) => {
  // Destructure data with defaults
  const {
    vehicleInfo = {},
    keyBladeProfiles = {},
    images = {},
    emergencyStart = "No emergency start procedure available.",
    obdPortLocation = "OBD port location not specified.",
    pathways = []
  } = data;

  const [expandedImage, setExpandedImage] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isTextDropdownOpen, setIsTextDropdownOpen] = useState(false);
  const [customerComment, setCustomerComment] = useState('');
  const [comments, setComments] = useState([]);

  // Helper function to render brand badges
  const renderBrandBadge = (brand, color, image = null) => (
    <span
      key={brand}
      className="inline-flex items-center px-2 py-1 text-xs font-bold rounded-full mr-2 mb-2 cursor-pointer"
      style={{ backgroundColor: color, color: '#fff' }}
      onClick={() => image && setExpandedImage(image)}
    >
      {brand}
    </span>
  );

  // Handle adding a new comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (customerComment.trim()) {
      setComments([...comments, customerComment.trim()]);
      setCustomerComment('');
    }
  };

  // Example programming data - replace with actual data structure
  const programmingData = [
    {
      feature: 'Remote Options',
      value: ['KD', 'XH', 'OEM'],
      colors: { KD: '#1e40af', XH: '#f59e42', OEM: '#10b981' },
      models: {
        KD: ['KD-01', 'KD-02'],
        XH: ['XH-01'],
        OEM: ['OEM-01', 'OEM-02']
      }
    }
  ];

  // Get all unique brands from programming data
  const getAllUniqueBrands = (rows) => {
    const brands = new Set();
    rows.forEach(row => {
      row.value.forEach(brand => brands.add(brand));
    });
    return Array.from(brands);
  };

  // Filter rows based on selected brand
  const filteredRows = selectedBrand
    ? programmingData.filter(row => row.value.includes(selectedBrand))
    : programmingData;

  // Safely extract vehicle info with defaults
  const info = {
    make: vehicleInfo.make || "Not specified",
    model: vehicleInfo.model || "Not specified",
    series: vehicleInfo.series || "Not specified",
    yearRange: vehicleInfo.yearRange || "Not specified",
    keyType: vehicleInfo.keyType || "Not specified",
    frequency: vehicleInfo.frequency || "Not specified"
  };

  return (
    <div className="w-full min-h-screen py-4 sm:py-6 lg:py-8 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Back Button */}
      <div className="flex items-center justify-start mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Variants
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-4 sm:mb-6 px-2">
          {model} {variant && <span className="font-normal">{variant}</span>}
        </h2>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Vehicle Information
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Make</p>
                <p className="font-medium">{info.make}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-medium">{info.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Series</p>
                <p className="font-medium">{info.series}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year Range</p>
                <p className="font-medium">{info.yearRange}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Key Type</p>
                <p className="font-medium">{info.keyType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Frequency</p>
                <p className="font-medium">{info.frequency}</p>
              </div>
            </div>
          </div>

          {/* Key Blade Profiles */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-1">
              Key Blade Profiles
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Object.entries(keyBladeProfiles).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">{key}</p>
                  <p className="font-medium">{value || 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Programming Information */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Programming Information
              </h3>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="">All Brands</option>
                {getAllUniqueBrands(programmingData).map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              {filteredRows.map((row, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">{row.feature}</h4>
                  <div className="flex flex-wrap">
                    {row.value.map((brand) => (
                      <div key={brand} className="mr-4 mb-2">
                        <div
                          className="inline-block px-2 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: row.colors[brand] }}
                        >
                          {brand}
                        </div>
                        <div className="text-sm text-gray-700 mt-1">
                          {row.models[brand].join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference Guide */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-1">
              Quick Reference Guide
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-1">OBD Port Location</h4>
                <p className="text-gray-600">{obdPortLocation}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Emergency Start</h4>
                <p className="text-gray-600">{emergencyStart}</p>
              </div>
            </div>
          </div>

          {/* Images Section */}
          {Object.keys(images).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-1">
                Reference Images
              </h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(images).map(([key, src]) => (
                  <div key={key} className="w-32 h-32 overflow-hidden rounded border">
                    <img
                      src={src}
                      alt={key}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-90"
                      onClick={() => setExpandedImage({ src, alt: key })}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold text-blue-700 mb-2 text-lg">
              Comments
            </h3>
            
            {/* Display comments */}
            <div className="space-y-2 mb-4">
              {comments.map((comment, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-white rounded px-3 py-2 shadow-sm"
                >
                  <span className="inline-block bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 flex-shrink-0">
                    Customer
                  </span>
                  <span className="text-gray-800 text-sm break-words">{comment}</span>
                </div>
              ))}
            </div>
            
            {/* Comment form */}
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
                Add
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Image Expansion Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage.src}
            alt={expandedImage.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg border-4 border-white object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setExpandedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

VariantDetails.propTypes = {
  model: PropTypes.string,
  variant: PropTypes.string,
  data: PropTypes.shape({
    vehicleInfo: PropTypes.shape({
      make: PropTypes.string,
      model: PropTypes.string,
      series: PropTypes.string,
      yearRange: PropTypes.string,
      keyType: PropTypes.string,
      frequency: PropTypes.string,
    }),
    keyBladeProfiles: PropTypes.object,
    images: PropTypes.object,
    emergencyStart: PropTypes.string,
    obdPortLocation: PropTypes.string,
    pathways: PropTypes.array,
  }),
  onBack: PropTypes.func.isRequired,
};

export default VariantDetails;
