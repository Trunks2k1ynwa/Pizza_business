const express = require('express');
const xss = require('xss-clean');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const productRouter = require('./routes/productRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const categoryRouter = require('./routes/categoryRoutes');
const accountRouter = require('./routes/accountRoutes');
const cartRouter = require('./routes/cartRoutes');
const authRouter = require('./routes/authRoutes');
const orderRouter = require('./routes/orderRoutes');
const discountRouter = require('./routes/discountRoutes');
require('./utils/passport');

const app = express();
app.use(cookieParser('secret'));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
  }),
);

app.use(cookieParser('secret'));
app.use(
  cookieSession({
    name: 'session',
    keys: ['lama'],
    maxAge: 24 * 60 * 60 * 100,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const Delay = 0;
// Data sanitization againts NoSQL query injection
app.use(mongoSanitize());
app.use(xss());
app.use((req, res, next) => {
  setTimeout(next, Delay);
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/discounts', discountRouter);

// Handle error by Middleware funtion when route dont't denied
app.all('*', (req, res, next) => {
  //err in next is argument in Routes has function middlware has err argument
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
