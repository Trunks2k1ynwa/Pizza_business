/* eslint-disable no-unused-vars */
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';

export const getMyCart = catchAsync(async (req, res, next) => {
  const myCart = await Cart.findOne({ account: req.params.id });
  if (!myCart) {
    // return next(new AppError('No document found with that ID account', 404));
    res.status(200).json({
      status: 'success',
      message: 'Looklike your cart is empty',
    });
  }

  res.status(200).json({
    status: 'success',
    data: myCart,
  });
});
export const updateMyCart = catchAsync(async (req, res, next) => {
  const { productId, number } = req.body;
  const accountId = req.params.id;
  const type = req.body.type;

  let cart = await Cart.findOne({ account: accountId });
  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError('No document found with that ID product', 404));
  }
  // Cart don't exits
  if (!cart) {
    const newCart = await Cart.create({
      account: accountId,
      products: [{ product: productId, number: number }],
    });
    return res.status(200).json({
      status: 'success',
      data: newCart,
    });
  }

  const existingProduct = cart.products.findIndex((p) => {
    return p.product._id == productId;
  });
  if (type === 'increase') {
    cart = await Cart.findOneAndUpdate(
      { account: accountId, 'products.product': productId },
      {
        $set: {
          'products.$.number': cart.products[existingProduct].number + 1,
        },
      },
      { new: true },
    ).populate({
      path: 'products.product',
      select: ['title', 'overview', 'price', 'images'],
    });
  } else if (type === 'decrease') {
    if (cart.products[existingProduct].number === 1) {
      cart = await Cart.findOneAndUpdate(
        { account: accountId },
        { $pull: { products: { product: productId } } },
        { new: true },
      ).populate({
        path: 'products.product',
        select: ['title', 'overview', 'price', 'images'],
      });
    } else {
      cart = await Cart.findOneAndUpdate(
        { account: accountId, 'products.product': productId },
        {
          $set: {
            'products.$.number': cart.products[existingProduct].number - 1,
          },
        },
        { new: true },
      ).populate({
        path: 'products.product',
        select: ['title', 'overview', 'price', 'images'],
      });
    }
  } else {
    if (existingProduct !== -1 && number > 0) {
      cart = await Cart.findOneAndUpdate(
        { account: accountId, 'products.product': productId },
        {
          $set: {
            'products.$.number': number + cart.products[existingProduct].number,
          },
        },
        { new: true },
      ).populate({
        path: 'products.product',
        select: ['title', 'overview', 'price', 'images'],
      });
    } else {
      cart.products.push({ product: productId, number: number });
      await cart.save();
      await cart.populate({
        path: 'products.product',
        select: ['title', 'overview', 'price', 'images'],
      });
    }
  }
  return res.status(200).json({
    status: 'success',
    data: cart,
  });
});
export const deleteProductCart = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;
  const accountId = req.params.id;
  let cart = await Cart.findOneAndUpdate(
    { account: accountId },
    { $pull: { products: { product: productId } } },
    { new: true },
  );
  return res.status(200).json({
    status: 'success',
    data: cart,
  });
});

export const deleteMyCart = async (req, res, next) => {
  const accountId = req.params.id;
  const cart = await Cart.findOne({ account: accountId });
  if (!cart) {
    return res.status(404).json({
      status: 'fail',
      message: 'Không tìm thấy giỏ hàng của người dùng',
    });
  } else {
    // Xóa giỏ hàng
    await Cart.deleteOne({ account: accountId });
    return res.status(200).json({
      status: 'success',
      message: 'Xóa giỏ hàng thành công',
    });
  }
};

export const getCart = getOne(Cart);
export const getAllCart = getAll(Cart);
export const updateCart = updateOne(Cart);
export const deleteCart = deleteOne(Cart);
export const createCart = createOne(Cart);
