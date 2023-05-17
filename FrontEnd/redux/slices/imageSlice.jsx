import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    image: [],
  },
  reducers: {
    addImage: (state, action) => ({
      ...state,
      image: [...state.image, action.payload],
    }),
    setImage: (state) => ({
      ...state,
      image: [],
    }),
    // handleCountProduct: (state, action) => {
    //   switch (action.payload) {
    //     case "increase":
    //       return { ...state, number: state.number + 1 };
    //     case "decrease":
    //       if (state.number == 1) break;
    //       return { ...state, number: state.number - 1 };
    //     default:
    //       break;
    //   }
    // },
  },
});
export const { addImage } = imageSlice.actions;
export default imageSlice.reducer;
