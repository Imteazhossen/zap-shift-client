import React from 'react';
import { useForm } from 'react-hook-form';
import Social from '../Social/Social';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {signIn} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const form = location.state?.form || '/';

    const onSubmit = (data) => {
        signIn(data.email, data.password)
        .then(result => {
            console.log(result.user);
            navigate(form);
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-sm'>
                <div className='space-y-2'>
                    <h1 className="text-3xl font-extrabold">Welcome Back</h1>
                    <p>Login with ProFast</p>
                </div>

                <fieldset className="fieldset">
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

                    <div>
                        <a className="link link-hover underline">Forgot password?</a>
                    </div>

                    <button className="btn text-black mt-4 bg-primary">Login</button>
                    <p className='pt-5'>Don't have an account? Please <Link state={{form}} to="/register"><span className='text-primary underline'>Register</span></Link> </p>
                    <div className="divider">Or</div>
                 <Social></Social>
                </fieldset>
            </form>
           
             
        </div>
    );
};

export default Login;