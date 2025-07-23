import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch brands
export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const res = await fetch("http://192.168.15.104:3000/api/brands/");
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
  reducers: {},
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

export default brandsSlice.reducer;
