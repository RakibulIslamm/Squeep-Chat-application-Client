import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { MdCallEnd } from 'react-icons/md';
import { IoCloseOutline, IoVideocamSharp } from 'react-icons/io5';

const VideoCalling = ({ remoteVideoRef, currentVideoRef, callEnd, toggleCamera, toggleMic }) => {

    return (
        <>
            {<div className='w-2/3 h-[90%] relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl'>
                <div className='w-full h-full p-5 relative z-50'>
                    <div className='absolute w-full h-10 bg-purple-600 left-0 top-0 flex items-center justify-between pl-5'>
                        {<p className='text-lg font-medium text-white'>Calling...</p>}
                        <button onClick={callEnd} className='px-5 h-10 bg-purple-500 hover:bg-red-600'>
                            <IoCloseOutline className='text-2xl text-white' />
                        </button>
                    </div>

                    <div className=' absolute right-5 bottom-5'>
                        <video ref={currentVideoRef} className=' w-[200px] h-[150px] bg-gray-400 object-cover' autoPlay playsInline></video>
                    </div>

                    <div className=' absolute bottom-6 left-1/2 transform -translate-x-1/2'>
                        <div className='text-white text-3xl flex items-center gap-5'>
                            <button onClick={toggleMic} className='p-3 rounded-full bg-gray-700 hover:bg-opacity-80'>
                                <BsFillMicFill />
                            </button>
                            <button className='p-3 rounded-full bg-gray-700 hover:bg-opacity-80 hidden'>
                                <BsFillMicMuteFill />
                            </button>
                            <button onClick={callEnd} className='p-3 rounded-full bg-red-500 hover:bg-opacity-80'>
                                <MdCallEnd />
                            </button>
                            <button onClick={toggleCamera} className='p-3 rounded-full bg-gray-700 hover:bg-opacity-80'>
                                <IoVideocamSharp />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full bg-slate-200 absolute top-0'>
                    <video ref={remoteVideoRef} className='w-full h-full bg-purple-400 object-cover' autoPlay playsInline></video>
                </div>
            </div>
            }
        </>
    );
};

export default VideoCalling;