import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // allow external access (ngrok/devices)
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "b576789d43a4.ngrok-free.app", // your frontend ngrok domain
      "c29b167a6a36.ngrok-free.app", // your backend ngrok domain (for proxy)
    ],
    proxy: {
      "/api": {
        target: "https://c29b167a6a36.ngrok-free.app", // backend ngrok URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
