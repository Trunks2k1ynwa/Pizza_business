// accountActions.js
export const getAccountMeRequest = () => ({
  type: 'GET_ACCOUNT_REQUEST',
});

export const getAccountMeSuccess = (accountData) => ({
  type: 'GET_ACCOUNT_SUCCESS',
  payload: accountData,
});
export const getAccountMeError = (accountData) => ({
  type: 'GET_ACCOUNT_ERROR',
  payload: accountData,
});

// ... other account-related actions
