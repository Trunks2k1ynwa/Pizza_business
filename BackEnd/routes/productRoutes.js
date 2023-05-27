const express = require('express');
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} = require('../controllers/productController');
const { protect, restrictTo } = require('../controllers/authController');

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

module.exports = router;
