import React, { useState } from 'react';

interface AddBrandFormProps {
  onClose: () => void;
  onAddBrand: (formData: FormData) => Promise<void>;
}

const AddBrandForm: React.FC<AddBrandFormProps> = ({ onClose, onAddBrand }) => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!name.trim()) {
      alert('Please enter a brand name');
      return;
    }
    if (!logo) {
      alert('Please select a logo');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Ensure name is properly appended as a string
      formData.append('name', name.trim());
      
      // Append the file with the correct field name and filename
      formData.append('logo', logo);
      
      // Log the form data for debugging
      console.log('FormData entries:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      // Log FormData entries for debugging
      console.log('FormData entries before sending:');
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, {
            name: value.name,
            type: value.type,
            size: value.size
          });
        } else {
          console.log(key, value);
        }
      }
      
      await onAddBrand(formData);
      setName('');
      setLogo(null);
      onClose();
    } catch (error) {
      console.error('Error in AddBrandForm:', {
        error,
        name,
        logo: logo ? `${logo.name} (${logo.type}, ${logo.size} bytes)` : 'No file'
      });
      alert(error instanceof Error ? error.message : 'Failed to add brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Brand</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Brand Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter brand name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logo">
              Brand Logo
            </label>
            <input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-600 file:text-white
                hover:file:bg-primary-700"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary disabled:opacity-50 flex items-center gap-2"
              disabled={!name.trim() || !logo || isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Brand'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrandForm;
