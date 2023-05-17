import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    product: {},
  },
  reducers: {
    setProduct: (state, action) => ({ ...state, product: action.payload }),
  },
});
export const { setProduct } = homeSlice.actions;
export default homeSlice.reducer;
