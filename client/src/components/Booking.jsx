import React, { useState } from 'react';
import { bookService } from '../services/api';

const Booking = ({ user, service, onClose }) => {
  const [date, setDate] = useState('');

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const res = await bookService({
        service: service._id,
        tourist: user._id,
        guide: service.guide._id,
        date,
      });
      alert('Service booked successfully!');
      console.log(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error booking service.');
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '15px', marginTop: '10px' }}>
      <h3>Book: {service.title}</h3>
      <form onSubmit={handleBook}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Confirm Booking</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default Booking;
