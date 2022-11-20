import Message from './Message';

const Messages = () => {

    return (
        <div className={`w-full h-full transition-all ease-in-out duration-300`}>
            <div className='h-full flex flex-col justify-between'>
                {/* Message Header Goes Here */}
                <div className='h-full w-full px-6 py-4 overflow-y-auto flex flex-col-reverse gap-4 scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                    <Message email={'Me'} message={'Hello'} />
                    <Message email={'Sender'} message={'Hello'} />
                    <Message email={'Me'} message={'Hello'} />
                    <Message email={'Sender'} message={'Hello'} />
                </div>
                {<div className='px-6 py-4'>
                    <div className='w-full'>
                        {<p>Typing...</p>}
                    </div>
                </div>}
                {/* Message Footer Goes Here */}
            </div>
        </div>
    );
};

export default Messages;