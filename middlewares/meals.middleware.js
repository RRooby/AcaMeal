const Meal = require('../models/meals.model');
const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/appError');
const Restaurant = require('../models/restaurants.model');

exports.validIfExistMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }
  req.meal = meal;
  next();
});

exports.validIfExistMealPlusRestaurant = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const meal = await Meal.findOne({
      where: {
        id,
        status: 'active',
      },
      include: [
        {
          model: Restaurant,
        },
      ],
    });
    if (!meal) {
      return next(new AppError('Meal not found', 404));
    }
    req.meal = meal;
    next();
  }
);
