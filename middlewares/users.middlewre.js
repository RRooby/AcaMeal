const User = require('../models/users.model');
const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/appError');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError(`User id: ${id} not found`, 404));
  }
  req.user = user;
  next();
});
