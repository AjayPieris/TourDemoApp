import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend URL

function GuideBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings safely
  const fetchBookings = async () => {
    if (!user?._id) return; // guard if user is not loaded yet
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        params: { userId: user._id, role: "guide" },
      });
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setLoading(false);
    }
  };

  // Handle booking status update
  const handleStatus = async (_id, status) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/bookings/status/${_id}`, { status });
      // Update local UI immediately
      setBookings((prev) => prev.map((b) => (b._id === _id ? { ...b, status } : b)));
      alert(res.data.message);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update booking status.");
    }
  };

  // useEffect for fetching + socket listeners
  useEffect(() => {
    fetchBookings();

    // Listen for new bookings
    socket.on("newBooking", (newBooking) => {
      if (user?._id && String(newBooking.guide) === String(user._id)) {
        setBookings((prev) => [...prev, newBooking]);
      }
    });

    // Listen for updates
    socket.on("updateBooking", (updatedBooking) => {
      setBookings((prev) =>
        prev.map((b) => (b._id === updatedBooking._id ? { ...b, status: updatedBooking.status } : b))
      );
    });

    // Cleanup on unmount
    return () => {
      socket.off("newBooking");
      socket.off("updateBooking");
    };
  }, [user?._id]); // re-run when user._id changes

  if (!user) return <p>Loading user info...</p>;
  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bookings for Your Services</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border px-4 py-2">Service</th>
              <th className="border px-4 py-2">Booked By</th>
              <th className="border px-4 py-2">Booking Date</th>
              <th className="border px-4 py-2">Booked On</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="text-center">
                <td className="border px-4 py-2">{b.service?.title}</td>
                <td className="border px-4 py-2">{b.tourist?.name}</td>
                <td className="border px-4 py-2">
                  {b.date &&
                    new Date(b.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </td>
                <td className="border px-4 py-2">
                  {b.createdAt &&
                    new Date(b.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </td>
                <td className="border px-4 py-2">{b.status}</td>
                <td className="border px-4 py-2">
                  {b.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatus(b._id, "confirmed")}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatus(b._id, "rejected")}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GuideBookings;