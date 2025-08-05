import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch variants for a given model ID
export const fetchVariantsByModelId = createAsyncThunk(
  "variants/fetchVariantsByModelId",
  async (modelId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/variants/model/${modelId}`
      );
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch variants');
      }
      
      return data.data || [];
    } catch (error) {
      console.error('Error fetching variants:', error);
      throw error;
    }
  }
);

// For backward compatibility
export const fetchVariants = createAsyncThunk(
  "variants/fetchVariants",
  async ({ brand, model }) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/variants/${encodeURIComponent(
        brand
      )}/${encodeURIComponent(model)}`
    );
    return res.json();
  }
);

const variantsSlice = createSlice({
  name: "variants",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearVariants: (state) => {
      state.items = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchVariants (legacy)
      .addCase(fetchVariants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVariants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchVariants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle fetchVariantsByModelId
      .addCase(fetchVariantsByModelId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVariantsByModelId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchVariantsByModelId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearVariants } = variantsSlice.actions;
export default variantsSlice.reducer;
