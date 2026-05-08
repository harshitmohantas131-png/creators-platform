import { io } from "socket.io-client";

const getViteEnv = () => {
  try {
    return new Function("return import.meta")().env;
  } catch {
    return undefined;
  }
};

const SOCKET_URL =
  getViteEnv()?.VITE_API_URL ||
  globalThis.process?.env?.VITE_API_URL ||
  "http://localhost:5000";

const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default socket;
