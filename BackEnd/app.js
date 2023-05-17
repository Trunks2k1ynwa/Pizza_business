/* eslint-disable no-undef */
import express from 'express';
import xss from 'xss-clean';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import globalErrorHandler from './controllers/errorController.js';
import cookieParser from 'cookie-parser';
import AppError from './utils/appError.js';
import productRouter from './routes/productRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import accountRouter from './routes/accountRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
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
export default app;
