import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../controllers/productController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
// Protect all routes after this middleware
router.use(protect);

router.route('/').post(restrictTo('editor', 'admin'), createProduct);

router
  .route('/:id')
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
