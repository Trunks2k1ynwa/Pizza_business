// Khởi tạo trạng thái ban đầu của counter
const initialState = {
  account: {},
  token: '',
  isLoading: false,
  error: null,
};
// Reducer
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ACCOUNT_REQUEST':
      return {
        ...state,
        account: action.account,
        token: action.token,
        isLoading: true,
      };
    case 'GET_ACCOUNT_SUCCESS':
      return {
        ...state,
        account: action.payload,
        token: '',
        isLoading: true,
      };
    case 'GET_ACCOUNT_ERRORR':
      return {
        ...state,
        account: action.account,
        token: action.token,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default accountReducer;
