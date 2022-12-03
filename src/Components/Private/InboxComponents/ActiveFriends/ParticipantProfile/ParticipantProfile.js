import React from 'react';
import { BsFillBellSlashFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { MdKeyboardArrowDown } from 'react-icons/md'

const ParticipantProfile = () => {
    return (
        <div className='w-full px-4 py-4 flex flex-col items-start'>
            <img className='w-[80px] h-[80px] rounded-full' src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg" alt="" />
            <h2 className='text-lg font-semibold text-white py-3'>Rakibul Islam</h2>
            <div className='flex items-center gap-6 text-white'>
                <button className='flex flex-col items-center text-sm gap-1'><FaUser className='text-2xl border rounded-full p-1' />Profile</button>
                <button className='flex flex-col items-center text-sm gap-1'><BsFillBellSlashFill className='text-2xl border rounded-full p-1' />Mute</button>
                <button className='flex flex-col items-center text-sm gap-1'><BiSearch className='text-2xl border rounded-full p-1' />Search</button>
            </div>
            <div className='mt-8 w-full space-y-3'>
                <button className='flex w-full items-center justify-between text-md font-semibold text-white border border-primary rounded-md px-3 py-1'>Media, files and links <MdKeyboardArrowDown /></button>
                <button className='flex w-full items-center justify-between text-md font-semibold text-white border border-primary rounded-md px-3 py-1'>Privacy and Support <MdKeyboardArrowDown /></button>
            </div>
        </div>
    );
};

export default ParticipantProfile;