import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from './accountReducer';

export const rootReducer = combineReducers({
  account: accountReducer,
});
