exports.urlAvatar =
  'https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png';
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createSendToken = (account, statusCode, req, res) => {
  const token = signToken(account._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: false, // Đặt secure thành false khi sử dụng giao thức HTTP
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  res.cookie('payload', token.split('.')[1], {
    ...cookieOptions,
    httpOnly: false,
  });
  // Remove password from output
  account.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    account,
  });
};
exports.saveToken = (account, res) => {
  const token = signToken(account._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    // sameSite: 'none',
    secure: false, // Đặt secure thành false khi sử dụng giao thức HTTP
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  res.cookie('payload', token.split('.')[1], {
    ...cookieOptions,
    httpOnly: false,
  });
};
