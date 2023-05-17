import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    account: {},
    accounts: [],
    photo: {},
    accountOther: {},
    photoOther: {},
  },
  reducers: {
    setAccounts: (state, action) => ({ ...state, accounts: action.payload }),
    setAccount: (state, action) => ({ ...state, account: action.payload }),
    setPhoto: (state, action) => ({ ...state, photo: action.payload }),
    setAccountOther: (state, action) => ({
      ...state,
      accountOther: action.payload,
    }),
    setPhotoOther: (state, action) => ({
      ...state,
      photoOther: action.payload,
    }),
  },
});
export const {
  setAccount,
  setAccounts,
  setPhoto,
  setAccountOther,
  setPhotoOther,
} = accountSlice.actions;
export default accountSlice.reducer;
