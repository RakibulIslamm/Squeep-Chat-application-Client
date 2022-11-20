import React from 'react';

const MessagesHeader = () => {
    return (
        <div className='w-full h-[70px] bg-secondary px-6 border-l border-primary flex items-center border-r'>
            <div className='w-full flex items-center gap-3 py-4'>
                <img className='rounded-full w-[35px] h-[35px]' src={"https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                <div className='w-full'>
                    <div>
                        <p className='font-bold text-sm text-[#9BA2B0]'>Rakibul Islam</p>
                        <div className='flex items-center gap-1'>
                            <div className='w-2 h-2 rounded-full bg-green'></div>
                            <p className='text-xs text-[#9BA2B0]'>Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesHeader;