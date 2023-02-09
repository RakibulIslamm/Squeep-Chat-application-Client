import { io } from 'socket.io-client';
export const socket = io("https://squeep-chat-application.glitch.me", {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttempts: Infinity,
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
    autoConnect: true
});

