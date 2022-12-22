import moment from 'moment/moment';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { RiShareForwardLine } from 'react-icons/ri';

const Message = ({ email, message }) => {
    const [showDate, setShowDate] = useState(false)
    const { message: text, timestamp, sender } = message || {};
    const justify = email !== sender.email ? 'justify-end' : 'justify-start';

    return (
        <div className={`flex ${justify} w-full`}>
            <div className='w-full'>
                {showDate && <p className={`text-xs text-[#8b99b3] mx-8 flex ${email === sender.email ? 'justify-end' : 'justify-start'}`}>{moment(timestamp).format("dddd, Do MMMM, h:mm a")}</p>}
                <div className={`flex ${email === sender.email ? ' justify-end' : 'justify-start'}`}>
                    <div className={`flex items-center ${email === sender.email ? ' justify-end' : 'justify-end flex-row-reverse'} gap-4 group w-full`}>
                        <div className='flex items-center gap-4'>
                            <button className='hidden group-hover:block text-2xl text-gray-500 hover:text-white' title='Manage'><BsThreeDots /></button>
                            <button className='hidden group-hover:block text-2xl text-gray-500 hover:text-white' title='Forward'><RiShareForwardLine /></button>
                        </div>
                        <p className={`px-4 py-2 ${email === sender.email ? 'bg-yellow text-lightBlack rounded-br-none border border-[#5E6778] mr-8' : 'bg-secondary text-white rounded-bl-none ml-8'} rounded-lg`} onClick={() => setShowDate(!showDate)}>{text}</p>
                    </div>
                </div>
                <div className={`flex items-center gap-2 ${email === sender.email ? 'flex-row-reverse' : ''}`}>
                    <img className={`w-8 h-8 rounded-full`} src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg" alt="" />
                    <span className='text-xs text-gray-400'>{sender.email !== email && sender.name}</span>
                </div>
            </div>
        </div>
    );
};

export default Message;