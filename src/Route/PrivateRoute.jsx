import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    
    const {user, loading} = useAuth();
    const location = useLocation()

    if ( loading){
        return <div className="flex justify-center items-center mt-40">
            <span className="loading loading-spinner loading-xl"></span>
        </div> ;
    }
    if(!user){
     return   <Navigate to='/login' state={{form: location.pathname}}> </Navigate>
    } 
    
    return children;
};

export default PrivateRoute;