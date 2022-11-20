import React from 'react';
import { Link } from 'react-router-dom';

const SingleFriend = () => {
    return (
        <Link to='/app/inbox'>
            <div className='w-full flex items-center gap-3 px-4 py-4 hover:bg-primary cursor-pointer'>
                <img className='rounded-full w-[45px] h-[45px]' src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg" alt="" />
                <div className='w-full'>
                    <div>
                        <p className='font-bold text-[#9BA2B0] line-clamp-1'>Rakibul Islam</p>
                        <div className='flex items-center gap-2'>
                            <div className='w-3 h-3 rounded-full bg-green border-[1px] border-yellow'></div>
                            <p className='text-xs text-[#9BA2B0]'>Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SingleFriend;