const express = require("express");
const router = express.Router();
const {
  bookService,
  getBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

router.get("/test", (req, res) => {
  res.send("Booking routes working!");
});

// Tourist books a service
router.post("/book", bookService);

// Get bookings for a user (tourist or guide)
router.get("/", getBookings);

// Guide updates booking status (approve/reject)
router.put('/status/:bookingId', updateBookingStatus);


module.exports = router;
