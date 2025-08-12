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

      // Read file as data URL to embed in a new tab
      const toDataUrl = (f: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(f);
        });

      const dataUrl = await toDataUrl(file);

      // Open a new tab showing the brand name and image
      const win = window.open('', '_blank');
      if (win) {
        const safeName = name || '(no name provided)';
        win.document.write(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Brand Preview</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; padding: 24px; }
      .name { font-size: 20px; font-weight: 600; margin-bottom: 16px; }
      img { max-width: 100%; height: auto; border: 1px solid #e5e7eb; border-radius: 8px; }
    </style>
  </head>
  <body>
    <div class="name">Brand: ${safeName}</div>
    <img src="${dataUrl}" alt="Brand Logo" />
  </body>
</html>`);
        win.document.close();
      } else {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      // Close modal after preview
      setShowAddForm(false);
      return;
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
