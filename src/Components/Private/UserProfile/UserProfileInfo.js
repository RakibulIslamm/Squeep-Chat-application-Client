import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetMyFriendsQuery, useGetRequestedFriendsQuery } from '../../../features/friends/friendsApi';

const UserProfileInfo = ({ user }) => {
    const { email: myEmail } = useSelector(state => state.auth.user);
    const { data: requestedUsers, isLoading: reqLoading } = useGetRequestedFriendsQuery(myEmail);
    const { data: friends, isLoading } = useGetMyFriendsQuery(myEmail);
    const isRequested = requestedUsers?.find(request => request?.friendship?.includes(user?.email));
    const isFriend = friends?.find(request => request?.friendship?.includes(user?.email));
    const navigate = useNavigate();

    return (
        <>
            <div className='w-full h-[350px] bg-secondary rounded-b-xl'>
                <img className='w-full h-full object-cover rounded-b-xl' src={"http://wallpapers.net/web/wallpapers/lamp-at-the-wall-hd-wallpaper/828x350.jpg"} alt="" />
            </div>
            <div className='w-[750px] mx-auto'>
                <div className='relative -top-7 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='relative group cursor-pointer'>
                            <img className='w-[150px] h-[150px] object-cover rounded-full border-[5px] border-primary' src={user?.img || "https://media.istockphoto.com/id/692879918/photo/what-more-can-a-girl-ask-for.jpg?b=1&s=170667a&w=0&k=20&c=2nWaAp-3PXenP8Vg7wqWndG0ci1mNSiXEbrjsp1Dj4g="} alt="" />
                        </div>
                        <div>
                            <h3 className='text-2xl font-semibold text-white'>{user?.name}</h3>
                            <p className='text-light text-gray-400 text-sm'>@{user?.username}</p>
                        </div>
                    </div>
                    {(!isLoading && !reqLoading) && <div className='flex items-center gap-2'>
                        {(!isRequested && !isFriend) && <button className='text-gray-300 px-5 py-1 border border-gray-500 rounded-md'>Add Friend</button>}

                        {isFriend && <button onClick={() => navigate(`/inbox/messages/${isFriend?.conversationId}`)} className='text-primary px-5 py-1 bg-yellow rounded-md'>Message</button>}

                        {(isFriend) && <button className='text-gray-300 px-5 py-1 border border-gray-500 rounded-md'>Friend</button>}

                        {(isRequested) && <button className='text-gray-300 px-5 py-1 border border-gray-500 rounded-md'>Requested</button>}
                    </div>}
                </div>
            </div>
        </>

    );
};

export default UserProfileInfo;