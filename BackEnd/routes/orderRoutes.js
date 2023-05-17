import { Router } from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import { getMe } from '../controllers/accountController.js';
import {
  createOrder,
  deleteMyOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  updateMyOrder,
  updateOrder,
} from '../controllers/oderController.js';

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

export default router;
