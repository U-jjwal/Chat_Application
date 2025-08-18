import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://chat-application-jxh8.vercel.app/api/v1" // ✅ your backend on Vercel
    : "http://localhost:4000/api/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
