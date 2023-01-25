import React from 'react';

const IncommingCall = ({ answerCall, callEnd }) => {
    return (
        <>
            <div className='w-[20%] h-[40%] relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-purple-500 flex justify-between items-center flex-col'>
                <div className='p-3 flex justify-center items-center bg-purple-700 w-full'>
                    <p className='text-xl text-white font-semibold'>Calling...</p>
                </div>
                <div className='p-3 flex justify-center items-center flex-col'>
                    <img className='rounded-full w-[100px] h-[100px] xxs:w-[25px] xxs:h-[25px]' src={"https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                </div>
                <div className='p-5 w-full flex justify-center gap-5'>
                    <button className='px-3 py-1 bg-purple-900 hover:bg-purple-800 text-white rounded-full' onClick={answerCall}>Receive</button>
                    <button onClick={callEnd} className='px-3 py-1 bg-red-900 hover:bg-red-600 text-white rounded-full'>Decline</button>
                </div>
            </div>
        </>
    );
};

export default IncommingCall;