const Account = require('../models/accountModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');
const { deleteOne, getAll, getOne, updateOne } = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateInfoMe = catchAsync(async (req, res, next) => {
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
  const filteredBody = filterObj(
    req.body,
    'username',
    'address',
    'addressDetail',
    'phoneNumber',
    'photo',
    'history',
  );
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await Account.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    },
  );

  return res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

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
  const filteredBody = filterObj(
    req.body,
    'username',
    'address',
    'addressDetail',
    'phoneNumber',
    'photo',
    'history',
  );
  if (req.file) filteredBody.photo = req.file.filename;
  if (req.body.history)
    filteredBody.history = [
      ...filteredBody.history,
      { cart: req.body.history },
    ];

  // 3) Update user document
  const updatedUser = await Account.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    },
  );
  const updatedAccountHistory = [
    ...updatedUser.history,
    { order: req.body.orderId },
  ];
  await Account.findByIdAndUpdate(
    req.user.id,
    { history: updatedAccountHistory },
    { new: true },
  );
  return res.status(200).json({
    status: 'success',
    data: {
      user: updatedAccountHistory,
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

exports.getAccount = getOne(Account, {
  path: 'history.order',
  select: ['products', 'totalMoney', 'status'],
});

exports.getMyOrder = catchAsync(async (req, res, next) => {
  let query = Account.findById(req.params.id);
  query = query.populate({
    path: 'history.order',
    select: [
      'products',
      'totalMoney',
      'status',
      'payment',
      'createdAt',
      '_id',
      '-account',
    ],
  });
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc.history,
  });
});

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
