import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const ProFastLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img src={logo} className='mb-2' alt="" />
                <p className='text-3xl -ml-3 font-extrabold '>ProFast</p>
            </div>
        </Link>

    );
};

export default ProFastLogo;