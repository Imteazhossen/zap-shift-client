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
      return  <Loading></Loading>
    }

    if (role === 'user') {
        return <UserDashboard></UserDashboard>
    }
    else if (role === 'admin') {
       return  <AdminDashboard></AdminDashboard>
    }
    else if (role === 'rider') {
       return <RiderDashboard></RiderDashboard>
    }
    else {
       return <Forbidden></Forbidden>
    }
};

export default DashboardHome;