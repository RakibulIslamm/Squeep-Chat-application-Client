import ConversationsHeader from './ConversationsHeader';
import SingleConversation from './SingleConversation';

const Conversations = () => {
    const conversation = {
        name: "Rakibul Islam",
        lastMessage: 'Hello'
    }

    return (
        <div className='w-[320px] h-full bg-secondary flex flex-col justify-start'>
            {/* conversation header Goes here */}
            <ConversationsHeader />
            <div className='h-[calc(100%_-_140px)] w-full overflow-auto scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                <SingleConversation conversation={conversation} />
                <SingleConversation conversation={conversation} />
                <SingleConversation conversation={conversation} />
                <SingleConversation conversation={conversation} />
                <SingleConversation conversation={conversation} />
                <SingleConversation conversation={conversation} />
            </div>
        </div>
    );
};

export default Conversations;