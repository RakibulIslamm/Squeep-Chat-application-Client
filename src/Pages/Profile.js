import React from 'react';
import { Link, Outlet, useResolvedPath } from 'react-router-dom';

const Profile = () => {
    let resolved = useResolvedPath();

    return (
        <div className='w-full h-full flex'>
            <div className='w-[calc(100%_-_400px)] overflow-y-auto scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                Profile Goes here
            </div>
            <div className='h-full'>
                <div className='flex items-center gap-6 px-4 py-3 bg-secondary border-b border-primary'>
                    <Link className={` text-white text-md font-light rounded-full ${resolved.pathname === '/my-profile/find-friends' || resolved.pathname === '/my-profile' ? ' font-bold text-yellow' : ''}`} to='/my-profile/find-friends'>Find Friends</Link>

                    {/* <div className='w-[2px] h-6 bg-primary'></div> */}

                    <Link className={`text-white text-md font-light rounded-full ${resolved.pathname === '/my-profile/friend-requests' ? ' font-bold text-yellow' : ''}`} to='/my-profile/friend-requests'>Friend Requests</Link>
                </div>
                <div className='w-[400px] h-full bg-secondary'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Profile;