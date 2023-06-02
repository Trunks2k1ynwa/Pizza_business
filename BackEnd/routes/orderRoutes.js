const { Router } = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const { getMe } = require('../controllers/accountController');
const {
  deleteMyOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  updateMyOrder,
  updateOrder,
  getMyOrder,
  createMyOrder,
} = require('../controllers/oderController');

const router = Router();

// Protect all routes after this middleware
router.use(protect);

router
  .route('/me')
  .get(getMe, getMyOrder)
  .patch(getMe, updateMyOrder)
  .post(getMe, createMyOrder);
router.route('/me/:orderId').delete(getMe, deleteMyOrder);
router.route('/').get(getAllOrder);

router
  .route('/:id')
  .patch(restrictTo('admin', 'seller'), updateOrder)
  .get(getOrder)
  .delete(restrictTo('admin', 'seller'), deleteOrder);

module.exports = router;
