import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchProductsAPI from "../api/ProductAPI";
import { Product, ProductState } from "../interface/Product";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetch",
  async () => {
    return await fetchProductsAPI();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
