import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; 

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;
