const express = require('express');
const xss = require('xss-clean');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/productRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const categoryRouter = require('./routes/categoryRoutes');
const accountRouter = require('./routes/accountRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();

// Implement CORS
app.use(cors());
app.options('*', cors());
app.use(cookieParser());

app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization againts NoSQL query injection
app.use(mongoSanitize());
app.use(xss());

// ROUTES
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/orders', orderRouter);

// Handle error by Middleware funtion when route dont't denied
app.all('*', (req, res, next) => {
  //err in next is argument in Routes has function middlware has err argument
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
