import { io } from "socket.io-client";

export default function socketTest() {
    const socket = io.connect('http://localhost:5000');

    function registerDisconnectHandler(onDisconnect) {
        socket.on('disconnect', () => {
            console.log('Disconnected');
            onDisconnect();
        });
    }
    function registerJoinHandler(onJoinSuccess) {
        socket.on('joinsuccess', (msg) => {
            console.log('join success');
            onJoinSuccess(msg);
        });
    }
    function joinNotification(channel, cb) {
        console.log(`emit join for channel:${JSON.stringify(channel)}`);
        socket.emit('joinnotificationpharmacy', channel, cb);
    }
    function registerNotificationHandler(onNotificationReceived) {
        socket.on('notification', (notification) => {
            onNotificationReceived(notification);
        });
    }
    socket.on('error', (err) => {
        console.log('received socket error:');
        console.log(err);
    });

    // return {
    //     registerDisconnectHandler,
    //     registerNotificationHandler,
    //     registerJoinHandler,
    //     joinNotification
    // };
    console.log(registerDisconnectHandler);
    console.log(registerNotificationHandler);
    console.log(registerJoinHandler);
    console.log(joinNotification);
}