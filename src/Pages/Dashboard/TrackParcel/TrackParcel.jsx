import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

import { FaMapMarkerAlt, FaClock, FaSearchLocation } from 'react-icons/fa';
import { format } from 'date-fns';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const TrackParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '');
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch tracking updates if trackingId exists on mount
  useEffect(() => {
    if (trackingId) {
      fetchTracking(trackingId);
    }
  }, [trackingId]);

  const fetchTracking = async (id) => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/tracking/${id}`);
      setTrackingData(res.data);
      setError('');
    } catch (error) {
      setError('❌ No tracking updates found for this ID.', error);
      setTrackingData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    navigate(`/dashboard/track?id=${trackingId}`);
    fetchTracking(trackingId);
  };

  return (
    <div className="p-5 md:p-10 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        <FaSearchLocation className="inline mb-1 mr-2" />
        Track Your Parcel
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 mb-8 justify-center"
      >
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter tracking ID..."
          className="input input-bordered w-full md:w-2/3"
        />
        <button className="btn btn-primary w-full text-black md:w-auto">Track</button>
      </form>

      {loading && <p className="text-center text-gray-600">🔄 Loading tracking updates...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {trackingData.length > 0 && (
        <div className="space-y-5">
          {trackingData.map((entry, idx) => (
            <div
              key={idx}
              className="bg-base-100 border-l-4 border-sky-500 shadow-md p-4 rounded-lg"
            >
              <div className="flex items-center gap-2 font-semibold text-lg text-gray-700">
                <FaMapMarkerAlt className="text-sky-500" />
                <span>{entry.status}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <FaClock />
                <span>{format(new Date(entry.timestamp), 'PPpp')} — {entry.location}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && trackingData.length === 0 && !error && trackingId && (
        <p className="text-center text-gray-400">No updates found yet. Please check back later.</p>
      )}
    </div>
  );
};

export default TrackParcel;
