import React from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import Loading from '../../SharedComponents/Loading/Loading';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import RiderDashboard from './RiderDashboard';
import Forbidden from '../../Forbidden/Forbidden';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();


    if (roleLoading) {
        <Loading></Loading>
    }

    if (role === 'user') {
        <UserDashboard></UserDashboard>
    }
    else if (role === 'admin') {
        <AdminDashboard></AdminDashboard>
    }
    else if (role === 'rider') {
        <RiderDashboard></RiderDashboard>
    }
    else {
        <Forbidden></Forbidden>
    }
};

export default DashboardHome;