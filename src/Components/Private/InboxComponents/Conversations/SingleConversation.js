import moment from 'moment/moment';
import React from 'react';
import { Link } from 'react-router-dom';

const SingleConversation = ({ conversation }) => {
    const { lastMessage, name } = conversation;

    return (
        <Link className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-primary bg-transparent}`} to={`/inbox/messages/${'1234'}`}>
            <div className='w-[55px] h-[55px] flex items-center relative'>
                <img className='rounded-full w-full' src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg" alt="" />
                <div className=' absolute w-3 h-3 rounded-full bg-green bottom-1 right-1 border-[1px] border-yellow'></div>
            </div>
            <div className='w-full'>
                <div className='flex justify-between items-center gap-2'>
                    <p className='font-bold text-[#9BA2B0] line-clamp-1'>{name}</p>
                    <p className='text-xs text-[#9BA2B0]'>{moment([2022, 10, 20]).fromNow()}</p>
                </div>
                <div className='flex justify-between items-center gap-2'>
                    <p className='text-sm font-semibold text-[#9BA2B0] line-clamp-1'>{lastMessage ? lastMessage : 'Hello...'}</p>
                    {<span className='flex justify-center items-center w-6 h-5 bg-yellow rounded-full text-xs'>{'5+'}</span>}
                </div>
            </div>
        </Link>
    );
};

export default SingleConversation;