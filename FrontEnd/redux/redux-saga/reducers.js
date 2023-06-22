import { combineReducers } from '@reduxjs/toolkit';
import accountSlice from '../slices/accountSlice.jsx';

export const rootReducer = combineReducers({
  account: accountSlice,
});
