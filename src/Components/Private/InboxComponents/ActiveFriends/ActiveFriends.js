import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ParticipantProfile from './ParticipantProfile/ParticipantProfile';
import SingleFriend from './SingleFriend';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const ActiveFriends = () => {
    const collapse = useSelector(state => state.toggle.sidebarToggle);
    const [toggle, setToggle] = useState(false);
    return (
        <div className={`${collapse ? 'w-0' : 'w-[320px]'} h-full bg-secondary flex flex-col justify-start transition-all ease-in-out duration-300`}>
            <div className='px-4 h-[70px] w-full flex items-center gap-4 border-b border-primary'>
                <button onClick={() => setToggle(!toggle)} className={`flex items-center gap-1 text-base text-white hover:text-yellow ${toggle && "hidden"} transition-all ease-in-out`}><MdKeyboardArrowLeft /> Back To Info</button>
                <button onClick={() => setToggle(!toggle)} className={`flex items-center gap-1 text-base text-white hover:text-yellow ${!toggle && "hidden"} transition-all ease-in-out`}>Active Friends<MdKeyboardArrowRight /></button>
            </div>
            <div>
                {!toggle ?
                    <div>
                        <h2 className='p-4 text-lg font-semibold text-white'>Active Users</h2>
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

export default ActiveFriends;