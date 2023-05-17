export default (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    console.log(`Error message : ${err.message}`);
    next(err);
  });
};
