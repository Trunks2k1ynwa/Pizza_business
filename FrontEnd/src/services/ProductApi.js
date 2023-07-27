import http from './http';

export const getAllProduct = () => {
  return http.get('products');
};
