import React from 'react';

const MyProfileInfo = ({ user }) => {
    const { name, username, img } = user || {};
    return (
        <>
            <div className='w-full h-[300px] bg-secondary rounded-b-xl'>
                <img className='w-full h-full object-cover rounded-b-xl' src={img || "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} alt="" />
            </div>
            <div className='px-5 relative -top-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img className='w-[100px] h-[100px] object-cover rounded-full border-[5px] border-primary' src={"https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                    <div>
                        <h3 className='text-xl font-semibold text-white'>{name}</h3>
                        <p className='text-light text-gray-400 text-sm'>@{username}</p>
                    </div>
                </div>
                <button className='text-gray-300 underline'>Edit Profile</button>
            </div>
        </>
    );
};

export default MyProfileInfo;