import { io } from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5001";

const socket = io(SOCKET_URL, {
  transports: ["websocket"], // force websocket (no long-polling)
  reconnection: true,
  // autoConnect: false, // nếu bạn muốn connect thủ công
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Socket connect_error:", err);
});

socket.on("reconnect_attempt", (attempt) => {
  console.log("Socket reconnect attempt:", attempt);
});

export default socket;
