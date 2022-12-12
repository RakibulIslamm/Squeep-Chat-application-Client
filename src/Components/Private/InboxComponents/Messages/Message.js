import moment from 'moment/moment';
import React, { useState } from 'react';

const Message = ({ email, message }) => {
    const [showDate, setShowDate] = useState(false)
    const { message: text, timestamp, sender } = message || {};
    const justify = email !== sender.email ? 'justify-end' : 'justify-start';

    return (
        <div className={`flex ${justify} w-full`}>
            <div className='w-full'>
                {showDate && <p className={`text-xs text-[#8b99b3] mx-8 flex ${email === sender ? 'justify-end' : 'justify-start'}`}>{moment(timestamp).format("dddd, Do MMMM, h:mm a")}</p>}
                <div className={`flex ${email === sender.email ? ' justify-end' : 'justify-start'}`}>
                    <p className={`px-4 py-2 ${email === sender.email ? 'bg-yellow text-lightBlack rounded-br-none border border-[#5E6778]' : 'bg-secondary text-white rounded-bl-none'} rounded-lg mx-8`} onClick={() => setShowDate(!showDate)}>{text}</p>
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