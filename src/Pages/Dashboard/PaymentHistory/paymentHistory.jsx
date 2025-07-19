import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaCreditCard,
  FaBox,
  FaClock,
} from 'react-icons/fa';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return <div className="text-center mt-10">Loading payment history...</div>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        <FaCreditCard className="inline mr-3" />Payment History
      </h2>

      {payments.length === 0 ? (
        <div className="text-center text-gray-500">
          No payment history available.
        </div>
      ) : (
        <table className="table table-zebra w-full bg-white rounded-md shadow">
          <thead className="bg-base-200 text-base font-semibold text-gray-600">
            <tr>
              <th>#</th>
              <th><FaFileInvoiceDollar className="inline mr-1" />Transaction ID</th>
              <th><FaMoneyBillWave className="inline mr-1" />Amount</th>
              <th><FaCreditCard className="inline mr-1" />Method</th>
              <th><FaBox className="inline mr-1" />Parcel ID</th>
              <th><FaClock className="inline mr-1" />Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td className="text-xs break-all text-gray-700">{payment.transactionId}</td>
                <td className="text-green-600 font-bold">৳{payment.amount}</td>
                <td className="uppercase">{payment.paymentMethod?.[0]}</td>
                <td className="text-xs text-gray-500">{payment.parcelId}</td>
                <td>{new Date(payment.paid_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
