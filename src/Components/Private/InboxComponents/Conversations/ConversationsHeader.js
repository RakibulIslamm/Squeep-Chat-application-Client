import React from 'react';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5'

const ConversationsHeader = () => {
    const [isActive, setIsActive] = useState(false);
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'input_box' || e.target.id === 'search_container') {
            setIsActive(true);
        }
        else {
            setIsActive(false);
        }
    })


    return (
        <div className='px-4 h-[140px] flex items-center'>
            <div className='space-y-4 w-full'>
                {<h2 className='text-xl font-medium text-white flex items-center gap-2'>Messages {<span className='rounded-full bg-yellow text-lightBlack text-sm font-normal w-6 h-6 flex items-center justify-center'>9+</span>} </h2>}
                <div className='relative'>
                    <input id='input_box' className={`px-3 py-2 rounded-md ${isActive ? 'rounded-b-none' : 'rounded-md'} w-full outline-none bg-primary text-white`} type="text" placeholder='Search...' />
                    <button className='text-2xl text-white absolute top-1/2 right-2 transform -translate-y-1/2'>
                        <IoSearchOutline />
                    </button>
                    <div id='search_container' className={`bg-secondary absolute w-full overflow-hidden overflow-y-auto bg-opacity-80 backdrop-blur-[3px] text-gray-300 scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full ${isActive ? 'h-[300px] z-40 shadow-2xl border border-primary rounded-b-md' : 'h-[0px]'}`}>
                        <p className='p-3 z-50'>Search by Name</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationsHeader;