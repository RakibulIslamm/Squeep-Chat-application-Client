import React from 'react';
import { useSelector } from 'react-redux';
import CoverImageLoader from '../../../../utils/Loader/profileLoader/CoverImageLoader';
import ProfilePhotoLoader from '../../../../utils/Loader/profileLoader/ProfilePhotoLoader';
import { useGetUserQuery } from '../../../../features/user/userApi';
import MyProfileInfo from './MyProfileInfo';
import Friends from './Friends/Friends';

const MyProfile = () => {

    const { email } = useSelector(state => state.auth.user)
    const { data: user, isLoading, isError, isSuccess } = useGetUserQuery(email)
    // console.log(user);

    let content = null;
    if (isLoading) {
        content = <>
            <CoverImageLoader />
            <div className='relative bottom-8'>
                <ProfilePhotoLoader />
            </div>
        </>
    }
    else if (!isLoading && !isError && isSuccess && user?.email) {
        content = <MyProfileInfo user={user} />
    }


    return (
        <div className='w-[calc(100%_-_400px)] overflow-y-auto scrollbar-thin scrollbar-thumb-lightBlack scrollbar-track-sidebarBg scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
            {content}
            <Friends />
        </div>
    );
};

export default MyProfile;