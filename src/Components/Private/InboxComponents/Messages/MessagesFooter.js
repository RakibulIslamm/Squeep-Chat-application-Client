import { BiImageAdd } from 'react-icons/bi'
import { MdAttachFile, MdSend } from 'react-icons/md'

const MessagesFooter = () => {
    return (
        <form className='w-full h-[70px] px-6 border-l border-r flex items-center gap-3 border-t border-secondary relative'>
            <div className='w-full relative'>
                <input className='w-full pl-4 pr-20 py-2 rounded-full bg-[#333f53] text-white outline-none border border-[#8b99b3]' type="text" name='message' placeholder='Type Your Message...' />
                <div className='absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-2'>
                    <MdAttachFile className='text-white text-2xl' />
                    <BiImageAdd className='text-white text-2xl' />
                </div>
            </div>
            <button type='submit' className='p-2 bg-yellow rounded-full'>
                <MdSend className='text-primary text-2xl' />
            </button>
        </form>
    );
};

export default MessagesFooter;