import axios from 'axios';

// Base URL of your backend API
const API_URL = 'http://localhost:5000/api';

// 🧍 USER AUTHENTICATION

// Signup request → send user data (name, email, password) to backend
export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);

// Login request → send login info (email, password) to backend
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

// 🧰 SERVICES

// Add new service → send service details (name, description, price)
export const addService = (data) => axios.post(`${API_URL}/services/add`, data);

// Get all services → fetch list of services from backend
export const getServices = () => axios.get(`${API_URL}/services`);

// 📅 BOOKINGS

// Book a service → send booking info (userId, serviceId, date)
export const bookService = (data) => axios.post(`${API_URL}/bookings/book`, data);

// Get bookings → fetch bookings for a user or admin using userId and role
export const getBookings = (userId, role) =>
  axios.get(`${API_URL}/bookings`, { params: { userId, role } });
