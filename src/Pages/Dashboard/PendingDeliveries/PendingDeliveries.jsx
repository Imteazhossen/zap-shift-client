import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaShippingFast, FaCheckCircle } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PendingDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch parcels using TanStack Query
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['riderParcels', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Mutation for status update
  const statusMutation = useMutation({
    mutationFn: ({ id, newStatus }) =>
      axiosSecure.patch(`/parcels/${id}/status`, { status: newStatus }),
    onSuccess: (_, { newStatus }) => {
      Swal.fire('✅ Updated!', `Marked as ${newStatus.replace('_', ' ')}`, 'success');
      queryClient.invalidateQueries(['riderParcels', user?.email]); // ✅ Refetch on success
    },
    onError: () => {
      Swal.fire('❌ Error', 'Could not update parcel status', 'error');
    },
  });

  const handleStatusUpdate = (id, newStatus) => {
    statusMutation.mutate({ id, newStatus });
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Pending Deliveries</h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : parcels.length === 0 ? (
        <p className="text-center text-gray-500">No tasks at the moment.</p>
      ) : (
        <table className="table w-full table-zebra">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th>Tracking ID</th>
              <th>Receiver</th>
              <th>Address</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="font-bold">{parcel.tracking_id}</td>
                <td>
                  {parcel.receiverName} ({parcel.receiverContact})
                </td>
                <td>
                  {parcel.receiverArea}, {parcel.receiverDistrict}
                </td>
                <td>
                  <span
                    className={`badge ${
                      parcel.delivery_status === 'rider_assigned'
                        ? 'badge-warning'
                        : 'badge-info'
                    }`}
                  >
                    {parcel.delivery_status.replace('_', ' ')}
                  </span>
                </td>
                <td>৳{parcel.cost}</td>
                <td className="flex flex-col gap-2">
                  {parcel.delivery_status === 'rider_assigned' && (
                    <button
                      onClick={() => handleStatusUpdate(parcel._id, 'in_transit')}
                      className="btn btn-sm text-black btn-primary"
                      disabled={statusMutation.isPending}
                    >
                      <FaShippingFast className="mr-1" /> Picked Up
                    </button>
                  )}
                  {parcel.delivery_status === 'in_transit' && (
                    <button
                      onClick={() => handleStatusUpdate(parcel._id, 'delivered')}
                      className="btn btn-sm btn-outline btn-primary"
                      disabled={statusMutation.isPending}
                    >
                      <FaCheckCircle className="mr-1" /> Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingDeliveries;
