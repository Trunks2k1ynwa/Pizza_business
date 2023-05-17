import Product from '../models/productModel.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../controllers/handlerFactory.js';

export const getAllProducts = getAll(Product);
export const getProduct = getOne(Product, { path: 'category' });
export const createProduct = createOne(Product);
export const updateProduct = updateOne(Product);
export const deleteProduct = deleteOne(Product);
