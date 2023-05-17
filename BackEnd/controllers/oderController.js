import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../controllers/handlerFactory.js';
import Order from '../models/orderModel.js';
import catchAsync from '../utils/catchAsync.js';

export const updateMyOrder = catchAsync(async (req, res, next) => {});
export const deleteMyOrder = catchAsync(async (req, res, next) => {});
export const getAllOrder = getAll(Order);
export const getOrder = getOne(Order);
export const createOrder = createOne(Order);
export const updateOrder = updateOne(Order);
export const deleteOrder = deleteOne(Order);
