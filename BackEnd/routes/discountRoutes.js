const { Router } = require('express');
const {
  createDiscount,
  deleteDiscount,
  getAllDiscount,
  getDiscount,
  updateDiscount,
} = require('../controllers/discountController');
const { restrictTo, protect } = require('../controllers/authController');

const router = Router();

// Protect all routes after this middleware
router.use(protect);
router.use(restrictTo('editor', 'admin'));
router
  .route('/')
  .get(getAllDiscount)
  .post(createDiscount);

router
  .route('/:id')
  .get(getDiscount)
  .delete(deleteDiscount)
  .patch(updateDiscount);
