import Compressor from 'compressorjs';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ProfileImageUploading from '../../../utils/Loader/ProfileImageUploading';

const AccountSettings = () => {
    const [error, setError] = useState('')
    const [imgLink, setImgLink] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // Image compress function start>>
    const handleCompressedUpload = (image) => {
        // const image = e.target.files[0];
        if (!image) {
            console.log('Image not found')
            return;
        }
        new Compressor(image, {
            quality: .4, // 0.6 can also be used, but its not recommended to go below.
            success: async (compressedResult) => {
                // compressedResult has the compressed file.
                // Use the compressed file to upload the images to your server.
                const res = await getBase64(compressedResult);

                // imgbb image upload api start>>
                const baseUrl = res;
                const formData = new FormData();
                const str = baseUrl.split(',')[1];
                formData.append('image', str);

                try {
                    const res = await fetch(`https://api.imgbb.com/1/upload?key=e911b7196eed8bf0e10bfe59de30c793`, {
                        method: "POST",
                        body: formData
                    });
                    const data = await res.json();
                    setImgLink(data?.data?.display_url);
                }
                catch (err) {
                    setError(err);
                }
                finally {
                    setIsUploading(false)
                }

                // imgbb image upload end<<
            },
        });
    };
    // Image compress function end<<

    const handleOnChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.log('Image not found');
            return;
        }
        setIsUploading(true);
        handleCompressedUpload(file);
    }

    // Get base64 function start>>
    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };
    // Get base64 function end<<

    const onSubmit = data => console.log(data);


    return (
        <div className='py-3 flex items-start gap-10'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-2/3">
                <div className='flex items-center gap-5'>
                    <div className='w-2/4'>
                        <input className='px-3 py-2 w-full border border-gray-600 focus:border-gray-400 disabled:bg-gray-700 outline-none rounded-lg bg-primary text-gray-300' defaultValue="Name" {...register("name", { required: true })} disabled={!isEdit} />
                        {errors.name && <span>This field is required</span>}
                    </div>
                    <div className='w-2/4'>
                        <input className='px-3 py-2 w-full border border-gray-600 outline-none rounded-lg bg-primary disabled:bg-gray-700 text-gray-300' defaultValue='username' {...register("username")} disabled />
                        {errors.username && <span>This field is required</span>}
                    </div>
                </div>

                <div className='w-full'>
                    <input className='px-3 py-2 w-full border border-gray-600 outline-none rounded-lg bg-primary disabled:bg-gray-700 text-gray-300' defaultValue="email@gmail.com" {...register("email")} disabled />
                    {errors.email && <span>This field is required</span>}
                </div>

                <div className='w-full'>
                    <textarea className='px-3 py-2 w-full min-h-[200px] border border-gray-600 disabled:bg-gray-700 focus:border-gray-400 outline-none rounded-lg bg-primary text-gray-300' defaultValue='Bio' {...register("bio")} placeholder='Bio' disabled={!isEdit} />
                    {errors.bio && <span>This field is required</span>}
                </div>
                <div className='flex items-center gap-4'>
                    <button className='px-5 py-2 border border-gray-600 rounded-lg text-gray-700 bg-yellow disabled:bg-gray-600' type="submit" disabled={!isEdit}>Update Profile</button>
                    {!isEdit && <button onClick={() => setIsEdit(!isEdit)} className='rounded-lg text-gray-300 underline' type="submit">Edit Profile</button>}
                    {isEdit && <button onClick={() => setIsEdit(!isEdit)} className='px-5 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-primary' type="submit">Cancel</button>}
                </div>
            </form>
            <div className='w-1/3 space-y-3'>
                <h3 className='text-xl font-semibold text-gray-300'>Update Profile image</h3>
                <div className='w-24 h-24 relative'>
                    <img className='w-full h-full rounded-full object-cover' src={imgLink || 'https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg'} alt="" />
                    {isUploading && <div className='opacity-80 absolute top-0 left-0'>
                        <ProfileImageUploading />
                        <p className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white'>uploading...</p>
                    </div>}
                </div>
                <div>
                    <input onChange={handleOnChange} type="file" accept='image/*' />
                    <br />
                    <button className='px-4 py-1 border border-gray-600 rounded-lg text-gray-700 bg-yellow disabled:bg-gray-600 mt-2' disabled={!imgLink || isUploading} type="submit">Save</button>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;