// lib/axios.ts
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"; // Make sure this matches your Django backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// You might want to add request interceptors later for sending tokens
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken'); // Or wherever you store your token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Or `Token ${token}` depending on DRF setup
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// You might also add response interceptors for handling token expiration etc.

export default api;
