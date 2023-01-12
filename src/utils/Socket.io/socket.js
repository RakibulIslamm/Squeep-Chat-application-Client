import { io } from 'socket.io-client';
export const socket = io("http://localhost:5000", {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 99999
});



//https://github.com/socketio/socket.io-client/issues/700

