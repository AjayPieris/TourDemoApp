// Optional: wire these to your backend later if you want persistence or push notifications.

export async function fetchNotifications(userId) {
  // Example: GET /api/users/:id/notifications
  // const res = await fetch(`/api/users/${userId}/notifications`);
  // return await res.json();
  return []; // no-op for now
}

export async function postNotification(userId, notification) {
  // Example: POST /api/users/:id/notifications
  // await fetch(`/api/users/${userId}/notifications`, { method: 'POST', body: JSON.stringify(notification) });
  return { ok: true };
}

export async function markAllRead(userId) {
  // Example: POST /api/users/:id/notifications/mark-all-read
  return { ok: true };
}