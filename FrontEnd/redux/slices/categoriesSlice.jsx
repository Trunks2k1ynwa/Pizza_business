import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    categoriesDb: [],
  },
  reducers: {
    setcategories: (state, action) => ({
      ...state,
      categories: action.payload,
    }),
    setcategoriesDb: (state, action) => ({
      ...state,
      categoriesDb: action.payload,
    }),
  },
});
export const { setcategories, setcategoriesDb } = categoriesSlice.actions;
export default categoriesSlice.reducer;
