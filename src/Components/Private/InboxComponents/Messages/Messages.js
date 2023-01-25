import { useSelector } from 'react-redux';
import Message from './Message';
import { ThreeDots } from 'react-loader-spinner';
import MessagesHeader from './MessagesHeader';
import MessagesFooter from './MessagesFooter';
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery } from '../../../../features/messages/messageAPI';
import MessagesLoader from '../../../../utils/Loader/MessagesLoader';
import { socket } from '../../../../utils/Socket.io/socket';
import { useGetSingleConversationQuery } from '../../../../features/conversations/conversationsAPI';
import VideoCalling from '../VideoCalling/VideoCalling';
import IncommingCall from '../VideoCalling/IncommingCall';
import { useEffect } from 'react';
import { useGetUserQuery } from '../../../../features/user/userApi';
import useCalling from '../../../../Hooks/useCalling';
import { useState } from 'react';

const Messages = () => {
    const collapse = useSelector(state => state.toggle.sidebarToggle);
    const { email } = useSelector(state => state.auth.user);
    const { data } = useGetUserQuery(email);
    const [callOpen, setCallOpen] = useState(false);
    const [callTime, setCallTime] = useState({});


    const { id } = useParams();
    const { data: messages, isLoading, isError, isFetching } = useGetMessagesQuery({ conversationId: id, email });
    const { data: conversation, isLoading: pLoading, isError: pError } = useGetSingleConversationQuery(id);

    const participant = (!pLoading && !pError && conversation) && conversation?.users.find(user => user.email !== email);

    const { remoteVideoRef, currentVideoRef, call, callAnswer, callerId, setCallerId, callEnded, leaveCall, toggleCamera, toggleMic, localStreamRef } = useCalling(data?._id);

    socket.on('callEnd', data => {
        leaveCall();
        setCallOpen(false);
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(function (track) {
                track.stop();
            });
        }
    })
    const callTimer = () => {
        let totalSeconds = 0;
        setInterval(() => {
            ++totalSeconds;
            var hour = Math.floor(totalSeconds / 3600);
            var minute = Math.floor((totalSeconds - hour * 3600) / 60);
            var seconds = totalSeconds - (hour * 3600 + minute * 60);
            if (hour < 10)
                hour = "0" + hour;
            if (minute < 10)
                minute = "0" + minute;
            if (seconds < 10)
                seconds = "0" + seconds;
            setCallTime({ hour, minute, seconds });
        }, 1000);
    }


    // callTimer();

    const callUser = () => {
        call(participant?._id);
        setCallOpen(true);
    }

    // console.log(callerId);
    const answerCall = () => {
        callAnswer(callerId);
        setCallOpen(true);
        callTimer();
    }

    const callEnd = () => {
        socket.emit('callEnd', true);
        leaveCall();
        setCallerId('');
        setCallOpen(false);
    }





    const handleMessageBodyClick = () => {
        if (conversation.sender !== email) {
            // console.log(email, conversation.sender);
            socket.emit('message-notification', id);
        }
    }

    let content = null;
    if (isLoading || isFetching) {
        content = <MessagesLoader />
    }
    else if (!isLoading && isError) {

    }
    else if (!isLoading && !isError && !messages.length) {
        content = <div className='h-full flex justify-center items-center'>
            <p className='text-gray-400 text-xl font-semibold'>Start Conversation</p>
        </div>
    }
    else if (!isLoading && !isError && messages.length) {
        content = messages.map(message => <Message key={message._id} message={message} email={email} />)
    }

    return (
        <>
            {
                !isLoading && isError ? <div className='flex justify-center items-center'>
                    <h2 className='text-2xl text-gray-400 font-semibold'>Conversation Not found</h2>
                </div> :
                    <div onClick={handleMessageBodyClick} className={` md:w-[calc(100%_-_320px)] sm:w-[calc(100%_-_280px)] xs:w-full ${collapse ? 'w-[calc(100%_-_320px)]' : 'w-[calc(100%_-_640px)] relative'}  h-full transition-all ease-in-out duration-300`}>
                        <div className='h-full flex flex-col justify-between'>
                            <MessagesHeader callUser={callUser} />
                            <div className='h-[calc(100%_-_140px)] w-full px-6 xxs:px-3 py-4 overflow-y-auto flex flex-col-reverse gap-4 scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                                {content}
                            </div>
                            {<div className='hidden'>
                                <div className='px-6 py-4 flex items-center gap-3'>
                                    <img className={`w-8 h-8 rounded-full`} src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg" alt="" />
                                    <span className='text-lg text-gray-800 flex items-end gap-1'>Typing<ThreeDots
                                        height="20"
                                        width="20"
                                        radius="9"
                                        color="#222021"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName=""
                                        visible={true}
                                    /></span>

                                </div>
                            </div>}
                            {/* Message Footer Goes Here */}
                            <MessagesFooter />
                        </div>
                    </div>
            }
            {callOpen && <div className='absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-50'>
                <VideoCalling toggleMic={toggleMic} toggleCamera={toggleCamera} currentVideoRef={currentVideoRef} remoteVideoRef={remoteVideoRef} callEnd={callEnd} callerId={callerId} callOpen={callOpen} />
            </div>}
            {(callerId && !callOpen) && <div className='absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full'>
                <IncommingCall answerCall={answerCall} callEnd={callEnd} />
            </div>}
        </>
    );
};

export default Messages;