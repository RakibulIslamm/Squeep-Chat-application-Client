import React from 'react';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux';
import { useGetSearchedConversationQuery } from '../../../../features/conversations/conversationsAPI';
import SearchedConversation from './SearchedConversation';

const ConversationsHeader = () => {
    const [searchText, setSearchText] = useState(null);
    const { email } = useSelector(state => state.auth.user);
    const [isActive, setIsActive] = useState(false);
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'input_box' || e.target.id === 'search_container') {
            setIsActive(true);
        }
        else {
            setIsActive(false);
        }
    });

    // Search Handled by De bounce function 
    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args)
            }, delay);
        }
    }
    const doSearch = (value) => {
        if (value.length) {
            setSearchText(value);
        }
    }
    const handleSearch = debounceHandler(doSearch, 1500);
    // End De bounce

    const { data: conversations, isLoading, isError } = useGetSearchedConversationQuery({ text: searchText, email });

    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>
    }
    else if (!isLoading && isError) {
        content = <p className='text-red-500 font-light px-5'>Something went wrong</p>
    }
    else if (!isLoading && !isError && !conversations.length) {
        content = <p className='text-gray-500 font-semibold text-xl px-5'>No Conversation Found</p>
    }
    else if (!isLoading && !isError && conversations.length) {
        content = conversations.map(conversation => <SearchedConversation key={conversation._id} conversation={conversation} />)
    }

    return (
        <div className='px-4 h-[140px] flex items-center'>
            <div className='space-y-4 w-full'>
                {<h2 className='text-xl font-medium text-white flex items-center gap-2'>Messages {<span className='rounded-full bg-yellow text-lightBlack text-sm font-normal w-6 h-6 flex items-center justify-center'>9+</span>} </h2>}
                <div className='relative'>
                    <input onChange={(e) => handleSearch(e.target.value)} id='input_box' className={`px-3 py-2 rounded-md ${isActive ? 'rounded-b-none' : 'rounded-md'} w-full outline-none bg-primary text-white`} type="text" placeholder='Search...' />
                    <button className='text-2xl text-white absolute top-1/2 right-2 transform -translate-y-1/2'>
                        <IoSearchOutline />
                    </button>
                    <div id='search_container' className={`bg-secondary absolute w-full overflow-hidden overflow-y-auto bg-opacity-80 backdrop-blur-[3px] text-gray-300 scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full ${isActive ? 'h-[300px] z-40 shadow-2xl border border-primary rounded-b-md' : 'h-[0px]'}`}>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationsHeader;