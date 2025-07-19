import { useEffect, useState } from 'react';
import useAuth from './useAuth';       
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true); 

  useEffect(() => {
    if (authLoading || !user?.email) {
      setRoleLoading(false); 
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}/role`);
        setRole(res.data.role);
      } catch (error) {
        console.error('❌ Error fetching user role:', error);
        setRole(null);
      } finally {
        setRoleLoading(false); 
      }
    };

    fetchRole();
  }, [user?.email, authLoading, axiosSecure]);

  return { role, roleLoading }; 
};

export default useUserRole;
