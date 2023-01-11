import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;

export const setProducts = (products) => productsActions.setProducts(products);

export default productsSlice.reducer;
