import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'
import ProFastLogo from '../Pages/SharedComponents/ProFastLogo/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className="   px-10  bg-base-200  ">

            <div className="hero-content  flex-col lg:flex-row-reverse">

                <div className="flex-1 ">
                    <img
                        src={authImg}
                        className="max-w-md  h-full rounded-lg"
                    />
                </div>


                <div className='flex-1'>
                      <div className="">
                        <ProFastLogo></ProFastLogo>
                    </div>
                  
                    <Outlet></Outlet>
                </div>


            </div>
        </div>
    );
};

export default AuthLayout;