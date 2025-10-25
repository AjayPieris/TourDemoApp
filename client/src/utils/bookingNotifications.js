// Helpers to produce consistent messages for booking status changes

export function createBookingStatusNotification({
  bookingId,
  tourName,
  guideName,
  status, // 'approved' | 'rejected'
}) {
  const isApproved = String(status).toLowerCase() === "approved";
  const title = isApproved ? "Booking Approved" : "Booking Rejected";
  const message = isApproved
    ? `Your booking for ${tourName ?? "the tour"} was approved by ${guideName ?? "the guide"}.`
    : `Sorry, your booking for ${tourName ?? "the tour"} was rejected by ${guideName ?? "the guide"}.`;

  return {
    id: `${bookingId}-${Date.now()}`,
    title,
    message,
    createdAt: new Date().toISOString(),
    read: false,
    meta: { bookingId, status },
  };
}

// Convenience function: call this when status changes and pass addNotification from context
export function notifyBookingStatus({ addNotification, ...rest }) {
  if (typeof addNotification !== "function") return;
  const notif = createBookingStatusNotification(rest);
  addNotification(notif);
}