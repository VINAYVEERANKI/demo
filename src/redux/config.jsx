import { io } from "socket.io-client";

export const url = "https://comridedevbackend.azurewebsites.net";
// export const url = "https://comridebackend.firstfloor.site";
export const accessToken = localStorage.getItem("accessToken");
export const id = localStorage.getItem("id");
export const user_name = localStorage.getItem("user_name");

export const ADMIN_DETAILS = {
  accessToken: accessToken,
  id: id ?? false,
  user_name: user_name ?? false,
};
export const authHeader = {
  headers: {
    "x-access-token": ADMIN_DETAILS.accessToken,
    "Content-Type": "application/json",
  },
};

// export const socket = {
//   socketVar: null,
// };

// export const socketCon = io(url, {
//   // reconnection: true,
//   // reconnectionDelay: 1000,
//   // reconnectionDelayMax: 5000,
//   // reconnectionAttempts: 3,
//   transports: ["websocket"],
// });
// socketCon.on("connect", () => {
//   socket.socketVar = socketCon;
//   console.log("connection connected");
// });

// socket.on("disconnect", (reason) => {
//   console.log("connection disconnected", reason);
// });

// socketCon.on("connect_error", (err) => {
//   socket.socketVar = null;
//   console.log(`connect_error due to ${err.message}`);
// });

export const socket = io.connect("https://comridebackend.firstfloor.site", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 3,
  transports: ["websocket", "polling"],
  
});

socket.on("connect", () => {
  console.log("connection connected");
  console.log(socket, "connection connected");
});
socket.on("disconnect", (reason) => {
  console.log("connection disconnected", reason);
});

console.log(socket, "connection connected");

console.log(ADMIN_DETAILS.id, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");