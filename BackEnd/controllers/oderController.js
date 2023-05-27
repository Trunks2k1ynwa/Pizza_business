const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('../controllers/handlerFactory');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');

exports.updateMyOrder = catchAsync(async (req, res, next) => {});
exports.deleteMyOrder = catchAsync(async (req, res, next) => {});
exports.getAllOrder = getAll(Order);
exports.getOrder = getOne(Order);
exports.createOrder = createOne(Order);
exports.updateOrder = updateOne(Order);
exports.deleteOrder = deleteOne(Order);
