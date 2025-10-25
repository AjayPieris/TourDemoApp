import React from "react";
import { useNotifications } from "../context/NotificationsContext";
import { createBookingStatusNotification } from "../utils/bookingNotifications";

export default function NotificationsTester() {
  const { addNotification } = useNotifications();

  const sendTest = () => {
    addNotification(
      createBookingStatusNotification({
        bookingId: "demo-1",
        tourName: "Kandy Tour",
        guideName: "Sam",
        status: "approved",
      })
    );
    setTimeout(() => {
      addNotification(
        createBookingStatusNotification({
          bookingId: "demo-2",
          tourName: "Galle Fort",
          guideName: "Alex",
          status: "rejected",
        })
      );
    }, 600);
  };

  return (
    <button
      onClick={sendTest}
      className="ml-3 bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded text-sm"
      title="Add sample notifications"
    >
      + Test Notifs
    </button>
  );
}