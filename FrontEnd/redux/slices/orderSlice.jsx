import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    orderNow: {},
    orderHistory: [],
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => ({
      ...state,
      order: [...state.order, action.payload],
    }),
    setOrderNow: (state, action) => ({
      ...state,
      orderNow: { ...action.payload },
    }),
    setOrderHistory: (state, action) => ({
      ...state,
      orderHistory: [...action.payload],
    }),
    setOrders: (state, action) => ({
      ...state,
      orders: [...action.payload],
    }),
  },
});
export const { addOrder, setOrderNow, setOrderHistory, setOrders } =
  orderSlice.actions;
export default orderSlice.reducer;
