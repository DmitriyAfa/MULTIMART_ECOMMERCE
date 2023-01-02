import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      console.log(newItem, " newitem");

      if (!existingItem) {
        const { id, productName, imgUrl, price } = newItem;
        state.cartItems.push({
          id: id,
          productName: productName,
          iamge: imgUrl,
          price: price,
          quantity: 1,
          totalPrice: price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity)
      );
      console.log("totalQuantity ", state.totalQuantity);
      console.log("cartItems ", state.cartItems);
    },
  },
});

export const cartActions = cartSlice.actions;

export const addCartItem = (item) => cartActions.addItem(item);

export default cartSlice.reducer;
