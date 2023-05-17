import { Router } from 'express';
import {
  updateMyCart,
  createCart,
  deleteCart,
  getAllCart,
  getCart,
  getMyCart,
  updateCart,
  deleteProductCart,
  deleteMyCart,
} from '../controllers/cartControllers.js';
import { getMe } from '../controllers/accountController.js';
import { protect, restrictTo } from '../controllers/authController.js';

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

export default router;
