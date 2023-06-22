import http from './http';

export const signInAccount = (data) => {
  return http.post('accounts/login', data);
};
export const signUpAccount = (data) => {
  return http.post('accounts/signup', data);
};

export const logoutAccount = () => {
  return http.get('accounts/logout');
};

export const getAccountMe = () => {
  return http.get('accounts/me');
};
