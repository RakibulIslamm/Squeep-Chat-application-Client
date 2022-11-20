import React from 'react';
import { useSelector } from 'react-redux';
import SingleFriend from './SingleFriend';

const ActiveFriends = () => {
    const collapse = useSelector(state => state.toggle.sidebarToggle)
    return (
        <div className={`${collapse ? 'w-0' : 'w-[320px]'} h-full bg-secondary flex flex-col justify-start transition-all ease-in-out duration-300`}>
            <div className='px-4 h-[70px] flex items-center border-b border-primary'>
                <h2 className='text-xl font-semibold text-white' >Active Friends</h2>
            </div>
            <div>
                <SingleFriend />
            </div>
        </div>
    );
};

export default ActiveFriends;