import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import productSlice from './slices/productSlice.jsx';
import accountSlice from './slices/accountSlice.jsx';
import categoriesSlice from './slices/categoriesSlice.jsx';
import homeSlice from './slices/homeSlice.jsx';
import cartSlice from './slices/cartSlice.jsx';
import orderSlice from './slices/orderSlice.jsx';
import imageSlice from './slices/imageSlice.jsx';

const reducer = combineReducers({
  product: productSlice,
  account: accountSlice,
  categories: categoriesSlice,
  home: homeSlice,
  cart: cartSlice,
  order: orderSlice,
  image: imageSlice,
});
const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});
export default store;
