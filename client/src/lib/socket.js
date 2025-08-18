import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io(
    import.meta.env.MODE === "production"
      ? "https://chat-application-jxh8.vercel.app"  // 👈 backend on Vercel
      : "http://localhost:4000",
    {
      query: { userId },
      withCredentials: true,
    }
  );
  return socket;
};
