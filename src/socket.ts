import { io } from "socket.io-client";

const SOCKET_URL = "https://vibra-backend-production-c7bc.up.railway.app"; 

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});


export default socket;