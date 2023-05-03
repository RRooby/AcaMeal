const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/users.model');
const AppError = require('../utils/appError');

exports.findAllRestaurant = catchAsync(async (req, res) => {
  const restaurants = await Restaurant.findAll({
    where: { status: 'active' },
    include: [
      {
        model: Review,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    restaurants,
  });
});

exports.findOneRestaurant = catchAsync(async (req, res) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

exports.createRestaurant = catchAsync(async (req, res) => {
  const { name, address, rating } = req.body;

  const restaurants = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    restaurants,
  });
});

exports.updateRestaurant = catchAsync(async (req, res) => {
  const { restaurant } = req;

  const { name, address } = req.body;

  await restaurant.update({
    name,
    address,
  });

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant deleted',
  });
});

exports.createReviewRestaurant = catchAsync(async (req, res) => {
  const { sessionUser } = req;
  const { id } = req.params;
  const { comment, rating } = req.body;

  const review = await Review.create({
    userId: sessionUser.id,
    restaurantId: id,
    comment,
    rating,
  });

  res.status(201).json({
    status: 'succes',
    review,
  });
});

exports.updateReviewRestaurant = catchAsync(
  async (req, res, next) => {
    const { comment, rating } = req.body;
    const user = req.sessionUser;
    const { review } = req;

    await review.update(
      { comment, rating },
      {
        where: {
          id: req.params.id,
          restaurantId: req.params.restaurantId,
          userId: user.id,
        },
      }
    );
    res.status(200).json({
      status: 'success',
      message: 'Review has been updated',
    });
  }
);

exports.deleteReviewRestaurant = catchAsync(async (req, res) => {
  const user = req.sessionUser;
  const { review } = req;

  await review.update(
    { status: 'disabled' },
    {
      where: {
        id: req.params.id,
        restaurantId: req.params.restaurantId,
        userId: user.id,
      },
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Review has been deleted',
  });
});
