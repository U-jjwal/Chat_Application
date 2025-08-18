import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://chat-application-jxh8.vercel.app/api/v1" : "/",
    withCredentials: true,
});
