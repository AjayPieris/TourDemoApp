const express = require('express');
const router = express.Router();
const { bookService, getBookings } = require('../controllers/bookingController');

// Tourist books a service
router.post('/book', bookService);

// Get bookings for a user
router.get('/', getBookings);

module.exports = router;
