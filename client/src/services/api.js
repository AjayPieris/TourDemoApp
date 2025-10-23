import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const addService = (data) => axios.post(`${API_URL}/services/add`, data);
export const getServices = () => axios.get(`${API_URL}/services`);

export const bookService = (data) => axios.post(`${API_URL}/bookings/book`, data);
export const getBookings = (userId, role) => axios.get(`${API_URL}/bookings`, { params: { userId, role } });
