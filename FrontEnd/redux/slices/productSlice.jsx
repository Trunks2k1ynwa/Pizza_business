import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    images: [],
    number: 1,
    products: [],
    product: {},
  },
  reducers: {
    addImages: (state, action) => ({
      ...state,
      images: [...state.images, action.payload],
    }),
    removeImages: (state, action) => {
      const image = state.images.filter(
        (image) => image.name !== action.payload,
      );
      return {
        ...state,
        images: [...image],
      };
    },
    resetImage: (state) => ({
      ...state,
      images: [],
    }),
    setImages: (state, action) => ({
      ...state,
      images: action.payload,
    }),
    setProducts: (state, action) => ({
      ...state,
      products: [...action.payload],
    }),
    setProduct: (state, action) => ({
      ...state,
      product: { ...action.payload },
    }),
  },
});
export const {
  addImages,
  removeImages,
  setImages,
  setProducts,
  resetImage,
  setProduct,
} = productSlice.actions;
export default productSlice.reducer;
