import {createContext} from "react";

export const socket = new WebSocket("ws://localhost:8080/ws");
export const SocketContext = createContext(socket);