import { AiOutlineUserAdd } from 'react-icons/ai';

const SingleFriend = ({ user }) => {

    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <div className='w-[30px] h-[30px] flex items-center'>
                    <img className='rounded-full w-full' src={user?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                </div>
                <p className='font-normal text-white'>{user?.name}</p>
            </div>
            <button className='px-3 py-[0px] bg-yellow text-lightBlack rounded-full text-sm disabled:bg-gray-400'><span className='flex items-center gap-1'><AiOutlineUserAdd />Add Friend</span></button>
        </div>
    );
};

export default SingleFriend;