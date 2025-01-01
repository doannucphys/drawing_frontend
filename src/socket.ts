import { io } from "socket.io-client";
const SERVER = import.meta.env.VITE_SOCKET_SEVER;
const mockToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MzU2OTc2NTYsImV4cCI6MTc2NzIzMzY1NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiMSIsInJvbGUiOiJzdHVkZW50IiwidXNlcm5hbWUiOiJmYWtldXNlcm5hbWUifQ.9QeNzluRhsgzYh5-AwQsRO8z-b2m0e4KGuhVG-FIFfw";

export const socket = io(SERVER, { auth: { token: mockToken } });
