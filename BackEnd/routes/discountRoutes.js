import { Router } from 'express';
import {
  createDiscount,
  deleteDiscount,
  getAllDiscount,
  getDiscount,
  updateDiscount,
} from '../controllers/discountController.js';
import { restrictTo } from '../controllers/authController.js';

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
