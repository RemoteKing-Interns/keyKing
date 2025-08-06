import React from "react";
import { useParams, useLocation } from "react-router-dom";

const VehicleDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  // If you pass data via navigation, it will be in location.state
  const vehicle = location.state?.vehicle;

  // If you fetch by ID, you can use useEffect here to load data

  if (!vehicle) {
    return <div>Loading vehicle details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">
        {vehicle.brand} {vehicle.model} ({vehicle.years})
      </h1>
      <div className="flex gap-4 mb-4">
        <img
          src={vehicle.imageUrl}
          alt="Vehicle"
          className="w-48 rounded shadow"
        />
      </div>
      <div className="bg-white rounded shadow p-4 mb-4">
        <h2 className="font-semibold mb-2">Vehicle Information</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <strong>Brand:</strong> {vehicle.brand}
          </div>
          <div>
            <strong>Model:</strong> {vehicle.model}
          </div>
          <div>
            <strong>Years:</strong> {vehicle.years}
          </div>
          <div>
            <strong>Engine:</strong> {vehicle.engine}
          </div>
          <div>
            <strong>Body:</strong> {vehicle.body}
          </div>
          <div>
            <strong>Key:</strong> {vehicle.key}
          </div>
          <div>
            <strong>Key Blade:</strong> {vehicle.keyBlade}
          </div>
          <div>
            <strong>Transponder:</strong> {vehicle.transponder}
          </div>
          <div>
            <strong>Lishi:</strong> {vehicle.lishi}
          </div>
          {/* Add more fields as needed */}
        </div>
      </div>
      {/* Example: Table for key/remote options */}
      <div className="bg-white rounded shadow p-4 mb-4">
        <h2 className="font-semibold mb-2">Key/Remote Options</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Option</th>
              <th>Programming</th>
              <th>Compatibility</th>
            </tr>
          </thead>
          <tbody>
            {vehicle.options.map((opt, idx) => (
              <tr key={idx}>
                <td>{opt.name}</td>
                <td>{opt.programming}</td>
                <td>{opt.compatibility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add more sections as needed, e.g., Lishi tool, expandable info */}
    </div>
  );
};

export default VehicleDetails;
