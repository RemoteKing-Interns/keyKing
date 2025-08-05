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

  // Helper function to render brand badges
  const renderBrandBadge = (brand, color, image = null) => (
    <span
      key={brand}
      className="inline-flex items-center px-2 py-1 text-xs font-bold rounded-full mr-2 mb-2"
      style={{ backgroundColor: color, color: '#fff' }}
      onClick={() => image && setExpandedImage(image)}
    >
      {brand}
    </span>
  );

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

  // Filtered rows based on selected brand
  const filteredRows = programmingData.filter(row => {
    if (!selectedBrand) return true;
    return row.value.includes(selectedBrand);
  });

  return (
    <div className="w-full min-h-screen py-4 sm:py-6 lg:py-8 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Back Button */}
      <div className="flex items-center justify-start mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vehicle Image */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={images.car || '/images/placeholder-car.png'}
                alt={`${model} ${variant}`}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = '/images/placeholder-car.png';
                }}
              />
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Vehicle Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Make</p>
                  <p className="font-medium">{vehicleInfo.make || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Model</p>
                  <p className="font-medium">{vehicleInfo.model || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Series</p>
                  <p className="font-medium">{vehicleInfo.series || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year Range</p>
                  <p className="font-medium">{vehicleInfo.yearRange || '-'}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Key Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Key Type</p>
                    <p className="font-medium">{vehicleInfo.keyType || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Frequency</p>
                    <p className="font-medium">{vehicleInfo.frequency || '-'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Key Blade Profiles</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">KD</p>
                    <p className="font-medium">{keyBladeProfiles.KD || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">JMA</p>
                    <p className="font-medium">{keyBladeProfiles.JMA || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Silica</p>
                    <p className="font-medium">{keyBladeProfiles.Silica || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Programming Information */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Programming Information
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by brand:
              </label>
              <select
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                {Array.from(new Set(programmingData.flatMap(item => item.value))).map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {filteredRows.map((item, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-gray-700 mb-2">{item.feature}</h3>
                  <div className="flex flex-wrap">
                    {item.value
                      .filter(brand => !selectedBrand || brand === selectedBrand)
                      .map(brand => renderBrandBadge(brand, item.colors[brand]))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference Guide */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800">
              Quick Reference Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-yellow-700 mb-2">
                  Emergency Start Procedure
                </h3>
                <p className="text-yellow-800">{emergencyStart}</p>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-700 mb-2">
                  OBD Port Location
                </h3>
                <p className="text-yellow-800">{obdPortLocation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {expandedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setExpandedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <img
                src={expandedImage.src}
                alt={expandedImage.alt}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              <button
                className="absolute top-4 right-4 bg-white rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedImage(null);
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
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
      transponderChip: PropTypes.arrayOf(PropTypes.string)
    }),
    keyBladeProfiles: PropTypes.shape({
      KD: PropTypes.string,
      JMA: PropTypes.string,
      Silica: PropTypes.string
    }),
    images: PropTypes.shape({
      car: PropTypes.string,
      key: PropTypes.string
    }),
    emergencyStart: PropTypes.string,
    obdPortLocation: PropTypes.string,
    pathways: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      steps: PropTypes.arrayOf(PropTypes.string)
    }))
  }),
  onBack: PropTypes.func.isRequired
};

export default VariantDetails;
