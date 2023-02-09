import moment from 'moment/moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineFileImage } from 'react-icons/ai';
import { IoMdCall, IoMdVideocam } from 'react-icons/io';

const SingleConversation = ({ conversation }) => {
    const { email } = useSelector(state => state.auth.user)
    const allactiveUsers = useSelector(state => state?.activeUsers?.activeUsers);
    const { _id, users, lastMessage, unseenMessages, timestamp, sender, img } = conversation || {};
    const participant = users.find(user => user.email !== email);

    const { id } = useParams();

    return (
        <Link className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-primary ${_id === id ? 'bg-primary' : ''}`} to={`/inbox/messages/${_id}`}>
            <div className='flex items-center relative w-1/4'>
                <img className='rounded-full w-[55px] h-[55px] object-cover' src={participant?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                <div className={`absolute w-3 h-3 rounded-full ${allactiveUsers.includes(participant?.email) ? 'bg-green' : 'bg-gray-500'} bottom-1 right-1 border-[1px] border-secondary`}></div>
            </div>
            <div className='w-full'>
                <div className='flex justify-between items-center gap-2'>
                    <p className='font-bold sm:text-sm text-[#9BA2B0] line-clamp-1 break-all'>{participant?.name}</p>
                    <p className='text-xs text-[#9BA2B0]'>{timestamp ? moment(timestamp).fromNow() : ''}</p>
                </div>
                <div className='flex justify-between items-center gap-2'>
                    <div className={`text-sm break-all  ${sender !== email && unseenMessages > 0 ? 'text-white font-semibold' : 'text-[#9BA2B0]'} line-clamp-1`}>

                        {
                            (lastMessage !== 'Audio call' && lastMessage !== 'Video Call' && lastMessage !== '') ?
                                <span>
                                    {lastMessage}
                                </span> :
                                lastMessage === 'Audio call' ?
                                    <span className='flex items-center gap-1'>
                                        <IoMdCall className='text-sm' />
                                        <p>audio call</p>
                                    </span> :
                                    lastMessage === 'Video Call' ?
                                        <span className='flex items-center gap-1'>
                                            <IoMdVideocam className='text-sm' />
                                            <p>video call</p>
                                        </span> : img ? <span className='flex items-center gap-1'><AiOutlineFileImage />{sender === email ? 'Your send an image' :
                                            'You receive an image'}
                                        </span> :
                                            'You are now connected to message each other'
                        }
                    </div>
                    {unseenMessages > 0 && sender !== email && <span className='flex justify-center items-center w-6 h-5 bg-yellow rounded-full text-xs px-1'>{sender !== email && unseenMessages <= 9 ? unseenMessages : '9+'}</span>}
                </div>
            </div>
        </Link>
    );
};

export default SingleConversation;