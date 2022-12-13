import { BiImageAdd } from 'react-icons/bi'
import { MdAttachFile, MdSend } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetSingleConversationQuery, useUpdateConversationMutation } from '../../../../features/conversations/conversationsAPI';

const MessagesFooter = () => {
    const { email } = useSelector(state => state.auth.user);
    const { id } = useParams();

    const [updateConversation] = useUpdateConversationMutation();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const messageText = e.target.message.value;

        const messageData = { messageText, email, timestamp: new Date().getTime() };
        updateConversation({ messageData, id, email });
        e.target.reset();
        e.target.message.focus();

    }


    return (
        <form onSubmit={handleSendMessage} className='w-full h-[70px] px-6 border-l border-r flex items-center gap-3 border-t border-secondary relative'>
            <div className='w-full relative'>
                <input className='w-full pl-4 pr-20 py-2 rounded-full bg-[#333f53] text-white outline-none border border-[#8b99b3]' type="text" name='message' placeholder='Type Your Message...' />
                <div className='absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-2'>
                    <MdAttachFile className='text-white text-2xl' />
                    <BiImageAdd className='text-white text-2xl' />
                </div>
            </div>
            <button type='submit' className='p-2 bg-yellow rounded-full'>
                <MdSend className='text-primary text-2xl' />
            </button>
        </form>
    );
};

export default MessagesFooter;