import React from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { TiCamera } from 'react-icons/ti'

const MyProfileInfo = ({ user }) => {
    const { name, username, img } = user || {};
    const navigate = useNavigate();
    return (
        <>
            <div className='w-full h-[300px] bg-secondary rounded-b-xl relative'>
                <img className='w-full h-full object-cover rounded-b-xl' src={"http://wallpapers.net/web/wallpapers/lamp-at-the-wall-hd-wallpaper/828x350.jpg"} alt="" />
                <button className=' absolute right-6 bottom-4 px-5 py-1 bg-white bg-opacity-25 rounded-lg hover:bg-opacity-100 transition-all ease-in-out font-medium flex items-center gap-2'><TiCamera /> Edit cover photo</button>
            </div>
            <div className='w-[700px] mx-auto'>
                <div className='relative -top-5 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='relative group cursor-pointer'>
                            <img className='w-[120px] h-[120px] object-cover rounded-full border-[5px] border-primary' src={img || "https://media.istockphoto.com/id/692879918/photo/what-more-can-a-girl-ask-for.jpg?b=1&s=170667a&w=0&k=20&c=2nWaAp-3PXenP8Vg7wqWndG0ci1mNSiXEbrjsp1Dj4g="} alt="" />
                            <div className='w-[120px] h-[120px] bg-black invisible rounded-full absolute top-0 left-0 opacity-0 border-[5px] border-primary group-hover:visible group-hover:opacity-70 transition-all'></div>
                            <MdOutlineAddPhotoAlternate className='absolute right-0 bottom-5 text-2xl text-white invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all' />
                        </div>
                        <div>
                            <h3 className='text-xl font-semibold text-white'>{name}</h3>
                            <p className='text-light text-gray-400 text-sm'>@{username}</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('/settings')} className='text-gray-300 px-5 py-1 border border-gray-500 rounded-md'>Edit Profile</button>
                </div>
            </div>
        </>
    );
};

export default MyProfileInfo;