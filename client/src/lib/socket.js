import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io(
    import.meta.env.MODE === "production"
      ? "https://chat-application-jxh8.vercel.app" // ✅ backend root on Vercel
      : "http://localhost:4000",
    {
      query: { userId },
      withCredentials: true,
    }
  );
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
