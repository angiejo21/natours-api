const Tour = require("../models/tourModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === "booking")
    res.locals.alert =
      "Your booking was successful! Please check your email for confirmation. If your booking doesn't show up here immediately, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  //1) get tour data from collection
  const tours = await Tour.find();
  //2)Build template
  //3)Render that template usign tour data from 1
  res.status(200).render("overview", {
    title: "All tours",
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  //1)get the data for the tour (review and guides)
  const tourName = req.params.slug;
  const tour = await Tour.findOne({ slug: tourName }).populate({
    path: "reviews",
    fields: "reviw rating user",
  });
  if (!tour) {
    return next(new AppError("There is no tour with that name", 404));
  }
  //2)Build template
  //3)Render template using data
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://*.mapbox.com https://js.stripe.com/v3/;base-uri https://natours-api-bvym.onrender.com 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://js.stripe.com/v3/ https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;",
    )
    .render("tour", {
      title: `${tour.name} Tour`,
      tour,
    });
});

exports.getLoginForm = async (req, res) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src self https://natours-api-bvym.onrender.com",
    )
    .render("login", {
      title: "Log into your account",
    });
};

exports.getSignupForm = async (req, res) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src self https://natours-api-bvym.onrender.com",
    )
    .render("signup", {
      title: "Create your account",
    });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your account",
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  //1)find all bookings for user
  const bookings = await Booking.find({ user: req.user.id });
  //2)Find tours with the returned ids
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render("overview", {
    title: "My tours",
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).render("account", {
    title: "Your account",
    user: updatedUser,
  });
});
