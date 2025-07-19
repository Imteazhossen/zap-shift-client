import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaCheck, FaEye, FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const { data: riders = [], refetch, isLoading } = useQuery({
    queryKey: ['pending-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/pending');
      return res.data;
    },
  });

  const handleView = (rider) => {
    setSelectedRider(rider);
    Swal.fire({
      title: `${rider.name}'s Info`,
      html: `
        <div style="text-align:left">
          <p><strong>Email:</strong> ${rider.email}</p>
          <p><strong>Phone:</strong> ${rider.phone}</p>
          <p><strong>Region:</strong> ${rider.region}</p>
          <p><strong>District:</strong> ${rider.district}</p>
          <p><strong>Applied:</strong> ${new Date(rider.createdAt).toLocaleDateString()}</p>
        </div>
      `,
      confirmButtonText: 'Close',
    });
  };

  const handleApprove = async (rider, email) => {
    const result = await Swal.fire({
      title: 'Approve this rider?',
      text: `Do you want to approve ${rider.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, approve',
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/riders/${rider._id}/status`, { status: 'active',
        email
       });
      Swal.fire('Approved!', `${rider.name} has been approved.`, 'success');
      refetch();
    }
  };

  const handleDelete = async (rider) => {
    const result = await Swal.fire({
      title: 'Reject this rider?',
      text: `Do you want to reject ${rider.name}'s application?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, reject',
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/riders/${rider._id}`);
      Swal.fire('Rejected!', `${rider.name} has been removed.`, 'success');
      refetch();
    }
  };

  if (isLoading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-white">Pending Rider Applications</h2>
      <div className=" rounded-lg shadow-lg">
        <table className="table w-full text-sm">
          <thead className="bg-neutral text-white">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Applied</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {riders.map((rider) => (
              <tr key={rider._id} className="hover min-h-[56px]">
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.phone}</td>
                <td>{new Date(rider.applied_at).toLocaleDateString()}</td>
                <td className="flex gap-2 justify-center  p-2 ">
                  <button
                    onClick={() => handleView(rider)}
                    className="btn btn-sm btn-info text-white "
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApprove(rider , rider.email)}
                    className="btn btn-sm btn-success text-white"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => handleDelete(rider)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No pending riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRiders;
