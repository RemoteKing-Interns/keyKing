import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch models for a given brand
export const fetchModels = createAsyncThunk(
  "models/fetchModels",
  async (brandId, { rejectWithValue }) => {
    try {
      console.log(`Fetching models for brand ID: ${brandId}`);
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/models/brand/${brandId}`;
      console.log(`API URL: ${url}`);
      
      const res = await fetch(url);
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', errorText);
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      
      const response = await res.json();
      console.log('API Response data:', response);
      
      // Handle the API response structure
      let models = [];
      if (response && response.success && Array.isArray(response.data)) {
        models = response.data.map(model => ({
          _id: model._id,
          name: model.name,
          imageUrl: model.imageUrl,
          brandId: model.brandId?._id,
          brandName: model.brandId?.name,
          description: model.description,
          createdAt: model.createdAt
        }));
      } else if (Array.isArray(response)) {
        // Fallback for direct array response
        models = response;
      }
      
      console.log('Normalized models:', models);
      return models;
    } catch (error) {
      console.error('Error fetching models:', error);
      return rejectWithValue(error.message);
    }
  }
);

const modelsSlice = createSlice({
  name: "models",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearModels: (state) => {
      state.items = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearModels } = modelsSlice.actions;
export default modelsSlice.reducer;
