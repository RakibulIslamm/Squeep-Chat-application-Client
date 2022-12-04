import { useDispatch, useSelector } from 'react-redux';
import ParticipantProfile from './ParticipantProfile/ParticipantProfile';
import SingleFriend from './SingleFriend';
import { MdArrowBack } from 'react-icons/md'
import { handleConversationInfo } from '../../../../features/toggle/toggleSlice';

const InboxSideBar = () => {
    const collapse = useSelector(state => state.toggle.sidebarToggle);
    const conversationInfo = useSelector(state => state.toggle.conversationInfo);
    const dispatch = useDispatch();
    return (
        <div className={`${collapse ? 'w-0' : 'w-[320px]'} h-full bg-secondary flex flex-col justify-start transition-all ease-in-out duration-300`}>
            <div className='px-4 h-[70px] w-full flex items-center gap-4 border-b border-primary'>
                <button onClick={() => dispatch(handleConversationInfo(false))} className={`flex items-center gap-1 text-base text-white hover:text-yellow ${!conversationInfo && "hidden"} transition-all ease-in-out`}><MdArrowBack />Back</button>
                <h3 className={`flex items-center gap-1 text-lg font-semibold text-white ${conversationInfo && "hidden"} transition-all ease-in-out`}>Active friends</h3>
            </div>
            <div>
                {!conversationInfo ?
                    <div>
                        <SingleFriend />
                        <SingleFriend />
                        <SingleFriend />
                        <SingleFriend />
                        <SingleFriend />
                    </div>
                    : <ParticipantProfile />
                }
            </div>
        </div>
    );
};

export default InboxSideBar;