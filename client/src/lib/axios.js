import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "production"
    ? "https://chat-application-jxh8.vercel.app/api/v1"   // 👈 backend on Vercel
    : "http://localhost:4000/api/v1",                     // 👈 local dev
  withCredentials: true,
});
