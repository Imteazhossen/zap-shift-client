import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import { FaUserSlash, FaSearch } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: riders = [], refetch, isLoading } = useQuery({
    queryKey: ['active-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active');
      return res.data;
    },
  });

  const handleDeactivate = async (rider) => {
    const confirm = await Swal.fire({
      title: `Deactivate ${rider.name}?`,
      text: 'This rider will no longer be active.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#f87171',
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/riders/${rider._id}/status`, { status: 'inactive' });
      Swal.fire('Deactivated!', `${rider.name} is no longer active.`, 'success');
      refetch();
    }
  };

  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-white">Active Riders</h2>

      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered input-sm w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-gray-400" />
        </div>
      </div>

      <div className="rounded-lg shadow-lg overflow-x-auto">
        <table className="table w-full text-sm">
          <thead className="bg-neutral text-white">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No active riders found.
                </td>
              </tr>
            )}

            {filteredRiders.map((rider) => (
              <tr key={rider._id} className="min-h-[56px]">
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.phone}</td>
                <td>{new Date(rider.createdAt).toLocaleDateString()}</td>
                <td><div class="badge animate-pulse text-black badge-primary">{rider.status}</div></td>
                <td className="text-center flex">
                    
                  <button
                    onClick={() => handleDeactivate(rider)}
                    className="btn btn-sm btn-error text-white"
                    title="Deactivate"
                  >
                    Deactive<FaUserSlash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
