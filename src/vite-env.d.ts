/// <reference types="vite/client" />

interface User {
  id: string;
  username: string;
}

interface SocketPayload {
  username: string;
  classId: string;
}

interface Point {
  x: number;
  y: number;
}

interface DrawingClass {
  id: string;
  name: string;
  userList: User[];
}
