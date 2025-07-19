import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEye, FaMoneyBill, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const { data: parcels = [], refetch, isLoading } = useQuery({
        queryKey: ['my-parcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the parcel permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (confirm.isConfirmed) {
            const res = await axiosSecure.delete(`/parcels/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire('Deleted!', 'Parcel deleted successfully.', 'success');
                await refetch();
            }
        }
    };

    const handlePay = (_id) => {
        Swal.fire({
            title: 'Redirecting to payment...',
            text: `Tracking ID: ${_id}`,
            icon: 'info',
        });
        // Future: Redirect to payment route
        navigate(`/dashboard/payment/${_id}`)
    };

    const handleView = (parcel) => {
        Swal.fire({
            title: `Parcel - ${parcel.title}`,
            html: `
        <div style="text-align: left">
          <p><strong>Type:</strong> ${parcel.type}</p>
          <p><strong>Sender:</strong> ${parcel.senderDistrict}, ${parcel.senderArea}</p>
          <p><strong>Receiver:</strong> ${parcel.receiverDistrict}, ${parcel.receiverArea}</p>
          <p><strong>Cost:</strong> ৳${parcel.cost}</p>
          <p><strong>Created:</strong> ${format(new Date(parcel.creation_date), 'PPpp')}</p>
          <p><strong>Tracking ID:</strong> ${parcel.tracking_id}</p>
        </div>
      `,
            confirmButtonText: 'Close',
        });
    };

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="overflow-x-auto mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">📦 My Parcels ({parcels.length})</h2>

            {parcels.length === 0 ? (
                <div className="text-center text-gray-500">No parcels found.</div>
            ) : (
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Created At</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => {
                           const isPaid = parcel?.payment_status === 'paid';

                            return (
                                <tr key={parcel._id}>
                                    <td>{index + 1}</td>
                                    <td className="capitalize">{parcel.type}</td>
                                    <td>{format(new Date(parcel.creation_date), 'PPpp')}</td>
                                    <td>৳{parcel.cost}</td>
                                    <td>
                                        <span className={`badge ${isPaid ? 'badge-success bg-primary' : 'badge-warning text-white'}`}>
                                            {isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </td>
                                    <td className="flex gap-2 justify-center flex-wrap">
                                        <button
                                            onClick={() => handleView(parcel)}
                                            className="btn btn-sm btn-info text-white"
                                        >
                                            <FaEye className="mr-1" /> View
                                        </button>
                                        {!isPaid && (
                                            <button
                                                onClick={() => handlePay(parcel._id)}
                                                className="btn btn-sm btn-success text-white"
                                            >
                                                <FaMoneyBill className="mr-1" /> Pay
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(parcel._id)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            <FaTrash className="mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyParcels;
