import React from 'react';
import { useForm } from 'react-hook-form';

const ChangePassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);
    return (
        <div className='py-3 flex flex-col gap-4'>
            <h2 className='text-xl font-semibold text-gray-300'>Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-2/4">
                <div className='w-full'>
                    <input className='px-3 py-2 w-full border border-gray-600 outline-none rounded-lg bg-primary disabled:bg-gray-700 text-gray-300' {...register("password")} type="password" placeholder='Current Password' />
                    {errors.email && <span>This field is required</span>}
                </div>
                <div className='w-full'>
                    <input className='px-3 py-2 w-full border border-gray-600 outline-none rounded-lg bg-primary disabled:bg-gray-700 text-gray-300' {...register("password")} type="newPassword" placeholder='New Password' />
                    {errors.email && <span>This field is required</span>}
                </div>
                <div className='w-full'>
                    <input className='px-3 py-2 w-full border border-gray-600 outline-none rounded-lg bg-primary disabled:bg-gray-700 text-gray-300' {...register("password")} type="confirmPassword" placeholder='Confirm Password' />
                    {errors.email && <span>This field is required</span>}
                </div>
                <button className='px-5 py-2 border border-gray-600 rounded-lg text-gray-700 bg-yellow disabled:bg-gray-600' type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;