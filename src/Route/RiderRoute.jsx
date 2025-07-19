import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { Navigate } from 'react-router';

const RiderRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { roleLoading, role } = useUserRole()

    if (loading || roleLoading) {
        return <div className="flex justify-center items-center mt-40">
            <span className="loading loading-spinner loading-xl"></span>
        </div>;
    }


    if (!user || role !== 'rider') {
        return <Navigate to='/forbidden' state={{ form: location.pathname }}> </Navigate>
    }

    return children;
};

export default RiderRoute;