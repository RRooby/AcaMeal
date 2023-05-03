const Order = require('../models/orders.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.validIfExistOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
    },
  });

  if (!order) {
    return next(new AppError(`Order id: ${id} not found`, 404));
  }

  if (order.status !== 'active') {
    return next(new AppError('Order not actived', 404));
  }

  req.order = order;
  next();
});
