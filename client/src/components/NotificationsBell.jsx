import React from "react";
import { useNotifications } from "../context/NotificationsContext";

export default function NotificationBell() {
  const { unread, items, markAllRead } = useNotifications();
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  // Close on outside click
  React.useEffect(() => {
    function onDocClick(e) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 focus:outline-none"
        title="Notifications"
        aria-label="Notifications"
      >
        <span className="text-2xl">🔔</span>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-rose-600 text-white text-xs font-bold">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 z-50">
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <div className="font-semibold">Notifications</div>
            <button
              className="text-blue-600 hover:underline text-sm"
              onClick={() => { markAllRead(); setOpen(false); }}
            >
              Mark all read
            </button>
          </div>

          <ul className="max-h-80 overflow-auto divide-y">
            {items.length === 0 && (
              <li className="px-4 py-6 text-gray-500 text-sm text-center">
                No notifications
              </li>
            )}
            {items.map(item => (
              <li key={item.id} className="px-4 py-3 hover:bg-gray-50">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-sm text-gray-700">{item.message}</div>
                <div className="mt-1 text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>

          <div className="px-3 py-2 border-t text-right">
            <button
              className="text-gray-700 hover:text-gray-900 text-sm"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}