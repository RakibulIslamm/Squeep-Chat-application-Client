import React from 'react';
import { Link } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";

const SettingsNav = () => {
    return (
        <div className='flex items-center justify-between'>
            <div className='py-2 flex items-center justify-between gap-5 text-white'>
                <Link className='px-4 py-1 text-yellow hover:text-yellow font-medium border border-yellow hover:border-yellow rounded-lg' to='/account-settings'>Account Settings</Link>
                <Link className='px-4 py-1 text-gray-400 hover:text-yellow' to='/notification-settings'>Notification Settings</Link>
                <Link className='px-4 py-1 text-gray-400 hover:text-yellow' to='/additional-settings'>Additional Settings</Link>
            </div>
            <div className='flex items-center gap-2'>
                <h3 className='text-lg font-medium text-gray-300'>Rakibul Islam</h3>
                <RxAvatar className='text-4xl text-gray-300' />
            </div>
        </div>
    );
};

export default SettingsNav;