import { configureStore } from "@reduxjs/toolkit";
import brandsReducer from "../features/brandsSlice";
import modelsReducer from "../features/modelsSlice";
import variantsReducer from "../features/variantsSlice";

const store = configureStore({
  reducer: {
    brands: brandsReducer,
    models: modelsReducer,
    variants: variantsReducer,
  },
});

export default store;
