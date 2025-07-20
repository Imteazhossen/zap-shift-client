import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import {
  FaClock, FaBoxOpen, FaMoneyBill, FaUserCheck,
  FaTruck, FaCheckCircle, FaSearchLocation
} from 'react-icons/fa';
import { format } from 'date-fns';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const statusIcons = {
  submitted: <FaBoxOpen className="text-blue-500" />,
  paid: <FaMoneyBill className="text-green-500" />,
  rider_assigned: <FaUserCheck className="text-indigo-500" />,
  picked_up: <FaTruck className="text-yellow-500" />,
  delivered: <FaCheckCircle className="text-green-600" />
};

const TrackParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '');
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    } catch (err) {
      setError('❌ No tracking updates found for this ID.',err);
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

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-8 justify-center">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter tracking ID..."
          className="input input-bordered w-full md:w-2/3"
        />
        <button className="btn btn-primary w-full md:w-auto">Track</button>
      </form>

      {loading && <p className="text-center text-gray-600">🔄 Loading tracking updates...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {trackingData.length > 0 && (
        <div className="space-y-5 border-l-4 border-primary pl-4">
          {trackingData.map((entry, idx) => (
            <div key={idx} className="relative pl-6">
              <div className="absolute -left-3 top-1">
                {statusIcons[entry.status] || <FaClock className="text-gray-400" />}
              </div>

              <div className="bg-base-100 shadow p-4 rounded-lg border">
                <div className="font-semibold text-lg capitalize">
                  {entry.status.replace(/_/g, ' ')}
                </div>
                {entry.description && (
                  <div className="text-sm text-gray-600">{entry.description}</div>
                )}
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <FaClock />
                  {format(new Date(entry.timestamp), 'PPpp')}
                </div>
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
