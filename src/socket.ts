import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

const URL = process.env.API_URL || "https://tic-tac-toe-server-v8ld.onrender.com";

export const socket = io(URL, { transports: ['websocket'] });

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("connection_error", (err) => {
  console.log(err)
});