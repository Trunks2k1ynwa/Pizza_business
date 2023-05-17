import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();
// Protect all routes after this middleware
router.use(protect);
router.use(restrictTo('admin', 'editor'));

router.route('/').get(getAllCategories).post(createCategory);
router
  .route('/:id')
  .patch(updateCategory)
  .get(getCategory)
  .delete(deleteCategory);

export default router;
