import moment from 'moment/moment';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { RiShareForwardLine } from 'react-icons/ri';

const Message = ({ email, message }) => {
    const [showDate, setShowDate] = useState(false)
    const { message: text, timestamp, sender, img } = message || {};
    const justify = email !== sender.email ? 'justify-end' : 'justify-start';

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
                            {img && <img className={`w-[250px] object-contain ${email === sender.email ? 'mr-8 xxs:mr-6' : 'ml-8 xxs:ml-6'} ${text ? 'rounded-t-lg' : 'rounded-lg'}`} src={img} alt="" />}
                            {text && <p className={`px-4 xxs:px-2 py-2 xxs:py-1 xxs:text-sm ${email === sender.email ? 'bg-yellow text-lightBlack rounded-br-none border border-[#5E6778] mr-8 xxs:mr-6' : 'bg-secondary text-white rounded-bl-none ml-8 xxs:ml-6'} rounded-lg break-words ${img && 'rounded-t-none w-[250px]'} max-w-[300px]`} onClick={() => setShowDate(!showDate)}>{text}</p>}
                        </div>
                    </div>
                </div>
                {(text || img) && <div className={`flex items-center gap-2 ${email === sender.email ? 'flex-row-reverse' : ''}`}>
                    <img className={`w-8 xxs:w-6 h-8 xxs:h-6 rounded-full`} src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg" alt="" />
                    <span className='text-xs xxs:text-[10px] text-gray-400'>{sender.email !== email && sender.name}</span>
                </div>}
            </div>
        </div>
    );
};

export default Message;