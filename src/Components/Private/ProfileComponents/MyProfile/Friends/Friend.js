import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Friend = ({ friend }) => {
    const { email } = useSelector(state => state.auth.user);
    const user = friend?.users?.find(u => u.email !== email);

    return (
        <div className='flex items-center gap-3 p-3 w-[270px] rounded-xl'>
            <div className='w-[65px] h-[65px] flex items-center'>
                <img className='rounded-xl' src={user?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
            </div>
            <div>
                <p className='font-normal text-white'>{user?.name}</p>
                <Link to={`/inbox/messages/${friend?.conversationId}`} className='px-3 py-[3px] bg-yellow text-lightBlack rounded-full text-sm disabled:bg-gray-400'>Message</Link>
            </div>
        </div>
    );
};

export default Friend;