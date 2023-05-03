const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const usersRoute = require('./routes/users.route');
const restaurantsRoute = require('./routes/restaurants.route');
const mealsRoute = require('./routes/meals.route');
const ordersRoute = require('./routes/orders.route');

app.use(express.json());

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/restaurants', restaurantsRoute);
app.use('/api/v1/meals', mealsRoute);
app.use('/api/v1/orders', ordersRoute);

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      `cannot find ${req.originalUrl} on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
