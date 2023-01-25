import Peer from "peerjs";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { socket } from "../utils/Socket.io/socket";


const useCalling = (currentUserId) => {
    const [peerId, setPeerId] = useState('');
    const [callerId, setCallerId] = useState('');
    const [peerConn, setPeerConn] = useState({});
    const [callClose, setCallClose] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const remoteVideoRef = useRef();
    const currentVideoRef = useRef();
    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);

    useEffect(() => {
        socket.emit('room', currentUserId);
        const peer = new Peer();
        peer.on('open', (id) => {
            setPeerId(id);
            setPeerConn(peer);
        })
        if (callClose) {
            peer.destroy();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callClose]);


    socket.on('id', id => {
        setCallerId(id)
    })

    const call = async (id) => {
        let getUserMedia = await navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true, audio: true }, (mediaStream) => {
            currentVideoRef.current.srcObject = mediaStream;
            localStreamRef.current = mediaStream;
        })
        socket.emit('room', id);
        peerConn.on('call', async call => {
            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                currentVideoRef.current.srcObject = mediaStream;
                localStreamRef.current = mediaStream;
                call.answer(mediaStream)
                call.on('stream', remoteStream => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteStreamRef.current = remoteStream
                })
            })
        })
        socket.emit('id', peerId);
    }

    const callAnswer = async (remotePeerId) => {
        let getUserMedia = await navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, async (mediaStream) => {

            currentVideoRef.current.srcObject = mediaStream;
            localStreamRef.current = mediaStream;

            const call = peerConn.call(remotePeerId, mediaStream);
            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteStreamRef.current = remoteStream;
            })
        })

    }

    const toggleCamera = () => {
        let videoTrack = localStreamRef.current.getTracks().find(track => track.kind === 'video')
        if (videoTrack.enabled) {
            videoTrack.enabled = false
        }
        else {
            videoTrack.enabled = true;
        }
        // console.log(videoTrack.enabled);
    }
    const toggleMic = () => {
        let audioTrack = localStreamRef.current.getTracks().find(track => track.kind === 'audio')
        if (audioTrack.enabled) {
            audioTrack.enabled = false
        }
        else {
            audioTrack.enabled = true;
        }
    }



    const leaveCall = () => {
        setCallEnded(true)
        setCallClose(true);
        setCallerId('');
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(function (track) {
                track.stop();
            });
        }
    }

    return {
        remoteVideoRef,
        currentVideoRef,
        call,
        callAnswer,
        callerId,
        leaveCall,
        callEnded,
        setCallerId,
        localStreamRef,
        toggleCamera,
        toggleMic
    }
}

export default useCalling;