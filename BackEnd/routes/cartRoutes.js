const { Router } = require('express');
const {
  updateMyCart,
  createCart,
  deleteCart,
  getAllCart,
  getCart,
  getMyCart,
  updateCart,
  deleteProductCart,
  deleteMyCart,
} = require('../controllers/cartControllers');
const { getMe } = require('../controllers/accountController');
const { protect, restrictTo } = require('../controllers/authController');

const router = Router();

// Protect all routes after this middleware
router.use(protect);

router
  .route('/me')
  .get(getMe, getMyCart)
  .patch(getMe, updateMyCart)
  .delete(getMe, deleteMyCart);

router.route('/me/:productId').delete(getMe, deleteProductCart);

router
  .route('/')
  .get(getAllCart)
  .post(createCart);
router
  .route('/:id')
  .patch(restrictTo('user', 'admin', 'editor'), updateCart)
  .get(getCart)
  .delete(restrictTo('user', 'admin', 'editor'), deleteCart);

module.exports = router;
