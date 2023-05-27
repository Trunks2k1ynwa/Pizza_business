const { Router } = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const { getMe } = require('../controllers/accountController');
const {
  createOrder,
  deleteMyOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  updateMyOrder,
  updateOrder,
} = require('../controllers/oderController');

const router = Router();

// Protect all routes after this middleware
router.use(protect);

router.route('/me').patch(getMe, updateMyOrder);
router.route('/me/:orderId').delete(getMe, deleteMyOrder);
router
  .route('/')
  .get(getAllOrder)
  .post(createOrder);
router
  .route('/:id')
  .patch(restrictTo('admin', 'seller'), updateOrder)
  .get(getOrder)
  .delete(restrictTo('admin', 'seller'), deleteOrder);

module.exports = router;
