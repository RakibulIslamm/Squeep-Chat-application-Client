import moment from 'moment/moment';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdCall, IoMdVideocam } from 'react-icons/io';
import { RiShareForwardLine } from 'react-icons/ri';
import { useGetUserQuery } from '../../../../features/user/userApi';
import LightBox from '../../../../utils/LightBox/LightBox';

const Message = ({ email, message, senderImg }) => {
    const [showDate, setShowDate] = useState(false)
    const { message: text, timestamp, sender, img, callTime } = message || {};
    const justify = email !== sender.email ? 'justify-end' : 'justify-start';
    const { data } = useGetUserQuery(sender?.email);


    return (
        <div className={`flex ${justify} w-full`}>
            <div className='w-full'>
                {showDate && <p className={`text-xs text-[#8b99b3] mx-8 flex ${email === sender.email ? 'justify-end' : 'justify-start'}`}>{moment(timestamp).format("dddd, Do MMMM, h:mm a")}</p>}
                <div className={`flex ${email === sender.email ? ' justify-end' : 'justify-start'}`}>
                    <div className={`flex items-center ${email === sender.email ? ' justify-end' : 'justify-end flex-row-reverse'} gap-4 group w-full`}>
                        <div className={`flex items-center gap-4 xxs:gap-3 ${email !== sender.email && 'flex-row-reverse'}`}>
                            <button className='hidden xs:block group-hover:block text-2xl xxs:text-lg text-gray-500 hover:text-white transform rotate-90' title='Manage'><BsThreeDots /></button>
                            <button className={`hidden xs:block group-hover:block text-2xl xxs:text-lg text-gray-500 hover:text-white ${email === sender.email && 'transform -scale-x-100'}`} title='Forward'><RiShareForwardLine /></button>
                        </div>
                        <div>
                            {img && <LightBox image={img} email={email} sender={sender} text={text} />}
                            {text && <div className={`px-4 xxs:px-2 py-2 xxs:py-1 xxs:text-sm ${email === sender.email ? 'bg-yellow text-lightBlack rounded-br-none border border-[#5E6778] mr-8 xxs:mr-6' : 'bg-secondary text-white rounded-bl-none ml-8 xxs:ml-6'} rounded-lg break-words ${img && 'rounded-t-none w-[250px]'} max-w-[300px]`} onClick={() => setShowDate(!showDate)}>
                                {
                                    (text !== 'Audio call' && text !== 'Video call') ? text : text === 'Audio call' ?
                                        (<div className='flex items-center gap-2 opacity-80'>
                                            <IoMdCall className='text-3xl' />
                                            <div className=''>
                                                <p className='text-normal font-semibold'>Audio Call</p>
                                                <p className='text-xs'>{(callTime?.seconds || callTime?.minute || callTime?.hour) ? `${callTime?.minute} : ${callTime?.seconds}` : 'missed call'}</p>
                                            </div>
                                        </div>) :
                                        (<div className='flex items-center gap-2 opacity-80'>
                                            <IoMdVideocam className='text-3xl' />
                                            <div className=''>
                                                <p className='text-normal font-semibold'>Video Call</p>
                                                <p className='text-xs'>{(callTime?.seconds || callTime?.minute || callTime?.hour) ? `${callTime?.minute} : ${callTime?.seconds} min` : 'missed call'}</p>
                                            </div>
                                        </div>)
                                }
                            </div>}
                        </div>
                    </div>
                </div>
                {(text || img) && <div className={`flex items-center gap-2 ${email === sender.email ? 'flex-row-reverse' : ''}`}>
                    <img className={`w-8 xxs:w-6 h-8 xxs:h-6 rounded-full object-cover`} src={(sender.email === email ? senderImg : data?.img) || 'https://www.seekpng.com/png/full/114-1149972_avatar-free-png-image-avatar-png.png'} alt="" />
                    <span className='text-xs xxs:text-[10px] text-gray-400'>{sender.email !== email && sender.name}</span>
                </div>}
            </div>
        </div>
    );
};

export default Message;