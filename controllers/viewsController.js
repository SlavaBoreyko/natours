const Tour = require('../models/tourModel');
const User = require('./../models/userModel'); 
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res) => {

    const tours = await Tour.find();

    res.status(200).render('overview', {
      title: 'All Tours',
      tours
    });
});

exports.getTour = catchAsync( async(req, res) => {

    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    if(!tour) {
      return next( new AppError('There is no tour with that name.', 404));
    }

    res
    .status(200)
    .set(
      'Content-Security-Policy',
      'connect-src http://127.0.0.1:3000/api/v1/bookings/checkout-session/ ws://127.0.0.1:53574/ https://*.stripe.com/ https://js.stripe.com/ https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com'
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour
    });
});

exports.getLoginForm = (req, res) => {
  res
  .status(200)
  .set(
    'Content-Security-Policy',
    'connect-src ws://127.0.0.1:50212/ http://127.0.0.1:3000/api/v1/users/login http://127.0.0.1:3000/api/v1/users/logout https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'
  )
  .render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find( { user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updateUser
  });
});