import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

const URL = import.meta.env.API_URL || "http://localhost:3000";

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