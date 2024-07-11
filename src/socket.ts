import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

const URL = process.env.NODE_ENV || "http://localhost:3000";

export const socket = io("https://tic-tac-toe-server-v8ld.onrender.com/", { transports: ['websocket'] });
// export const socket = io("http://192.168.88.248:3000", { transports: ['websocket'] });

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("connection_error", (err) => {
  console.log(err)
});