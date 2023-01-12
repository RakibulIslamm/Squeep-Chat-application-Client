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

const Messages = () => {
    const collapse = useSelector(state => state.toggle.sidebarToggle);
    const { email } = useSelector(state => state.auth.user);

    let content = null;
    const { id } = useParams();
    const { data: messages, isLoading, isError, isFetching } = useGetMessagesQuery({ conversationId: id, email });
    const { data: conversation } = useGetSingleConversationQuery(id);

    // console.log(messages);


    const handleMessageBodyClick = () => {
        if (conversation.sender !== email) {
            // console.log(email, conversation.sender);
            socket.emit('message-notification', id);
        }
    }

    // apiSlice.util.updateQueryData('getConversations', email, (draft) => {
    //     socket.on('message-notification-update', data => {
    //         console.log(data);
    //         if (data.result.modifiedCount) {
    //             const conversation = draft.find(c => c?._id === data.id);
    //             if (conversation._id === data.id) {
    //                 conversation.unseenMessages = 0;
    //             }
    //         }
    //     })
    // })

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
                    <div onClick={handleMessageBodyClick} className={` md:w-[calc(100%_-_320px)] sm:w-[calc(100%_-_280px)] xs:w-full ${collapse ? 'w-[calc(100%_-_320px)]' : 'w-[calc(100%_-_640px)]'}  h-full transition-all ease-in-out duration-300`}>
                        <div className='h-full flex flex-col justify-between'>
                            <MessagesHeader />
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
        </>
    );
};

export default Messages;