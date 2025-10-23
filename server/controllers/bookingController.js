const Booking = require('../models/booking');

// Tourist books a service
exports.bookService = async (req, res) => {
    const { service, tourist, guide, date } = req.body;

    try {
        const booking = new Booking({ service, tourist, guide, date });
        await booking.save();
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
        }
        res.status(200).json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
