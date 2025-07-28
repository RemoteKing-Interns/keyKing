import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch brands
export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/brands/`);
  const data = await res.json();
  // normalise to array
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (data && typeof data === "object") return Object.values(data);
  return [];
});

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearBrands: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearBrands } = brandsSlice.actions;
export default brandsSlice.reducer;
