import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  totalPrice: 0,
  totalQuantity: 0,
};

function updateTotals(state) {
  state.totalQuantity = state.cartProducts.reduce(
    (total, product) => total + product.quantity,
    0,
  );
  state.totalPrice = state.cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartProducts.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        existingProduct.quantity = Math.min(existingProduct.quantity + 1, 10);
      } else {
        state.cartProducts.push({ ...product, quantity: 1 });
      }
      updateTotals(state);
    },
    changeCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cartProducts.find((item) => item.id === id);

      if (product) {
        product.quantity = Math.max(1, Math.min(10, quantity));
        updateTotals(state);
      }
    },
  },
});

export const { addToCart, changeCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
