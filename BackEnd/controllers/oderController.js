const {
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('../controllers/handlerFactory');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getMyOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ account: req.params.id }).select(
    '-account',
  );
  if (!orders) {
    return next(new AppError('No orders found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: orders,
  });
});

exports.updateMyOrder = catchAsync(async (req, res, next) => {
  const orderUpdate = await Order.findByIdAndUpdate(
    req.body.orderId,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!orderUpdate) {
    return next(new AppError('No Order found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: orderUpdate,
  });
});

exports.createMyOrder = catchAsync(async (req, res, next) => {
  const cartMe = await Cart.findOne({ account: req.params.id });
  if (!cartMe) {
    return next(new AppError('No Cart found with account that ID', 404));
  }
  const doc = await Order.create({
    ...req.body,
    account: req.params.id,
    cart: cartMe.id,
  });
  // await Cart.deleteOne({ account: req.params.id });
  res.status(201).json({
    status: 'success',
    data: doc,
  });
});
exports.deleteMyOrder = catchAsync(async (req, res, next) => {});
exports.getAllOrder = getAll(Order);
exports.getOrder = getOne(Order);

exports.updateOrder = updateOne(Order);
exports.deleteOrder = deleteOne(Order);
