import { useSelector } from 'react-redux';
import Message from './Message';
import { ThreeDots } from 'react-loader-spinner';
import MessagesHeader from './MessagesHeader';
import MessagesFooter from './MessagesFooter';

const Messages = () => {
    const collapse = useSelector(state => state.toggle.sidebarToggle);
    return (
        <div className={`${collapse ? 'w-[calc(100%_-_320px)]' : 'w-[calc(100%_-_640px)]'} h-full transition-all ease-in-out duration-300`}>
            <div className='h-full flex flex-col justify-between'>
                {/* Message Header Goes Here */}
                <MessagesHeader />
                <div className='h-[calc(100%_-_140px)] w-full px-6 py-4 overflow-y-auto flex flex-col-reverse gap-4 scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                    <Message email={'Me'} message={'Hello'} />
                    <Message email={'Sender'} message={'Hello'} />
                    <Message email={'Me'} message={'Hello'} />
                    <Message email={'Sender'} message={'Hello'} />
                    <Message email={'Me'} message={'Hello'} />
                    <Message email={'Sender'} message={'Hello'} />
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