import React from 'react';
import { useSelector } from 'react-redux';
import Friend from './Friend';
import { IoSearchOutline } from 'react-icons/io5'
import { useGetMyFriendsQuery } from '../../../../../features/friends/friendsApi';

const Friends = () => {

    const { email } = useSelector(state => state.auth.user)
    const { data: friends, isLoading, isError, isSuccess } = useGetMyFriendsQuery(email);

    let content = null
    if (isLoading) {
        content = <p className='text-white'>Loading...</p>
    }
    else if (!isLoading && isError) {
        content = <p className='text-red-500'>Internal Server Error</p>
    }
    else if (!isLoading && !isError && !friends.length) {
        content = <p className='text-white'>No People Found</p>
    }
    else if (!isLoading && !isError && isSuccess && friends.length) {
        content = friends.map(friend => <Friend key={friend._id} friend={friend} />)
    }


    return (
        <>
            <div className='w-full h-[50px] flex items-center justify-between px-6 border-b border-secondary'>
                <h2 className='text-xl font-semibold text-white '>My Friends</h2>
                <div className='relative'>
                    <input className='px-3 py-1 rounded-md w-full outline-none text-white bg-secondary' type="text" placeholder='Search friend...' />
                    <button className='text-xl text-white absolute top-1/2 right-2 transform -translate-y-1/2'>
                        <IoSearchOutline />
                    </button>
                </div>
            </div>
            <div className='px-6 py-4 w-full flex flex-wrap gap-3'>
                {content}
            </div>
        </>
    );
};

export default Friends;