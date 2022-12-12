import { useSelector } from 'react-redux';
import Message from './Message';
import { ThreeDots } from 'react-loader-spinner';
import MessagesHeader from './MessagesHeader';
import MessagesFooter from './MessagesFooter';
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery } from '../../../../features/messages/messageAPI';

const Messages = () => {
    const collapse = useSelector(state => state.toggle.sidebarToggle);
    const { email } = useSelector(state => state.auth.user);

    const { id } = useParams();
    const { data: messages, isLoading, isError } = useGetMessagesQuery({ conversationId: id, email });

    let content = null;
    if (isLoading) {
        content = 'Loading...'
    }
    else if (!isLoading && isError) {
        content = 'error'
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
        <div className={`${collapse ? 'w-[calc(100%_-_320px)]' : 'w-[calc(100%_-_640px)]'} h-full transition-all ease-in-out duration-300`}>
            <div className='h-full flex flex-col justify-between'>
                <MessagesHeader />
                <div className='h-[calc(100%_-_140px)] w-full px-6 py-4 overflow-y-auto flex flex-col-reverse gap-4 scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
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
    );
};

export default Messages;