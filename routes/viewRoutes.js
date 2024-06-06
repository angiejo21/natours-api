const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getSignupForm,
  getMyTours,
} = viewsController;
const { isLoggedIn, protect } = authController;
const { createBookingCheckout } = bookingController;

const router = express.Router();

router.get("/", createBookingCheckout, isLoggedIn, getOverview);
router.get("/tour/:slug", isLoggedIn, getTour);
router.get("/login", isLoggedIn, getLoginForm);
router.get("/signup", isLoggedIn, getSignupForm);
router.get("/me", protect, getAccount);
router.get("/my-tours", protect, getMyTours);

router.post("/submit-user-data", protect, updateUserData);

module.exports = router;
