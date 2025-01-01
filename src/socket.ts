import { io } from "socket.io-client";
const SERVER = import.meta.env.VITE_SOCKET_SEVER;
const mockToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MzU2OTc2NTYsImV4cCI6MTc2NzIzMzY1NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiMSIsInJvbGUiOiJzdHVkZW50IiwidXNlcm5hbWUiOiJmYWtldXNlcm5hbWUifQ.9QeNzluRhsgzYh5-AwQsRO8z-b2m0e4KGuhVG-FIFfw";

// const socket = io(SERVER, { auth: { token: mockToken } });
// socket.on("connect", function (socket) {
//   socket.on("authenticated", function () {
//     console.log("Authenticated");
//   });
//   // .emit('authenticate', {token}); //send the jwt
// });

// let socket_tmp = null;
// // try {
//   socket_tmp = io(SERVER, { auth: { token: mockToken } });
//   // socket.connect()
// } catch (error) {
//   console.log("err ===", error);
// }

export const socket = io(SERVER, { auth: { token: mockToken } });
