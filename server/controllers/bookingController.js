const Booking = require('../models/booking');

// Tourist books a service
exports.bookService = async (req, res) => {
    const { service, tourist, guide, date } = req.body;

    try {
        const booking = new Booking({ service, tourist, guide, date });
        await booking.save();

        // Emit new booking to clients
        const io = req.app.get('io');
        if (io) io.emit('newBooking', booking);

        res.status(201).json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all bookings for a user (Tourist or Guide)
exports.getBookings = async (req, res) => {
    const { userId, role } = req.query; // role = 'tourist' or 'guide'

    try {
        let bookings;
        if (role === 'tourist') {
            bookings = await Booking.find({ tourist: userId }).populate('service guide', 'title name email');
        } else if (role === 'guide') {
            bookings = await Booking.find({ guide: userId }).populate('service tourist', 'title name email');
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        res.status(200).json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Update booking status
exports.updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body; // 'confirmed' or 'rejected'

  const allowed = ['confirmed', 'rejected'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true, runValidators: true }
    ).populate('tourist service', 'name email title');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Emit update to clients
    const io = req.app.get('io');
    if (io) io.emit('updateBooking', booking);

    res.status(200).json({ message: 'Booking status updated', booking });
  } catch (err) {
    console.error('Error updating booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
};