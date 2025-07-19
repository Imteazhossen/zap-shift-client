import { useQuery } from '@tanstack/react-query';
import { FaMoneyBillWave, FaClock, FaMapMarkedAlt } from 'react-icons/fa';
// import useAuth from '../../../Hooks/useAuth';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: deliveries = [], isLoading, refetch } = useQuery({
        queryKey: ['completedDeliveries', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/parcels/completed?email=${user.email}`);
            return res.data;
        }
    });

    const handleCashOut = async (parcelId) => {
        try {
            const response = await axiosSecure.patch(`/parcels/${parcelId}/cashout`, {
                rider_email: user.email
            });

            if (response.data.success) {
                Swal.fire('✅ Cashed Out!', 'Earnings transferred to your balance.', 'success');
                refetch();
            } else {
                Swal.fire('⚠️ Already Cashed Out', response.data.message || 'No action taken.', 'info');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('❌ Error', 'Failed to cash out this delivery.', 'error');
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    const calculateEarning = (parcel) => {
        if (!parcel.receiverDistrict || !parcel.senderDistrict || !parcel.cost) return 0;

        const sameDistrict = parcel.receiverDistrict.toLowerCase() === parcel.senderDistrict.toLowerCase();
        const rate = sameDistrict ? 0.8 : 0.3;
        return Math.round(parseInt(parcel.cost) * rate);
    };

    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">📜 Completed Deliveries</h2>

            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : deliveries.length === 0 ? (
                <p className="text-center text-gray-500">No completed deliveries yet.</p>
            ) : (
                <table className="table w-full table-zebra">
                    <thead>
                        <tr className="bg-base-200 text-base-content">
                            <th>Tracking ID</th>
                            <th>Receiver</th>
                            <th>District</th>
                            <th>Delivered At</th>
                            <th>Cost</th>
                            <th>Earning</th>
                            <th>Cash Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries.map((parcel) => {
                            const earning = calculateEarning(parcel);
                            const alreadyCashed = parcel?.cashed_out === true;

                            return (
                                <tr key={parcel._id}>
                                    <td className="font-bold">{parcel.tracking_id}</td>
                                    <td>{parcel.receiverName} ({parcel.receiverContact})</td>
                                    <td className="capitalize">
                                        <FaMapMarkedAlt className="inline mr-1" />
                                        {parcel.receiverDistrict}
                                    </td>
                                    <td>
                                        <FaClock className="inline mr-1" />
                                        {parcel.delivered_at ? formatDate(parcel.delivered_at) : 'N/A'}
                                    </td>
                                    <td>৳{parcel.cost}</td>
                                    <td className="font-semibold text-green-600">৳{earning}</td>
                                    <td>
                                        <button
                                            className={`btn btn-sm text-black ${alreadyCashed ? 'btn-disabled' : 'btn-primary'}`}
                                            disabled={alreadyCashed}
                                            onClick={() => handleCashOut(parcel._id)}
                                        >
                                            <FaMoneyBillWave className="mr-1" />
                                            {alreadyCashed ? 'Cashed Out' : 'Cash Out'}
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

export default CompletedDeliveries;
