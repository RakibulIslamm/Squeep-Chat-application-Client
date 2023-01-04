import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AccountSettings = () => {
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("name"));
    return (
        <div className='py-3'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className='flex items-center gap-5'>
                    <div className='w-1/3'>
                        <input className='px-3 py-2 w-full border border-gray-600 focus:border-gray-400 disabled:bg-gray-700 outline-none rounded-lg bg-primary text-gray-300' defaultValue="Name" {...register("name", { required: true })} disabled={!isEdit} />
                        {errors.name && <span>This field is required</span>}
                    </div>
                    <div className='w-1/3'>
                        <input className='px-3 py-2 w-full border border-gray-600 outline-none rounded-lg bg-primary disabled:bg-gray-700 text-gray-300' defaultValue='username' {...register("username")} disabled />
                        {errors.username && <span>This field is required</span>}
                    </div>
                </div>

                <div className='w-1/3'>
                    <input className='px-3 py-2 w-full border border-gray-600 outline-none rounded-lg bg-primary disabled:bg-gray-700 text-gray-300' defaultValue="email@gmail.com" {...register("email")} disabled />
                    {errors.email && <span>This field is required</span>}
                </div>

                <div className='w-2/3'>
                    <textarea className='px-3 py-2 w-full min-h-[200px] border border-gray-600 disabled:bg-gray-700 focus:border-gray-400 outline-none rounded-lg bg-primary text-gray-300' defaultValue='Bio' {...register("bio")} placeholder='Bio' disabled={!isEdit} />
                    {errors.bio && <span>This field is required</span>}
                </div>
                <div className='flex items-center gap-4'>
                    <button className='px-5 py-2 border border-gray-600 rounded-lg text-gray-700 bg-yellow disabled:bg-gray-600' type="submit" disabled={!isEdit}>Update Profile</button>
                    {!isEdit && <button onClick={() => setIsEdit(!isEdit)} className='rounded-lg text-gray-300 underline' type="submit">Edit Profile</button>}
                    {isEdit && <button onClick={() => setIsEdit(!isEdit)} className='px-5 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-primary' type="submit">Cancel</button>}
                </div>
            </form>
        </div>
    );
};

export default AccountSettings;