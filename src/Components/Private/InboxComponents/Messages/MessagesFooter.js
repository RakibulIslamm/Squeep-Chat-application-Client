import { BiImageAdd } from 'react-icons/bi'
import { MdAttachFile, MdSend } from 'react-icons/md'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import apiSlice from '../../../../features/api/apiSlice';
import { useGetSingleConversationQuery, useUpdateConversationMutation } from '../../../../features/conversations/conversationsAPI';
import { useSendMessageMutation } from '../../../../features/messages/messageAPI';

const MessagesFooter = () => {
    const { name, email } = useSelector(state => state.auth.user);
    const { id } = useParams();

    const { data: conversation } = useGetSingleConversationQuery(id);
    const [updateConversation] = useUpdateConversationMutation();
    const [sendMessage] = useSendMessageMutation()
    const receiver = conversation?.users?.find(user => user.email !== email);

    const dispatch = useDispatch();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const messageText = e.target.message.value;
        if (!messageText) {
            return;
        }
        const data = {
            conversationId: id,
            sender: {
                name: name,
                email: email
            },
            receiver: {
                name: receiver.name,
                email: receiver?.email
            },
            message: messageText,
            timestamp: new Date().getTime(),
        }
        dispatch(
            apiSlice.util.updateQueryData('getMessages', { conversationId: id, email }, draft => {
                const message = {
                    _id: parseInt(draft.length) + 1,
                    ...data
                }
                draft.unshift(message);
            })
        )
        const messageData = { messageText, email, timestamp: new Date().getTime() };
        updateConversation({ messageData, id, email });
        // socket.emit("getMessage", data);
        sendMessage(data);
        e.target.reset();
        e.target.message.focus();
    }


    return (
        <form onSubmit={handleSendMessage} className='w-full h-[70px] xxs:h-[50px] px-6 xxs:px-3 border-l border-r flex items-center gap-3 border-t border-secondary relative'>
            <button className='hidden xxs:block p-2 xxs:p-0 bg-yellow xxs:bg-transparent rounded-full'>
                <BiArrowBack className='text-primary xxs:text-yellow text-2xl xxs:text-xl' />
            </button>
            <div className='w-full relative'>
                <input className='w-full pl-4 xxs:pl-3 pr-20 xxs:pr-16 py-2 xxs:py-1 rounded-full bg-[#333f53] text-white outline-none border border-[#8b99b3] xxs:text-sm xxs:placeholder:text-xs' type="text" name='message' placeholder='Type Your Message...' />
                <div className='absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-2'>
                    <MdAttachFile className='text-white text-2xl xxs:text-xl' />
                    <BiImageAdd className='text-white text-2xl xxs:text-xl' />
                </div>
            </div>
            <button type='submit' className='p-2 xxs:p-0 bg-yellow xxs:bg-transparent rounded-full'>
                <MdSend className='text-primary xxs:text-yellow text-2xl xxs:text-xl' />
            </button>
        </form>
    );
};

export default MessagesFooter;