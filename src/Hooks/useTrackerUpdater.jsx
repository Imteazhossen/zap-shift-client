import { useState } from 'react';
import useAxiosSecure from './useAxiosSecure'; // assumes you already have this

const useTrackUpdater = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTracking = async ({ tracking_id, status, location }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosSecure.post('/tracking', {
        tracking_id,
        status,
        location,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (err) {
      console.error('Tracking update failed:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateTracking, loading, error };
};

export default useTrackUpdater;
