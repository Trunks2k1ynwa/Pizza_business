import Category from '../models/categoryModel.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../controllers/handlerFactory.js';

export const getAllCategories = getAll(Category);
export const getCategory = getOne(Category);
export const updateCategory = updateOne(Category);
export const deleteCategory = deleteOne(Category);
export const createCategory = createOne(Category);
