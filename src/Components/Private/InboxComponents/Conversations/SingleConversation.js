import moment from 'moment/moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const SingleConversation = ({ conversation }) => {
    const { email } = useSelector(state => state.auth.user)
    const allactiveUsers = useSelector(state => state?.activeUsers?.activeUsers);
    const { _id, users, lastMessage, unseenMessages, timestamp, sender } = conversation || {};
    const participant = users.find(user => user.email !== email);

    const { id } = useParams();

    return (
        <Link className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-primary ${_id === id ? 'bg-primary' : ''}`} to={`/inbox/messages/${_id}`}>
            <div className='w-[55px] h-[55px] flex items-center relative'>
                <img className='rounded-full w-full' src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg" alt="" />
                <div className={`absolute w-3 h-3 rounded-full ${allactiveUsers.includes(participant?.email) ? 'bg-green' : 'bg-gray-500'} bottom-1 right-1 border-[1px] border-secondary`}></div>
            </div>
            <div className='w-full'>
                <div className='flex justify-between items-center gap-2'>
                    <p className='font-bold sm:text-sm text-[#9BA2B0] line-clamp-1'>{participant?.name}</p>
                    <p className='text-xs text-[#9BA2B0]'>{timestamp ? moment(timestamp).fromNow() : ''}</p>
                </div>
                <div className='flex justify-between items-center gap-2'>
                    <p className={`text-sm  ${sender !== email && unseenMessages > 0 ? 'text-white font-semibold' : 'text-[#9BA2B0]'} line-clamp-1`}>{lastMessage ? lastMessage : <span>You are now connected to message each other</span>}</p>
                    {unseenMessages > 0 && sender !== email && <span className='flex justify-center items-center w-6 h-5 bg-yellow rounded-full text-xs'>{sender !== email && unseenMessages <= 9 ? unseenMessages : '9+'}</span>}
                </div>
            </div>
        </Link>
    );
};

export default SingleConversation;