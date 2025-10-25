import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const NotificationsContext = createContext(null);

const initialState = {
  items: [], // { id, title, message, createdAt, read, meta? }
  unread: 0,
  loaded: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ITEMS": {
      const unread = action.payload.filter(n => !n.read).length;
      return { ...state, items: action.payload, unread, loaded: true };
    }
    case "ADD": {
      const items = [action.payload, ...state.items];
      const unread = items.filter(n => !n.read).length;
      return { ...state, items, unread };
    }
    case "MARK_ALL_READ": {
      const items = state.items.map(n => ({ ...n, read: true }));
      return { ...state, items, unread: 0 };
    }
    default:
      return state;
  }
}

const STORAGE_KEY = "notifications";

export function NotificationsProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Load from localStorage (simple persistence; you can scope by user if needed)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: "SET_ITEMS", payload: Array.isArray(parsed) ? parsed : [] });
      } else {
        dispatch({ type: "SET_ITEMS", payload: [] });
      }
    } catch {
      dispatch({ type: "SET_ITEMS", payload: [] });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (state.loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.loaded]);

  const api = useMemo(() => ({
    items: state.items,
    unread: state.unread,
    loaded: state.loaded,
    addNotification: (notif) => {
      const payload = {
        id: notif.id ?? String(Date.now()),
        title: notif.title ?? "Notification",
        message: notif.message ?? "",
        createdAt: notif.createdAt ?? new Date().toISOString(),
        read: !!notif.read,
        meta: notif.meta ?? {},
      };
      dispatch({ type: "ADD", payload });
    },
    markAllRead: () => dispatch({ type: "MARK_ALL_READ" }),
    setItems: (items) => dispatch({ type: "SET_ITEMS", payload: items || [] }),
  }), [state]);

  return (
    <NotificationsContext.Provider value={api}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within a NotificationsProvider");
  return ctx;
}