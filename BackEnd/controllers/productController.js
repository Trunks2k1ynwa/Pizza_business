const Product = require('../models/productModel');
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('../controllers/handlerFactory');

exports.getAllProducts = getAll(Product);
exports.getProduct = getOne(Product, { path: 'category' });
exports.createProduct = createOne(Product);
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
