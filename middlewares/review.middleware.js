const Review = require('../models/reviews.model');
const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/appError');

exports.validIfExistReview = catchAsync(async (req, res, next) => {
  const { restaurantId, id } = req.params;
  const { sessionUser } = req;
  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
    },
  });

  if (review.userId !== sessionUser.id) {
    return next(
      new AppError(
        'You are not authorized to update this review',
        401
      )
    );
  }
  req.review = review;
  next();
});
