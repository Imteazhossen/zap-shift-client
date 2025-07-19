import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/SharedComponents/Navbar/navbar';
import Footer from '../Pages/SharedComponents/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;