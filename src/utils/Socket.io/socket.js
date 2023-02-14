import { io } from 'socket.io-client';
export const socket = io("http://localhost:5000", {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttempts: Infinity,
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
    autoConnect: true
});

//https://squeep-chat-application.glitch.me

