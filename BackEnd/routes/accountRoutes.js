const { Router } = require('express');
const {
  getAllAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  deleteMe,
  getMe,
  createAccount,
  updateMe,
  // updateInfoMe,
} = require('./../controllers/accountController');
const {
  forgotPassword,
  login,
  signup,
  logout,
  protect,
  resetPassword,
  restrictTo,
  updatePassword,
} = require('../controllers/authController');

const router = Router();
router.get('/cookie', (req, res, next) => {
  const token = 'jldsàkj2354345';
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    signed: true,
    sameSite: 'none',
    secure: true,
  };

  res.cookie('jwt', token, cookieOptions);
  res.send('Hello word');
  next();
});

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router
  .route('/me')
  .get(getMe, getAccount)
  .patch(getMe, updateMe)
  .delete(getMe, deleteMe);

// router.route('/updateInfoMe').patch(getMe, updateInfoMe);

router.use(restrictTo('admin'));

router
  .route('/')
  .get(getAllAccounts)
  .post(createAccount);

router
  .route('/:id')
  .get(getAccount)
  .patch(updateAccount)
  .delete(deleteAccount);

module.exports = router;
