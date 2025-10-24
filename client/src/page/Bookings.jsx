import React, { useEffect, useState } from "react";
import axios from "axios";

function Bookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings", {
          params: { userId: user._id, role: user.role },
        });
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Service</th>
              <th className="border px-4 py-2">Guide</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="text-center">
                <td className="border px-4 py-2">{b.service.title}</td>
                <td className="border px-4 py-2">
                  {user.role === "tourist" ? b.guide.name : b.tourist.name}
                </td>
                <td className="border px-4 py-2">
                  {new Date(b.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="border px-4 py-2">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bookings;
