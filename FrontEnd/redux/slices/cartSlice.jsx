import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    setCart: (state, action) => ({ ...action.payload }),
    setProducts: (state, action) => ({ ...state, products: action.payload }),
    setNumber: (state, action) => ({
      ...state,
      number: action.payload,
    }),
    setTotalPrice: (state, action) => ({
      ...state,
      totalPrice: action.payload,
    }),
  },
});
export const { setProducts, setCart, setNumber, setTotalPrice } =
  cartSlice.actions;
export default cartSlice.reducer;
