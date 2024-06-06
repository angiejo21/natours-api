const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = bookingController;
const { protect, restrictTo } = authController;

//nested route
const router = express.Router();

router.use(protect);

router.post("/checkout-session/:tourId", getCheckoutSession);

router.use(restrictTo("admin", "lead-guide"));

router.route("/").get(getAllBookings).post(createBooking);

router.route("/:id").get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
