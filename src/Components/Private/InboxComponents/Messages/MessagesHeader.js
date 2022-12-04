import React from 'react';
import { IoMdCall, IoMdVideocam, IoMdInformationCircle } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { handleConversationInfo } from '../../../../features/toggle/toggleSlice'
const MessagesHeader = () => {
    const dispatch = useDispatch();
    const conversationInfo = useSelector(state => state.toggle.conversationInfo);
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
            <div className='flex items-center gap-4'>
                <button><IoMdCall className='text-[30px] text-white rounded-full p-1 hover:bg-primary' /></button>
                <button><IoMdVideocam className='text-[30px] text-white rounded-full p-1 hover:bg-primary' /></button>
                <button onClick={() => dispatch(handleConversationInfo(true))}><IoMdInformationCircle className={`text-[30px] text-white rounded-full p-1 hover:bg-primary ${conversationInfo && 'bg-primary'}`} /></button>
            </div>
        </div>
    );
};

export default MessagesHeader;