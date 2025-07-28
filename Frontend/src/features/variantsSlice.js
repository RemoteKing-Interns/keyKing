import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch variants for a given brand and model
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
      });
  },
});

export const { clearVariants } = variantsSlice.actions;
export default variantsSlice.reducer;
