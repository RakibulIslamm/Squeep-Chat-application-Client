import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllUsersQuery } from '../../../../features/user/userApi';
import SingleFriend from './SingleFriend';

const FindFriend = () => {
    const { email } = useSelector(state => state.auth.user)
    const { data: users, isLoading, isError, isSuccess } = useGetAllUsersQuery(email);

    let content = null
    if (isLoading) {
        content = <p className='text-white'>Loading...</p>
    }
    else if (!isLoading && isError) {
        content = <p className='text-red-500'>Internal Server Error</p>
    }
    else if (!isLoading && !isError && !users.length) {
        content = <p className='text-white'>No People Found</p>
    }
    else if (!isLoading && !isError && isSuccess && users.length) {
        content = users.map(user => <SingleFriend key={user._id} user={user} />)
    }
    return (
        <div className='w-[400px] h-full bg-secondary'>
            <div className='w-full h-[50px] flex items-center px-4'>
                <h2 className='text-xl font-semibold text-white'>Find People</h2>
            </div>
            <div className='space-y-4 p-4 h-[calc(100%_-_50px)] w-full overflow-auto scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {content}
            </div>
        </div>
    );
};

export default FindFriend;