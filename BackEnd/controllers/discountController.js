const Discount = require('../models/discountModel');
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('./handlerFactory');

exports.getAllDiscount = getAll(Discount);
exports.getDiscount = getOne(Discount);
exports.createDiscount = createOne(Discount);
exports.updateDiscount = updateOne(Discount);
exports.deleteDiscount = deleteOne(Discount);
