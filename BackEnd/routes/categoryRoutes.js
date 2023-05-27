const express = require('express');
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} = require('../controllers/categoryController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();
// Protect all routes after this middleware
router.use(protect);
router.use(restrictTo('admin', 'editor'));

router
  .route('/')
  .get(getAllCategories)
  .post(createCategory);
router
  .route('/:id')
  .patch(updateCategory)
  .get(getCategory)
  .delete(deleteCategory);

module.exports = router;
