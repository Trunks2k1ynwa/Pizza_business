const Category = require('../models/categoryModel');
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('../controllers/handlerFactory');

exports.getAllCategories = getAll(Category);
exports.getCategory = getOne(Category);
exports.updateCategory = updateOne(Category);
exports.deleteCategory = deleteOne(Category);
exports.createCategory = createOne(Category);
