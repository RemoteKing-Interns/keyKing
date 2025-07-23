import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch models for a given brand
export const fetchModels = createAsyncThunk(
  "models/fetchModels",
  async (brand) => {
    const res = await fetch(
      `http://192.168.15.104:3000/api/models/${encodeURIComponent(brand)}`
    );
    return res.json();
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
