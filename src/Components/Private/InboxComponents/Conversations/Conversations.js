import { useSelector } from 'react-redux';
import { useGetConversationsQuery } from '../../../../features/conversations/conversationsAPI';
import ConversationsLoader from '../../../../utils/Loader/ConversationsLoader';
import ConversationsHeader from './ConversationsHeader';
import SingleConversation from './SingleConversation';

const Conversations = () => {
    const { email } = useSelector(state => state.auth.user);
    const { data: conversations, isLoading, isError } = useGetConversationsQuery(email);

    let content = null;

    if (isLoading) {
        content = <ConversationsLoader />
    }
    else if (!isLoading && isError) {
        content = <p className='text-red-500 font-light px-5'>Something went wrong</p>
    }
    else if (!isLoading && !isError && !conversations.length) {
        content = <p className='text-gray-500 font-semibold text-xl px-5'>No Conversation Found</p>
    }
    else if (!isLoading && !isError && conversations.length) {
        content = conversations.map(conversation => <SingleConversation key={conversation._id} conversation={conversation} />)
    }

    return (
        <div className='w-[320px] h-full bg-secondary flex flex-col justify-start'>
            {/* conversation header Goes here */}
            <ConversationsHeader />
            <div className='h-[calc(100%_-_140px)] w-full overflow-auto scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {content}
            </div>
        </div>
    );
};

export default Conversations;