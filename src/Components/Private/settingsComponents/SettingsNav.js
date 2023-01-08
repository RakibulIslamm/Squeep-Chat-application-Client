import React from 'react';
import { RxAvatar } from "react-icons/rx";
import SettingsCustomLink from '../../../utils/SettingsCustomLink';

const SettingsNav = () => {
    return (
        <div className='flex items-center justify-between'>
            <div className='py-2 flex items-center justify-between gap-5 text-white'>
                <SettingsCustomLink to='/settings'>Account Settings</SettingsCustomLink>
                <SettingsCustomLink to='/settings/change-password'>Change Password</SettingsCustomLink>
                <SettingsCustomLink to='/settings/notification-settings'>Notification Settings</SettingsCustomLink>
                <SettingsCustomLink to='/settings/additional-settings'>Additional Settings</SettingsCustomLink>
            </div>
            <div className='flex items-center gap-2'>
                <h3 className='text-lg font-medium text-gray-300'>Rakibul Islam</h3>
                <RxAvatar className='text-4xl text-gray-300' />
            </div>
        </div>
    );
};

export default SettingsNav;