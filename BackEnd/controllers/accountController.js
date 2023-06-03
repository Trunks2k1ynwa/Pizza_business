const Account = require('../models/accountModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');
const { deleteOne, getAll, getOne, updateOne } = require('./handlerFactory');

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  // if (req.body.orders)
  // filteredBody.orders = [...filteredBody.orders, { cart: req.body.orders }];

  // 3) Update user document
  const updatedUser = await Account.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.deleteMe = catchAsync(async (req, res) => {
  await Account.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAccount = getOne(Account);

exports.getAllAccounts = getAll(Account);
exports.updateAccount = updateOne(Account);
exports.deleteAccount = deleteOne(Account);
exports.createAccount = catchAsync(async (req, res, next) => {
  // 3) Send it to user's email
  const resetURL = 'http://127.0.0.1:5173/sign-in/admin';

  await new Email(req.body, resetURL).send(
    'NatureBeauty.com.vn - Tài khoản để đăng nhập hệ thống',
  );
  console.log('Gửi email thành công');
  const doc = await Account.create(req.body);
  return res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
