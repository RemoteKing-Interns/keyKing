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
      // Extract fields from FormData
      let name = '';
      let file: File | null = null;
      for (const [key, value] of formData.entries()) {
        if (key === 'name' && typeof value === 'string') {
          name = value.trim();
        }
        if (key === 'logo' && value instanceof File) {
          file = value;
        }
      }

      if (!file) {
        throw new Error('Please select a logo file');
      }

      // First, upload the logo file to S3
      const uploadResponse = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(error.message || 'Failed to upload logo');
      }

      const { fileUrl } = await uploadResponse.json();

      // Then, create the brand with the uploaded logo URL
      const brandResponse = await fetch(`${API_BASE}/api/brands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          logoUrl: fileUrl,
        }),
      });

      if (!brandResponse.ok) {
        const error = await brandResponse.json();
        throw new Error(error.message || 'Failed to create brand');
      }

      // Refresh the brands list
      await fetchBrands();
      setShowAddForm(false);
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
