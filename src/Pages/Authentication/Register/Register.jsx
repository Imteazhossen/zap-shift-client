import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import Social from '../Social/Social';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxios  from '../../../Hooks/useAxios'


const Register = () => {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance = useAxios();
     const location = useLocation();
    const navigate = useNavigate();
    const form = location.state?.form || '/';
   

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);

                // update user info in the database

                const userInfo = {
                    email: data.email,
                    role: 'user', //default role 
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);

                //user profile in firebase 
                 const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                 }
                 updateUserProfile(userProfile)
                 .then(()=> {
                    console.log('user is updated');
                    navigate(form);
                 })
                 .catch(error => {
                    console.log(error);
                 })

     

            })
            .catch(error => {
                console.log(error);
            })
    }


    const handleImageUpload = async (e) => {
        e.preventDefault();
        const image = e.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image', image);
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        const res = await axios.post(imageUploadUrl, formData);
        console.log(res.data.data.url);
        setProfilePic(res.data.data.url);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-sm'>
                <div className='space-y-2'>
                    <h1 className="text-3xl font-extrabold">Create an Account</h1>
                    <p>Register with ProFast</p>
                </div>

                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" {...register('name')} className="input w-full" placeholder="Name" />
                    <label className="label">Image</label>
                    <input type="file" onChange={handleImageUpload} className="input w-full" placeholder="Your Image" />




                    <label className="label">Email</label>
                    <input type="email" {...register('email')} className="input w-full" placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input w-full" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must contain at least 6 characters</p>
                    }
                    {
                        errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                    }



                    <button className="btn text-black mt-4 bg-primary">Register</button>
                    <p className='pt-5'>Already have an account? Please <Link to="/login"  ><span className='text-primary underline'>Login</span></Link>  </p>
                    <div className="divider">Or</div>
                    <Social></Social>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;