// src/components/VariantDetails.jsx
import React from "react";

export default function VariantDetails({ model, variant, data, onBack }) {
  if (!data)
    return <div className="text-center text-gray-500">No data available.</div>;

  const {
    vehicleInfo,
    programmingInfo,
    emergencyStart,
    obdPortLocation,
    images,
  } = data;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 my-8 border-2 border-blue-200">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:underline font-semibold"
      >
        ← Back to Variants
      </button>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={images?.car}
          alt={model}
          className="w-40 h-28 object-contain rounded-md bg-gradient-to-r from-[#e9ecf2] to-[#dbe7ff]"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {model} {variant}
          </h2>
          <div className="text-gray-700 text-sm">
            <div>
              <b>Country:</b> {vehicleInfo.country}
            </div>
            <div>
              <b>Series:</b> {vehicleInfo.series}
            </div>
            <div>
              <b>Body:</b> {vehicleInfo.body}
            </div>
            <div>
              <b>Engine:</b> {vehicleInfo.engine}
            </div>
            <div>
              <b>Drive:</b> {vehicleInfo.drive}
            </div>
            <div>
              <b>Date Range:</b> {vehicleInfo.dateRange}
            </div>
            <div>
              <b>Key Type:</b> {vehicleInfo.keyType}
            </div>
            <div>
              <b>Silca Key Profile:</b> {vehicleInfo.silcaKeyProfile}
            </div>
            <div>
              <b>Silca Transponder:</b> {vehicleInfo.silcaTransponder}
            </div>
            <div>
              <b>Transponder Chip:</b> {vehicleInfo.transponderChip}
            </div>
            <div>
              <b>Remote:</b> {vehicleInfo.remote}
            </div>
            <div>
              <b>Smart Pro Parts:</b> {vehicleInfo.smartProParts.join(", ")}
            </div>
            <div>
              <b>RWS/Smart Aerial Plus:</b>{" "}
              {vehicleInfo.rwsSmartAerialPlus ? "Yes" : "No"}
            </div>
            <div>
              <b>RWA Plus M-Box:</b> {vehicleInfo.rwaPlusMBox ? "Yes" : "No"}
            </div>
            <div>
              <b>Silca Key Cutting:</b> {vehicleInfo.silcaKeyCutting.join(", ")}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-blue-700 mb-2">
          Programming Information
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-black-90">
                <th className="p-2 text-left">Feature</th>
                <th className="p-2 text-left">Supported</th>
              </tr>
            </thead>
            <tbody>
              {programmingInfo.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{item.feature}</td>
                  <td className="p-2">
                    {item.supported === true && (
                      <span className="text-green-600 font-bold">✓</span>
                    )}
                    {item.supported === false && (
                      <span className="text-red-600 font-bold">✗</span>
                    )}
                    {item.value && <span>{item.value}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-blue-700 mb-2">Emergency Start</h3>
        <p className="text-gray-600">{emergencyStart}</p>
        {images?.emergency && (
          <img
            src={images.emergency}
            alt="Emergency Start"
            className="w-32 mt-2 rounded-md"
          />
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-blue-700 mb-2">OBD Port Location</h3>
        <p className="text-gray-600">{obdPortLocation}</p>
        {images?.obd && (
          <img
            src={images.obd}
            alt="OBD Port"
            className="w-32 mt-2 rounded-md"
          />
        )}
      </div>
    </div>
  );
}
