import React, { useState } from "react";
import { bookService } from "../services/api";

const Booking = ({ user, service, onClose }) => {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async (e) => {
    e.preventDefault();

    // ✅ Ensure user is logged in and is a tourist
    if (!user || !user._id || user.role !== "tourist") {
      alert("Only logged-in tourists can book services.");
      return;
    }

    // ✅ Ensure guide ID is correct
    const guideId = service.guide._id || service.guide;

    const bookingData = {
      service: service._id,
      tourist: user._id,
      guide: guideId,
      date,
    };

    setLoading(true);
    try {
      const res = await bookService(bookingData);
      alert("Service booked successfully!");
      console.log(res.data);
      onClose();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error booking service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-blue-600">
        Book: {service.title}
      </h3>
      <form onSubmit={handleBook} className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
