import React from 'react';

const SingleRequest = () => {
    return (
        <div className='w-full p-3 bg-gray-500'>
            <div className='flex item-start gap-3'>
                <img className='w-12 h-12 rounded-full object-cover' src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg" alt="" />
                <div>
                    <div className='flex items-center gap-3'>
                        <p className='font-semibold text-white'>Ashik khan <span className=' font-light'>send you friend request</span> </p>
                    </div>
                    <div className='flex items-center gap-3 mt-2'>
                        <button className='px-2 py-[2px] bg-[#B8F7D4] text-primary hover:bg-[#93E1E1] transition-all ease-in-out rounded-full text-sm disabled:bg-gray-400 flex items-center gap-1'>Accept</button>
                        <button className='px-2 py-[2px] bg-[#FF636D] text-primary hover:bg-red-500 hover:text-white transition-all ease-in-out rounded-full text-sm flex items-center gap-1'>Decline</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleRequest;