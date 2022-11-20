import React from 'react';
import { IoSearchOutline } from 'react-icons/io5'

const ConversationsHeader = ({ conversations }) => {

    return (
        <div className='px-4 h-[140px] flex items-center'>
            <div className='space-y-4 w-full'>
                {<h2 className='text-xl font-medium text-white flex items-center gap-2'>Messages {<span className='rounded-full bg-yellow text-lightBlack text-sm font-normal w-6 h-6 flex items-center justify-center'>9+</span>} </h2>}
                <div className='relative'>
                    <input className='px-3 py-2 rounded-md w-full outline-none bg-primary text-white' type="text" placeholder='Search...' />
                    <button className='text-2xl text-white absolute top-1/2 right-2 transform -translate-y-1/2'>
                        <IoSearchOutline />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConversationsHeader;