import Discount from '../models/discountModel.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';

export const getAllDiscount = getAll(Discount);
export const getDiscount = getOne(Discount);
export const createDiscount = createOne(Discount);
export const updateDiscount = updateOne(Discount);
export const deleteDiscount = deleteOne(Discount);
