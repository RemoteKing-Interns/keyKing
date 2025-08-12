import React, { useEffect, useState } from 'react';
import BrandCard from '../components/BrandCard';
import AddBrandForm from '../components/AddBrandForm';

interface Brand {
  _id: string;
  name: string;
  logoUrl: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

const BrandsPage: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/brands`);
      
      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setBrands(data.data);
      } else {
        throw new Error('API returned invalid format');
      }
    } catch (err) {
      console.error('Error fetching brands:', err);
      setError('Failed to fetch brands. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBrand = async (formData: FormData) => {
    try {
      console.log('Sending form data to server...');
      
      // Log FormData entries for debugging
      console.log('FormData entries in handleAddBrand:');
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, {
            name: value.name,
            type: value.type,
            size: value.size
          });
        } else {
          console.log(`${key}:`, value);
        }
      }

      const response = await fetch(`${API_BASE}/api/brands`, {
        method: 'POST',
        body: formData, // Let the browser set the Content-Type header with boundary
        // Don't set Content-Type header here - it will be set automatically with the correct boundary
      });

      console.log('Response status:', response.status);
      
      let result;
      try {
        result = await response.json();
        console.log('Response data:', result);
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error(`Server responded with ${response.status}: ${text}`);
      }
      
      if (!response.ok) {
        throw new Error(result?.message || `Server error: ${response.status}`);
      }

      // Refresh the brands list
      await fetchBrands();
      return result;
    } catch (error) {
      console.error('Error in handleAddBrand:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <>
      {/* Always show Add Brand button */}
      <div className="flex justify-end mb-6">
        <button
          className="btn-primary font-semibold flex items-center gap-2 shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
          type="button"
          onClick={() => setShowAddForm(true)}
        >
          <span className="text-xl leading-none">+</span> Add Brand
        </button>
      </div>

      {showAddForm && (
        <AddBrandForm
          onClose={() => setShowAddForm(false)}
          onAddBrand={handleAddBrand}
        />
      )}

      {/* Content states */}
      {loading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-center text-red-500 py-8">{error}</div>}

      {!loading && !error && brands.length === 0 && (
        <div className="text-center py-8">No brands found. Add your first brand!</div>
      )}

      <div className="flex flex-wrap gap-8 justify-center">
        {brands.map((brand) => (
          <BrandCard key={brand._id} name={brand.name} logo={brand.logoUrl} />
        ))}
      </div>
    </>
  );
};

export default BrandsPage;
