import { useQuery } from '@tanstack/react-query';
import { format, isToday, isThisWeek, isThisMonth, isThisYear, parseISO } from 'date-fns';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['rider-earnings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/parcels/completed?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Helper to calculate earnings
  const getEarningAmount = (parcel) => {
    const sameDistrict = parcel.senderDistrict === parcel.receiverDistrict;
    const percent = sameDistrict ? 0.8 : 0.3;
    return parcel.cost * percent;
  };

  const earnings = parcels.map((p) => ({
    ...p,
    deliveredAt: p.delivered_at
      ? parseISO(p.delivered_at)
      : p.cashed_out_at
        ? parseISO(p.cashed_out_at)
        : parseISO(p.creation_date),
    amount: getEarningAmount(p),
  }));

  const total = earnings.reduce((sum, e) => sum + e.amount, 0);
  const cashedOut = earnings.filter((e) => e.cashed_out).reduce((sum, e) => sum + e.amount, 0);
  const pending = total - cashedOut;

  const today = earnings.filter((e) => isToday(e.deliveredAt)).reduce((sum, e) => sum + e.amount, 0);
  const thisWeek = earnings.filter((e) => isThisWeek(e.deliveredAt)).reduce((sum, e) => sum + e.amount, 0);
  const thisMonth = earnings.filter((e) => isThisMonth(e.deliveredAt)).reduce((sum, e) => sum + e.amount, 0);
  const thisYear = earnings.filter((e) => isThisYear(e.deliveredAt)).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">💰 My Earnings</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-base-100 shadow p-4 rounded">
              <h3 className="text-lg font-medium">Total Earnings</h3>
              <p className="text-green-600 text-xl font-bold">৳{total.toFixed(2)}</p>
            </div>
            <div className="bg-base-100 shadow p-4 rounded">
              <h3 className="text-lg font-medium">Cashed Out</h3>
              <p className="text-blue-600 text-xl font-bold">৳{cashedOut.toFixed(2)}</p>
            </div>
            <div className="bg-base-100 shadow p-4 rounded">
              <h3 className="text-lg font-medium">Pending</h3>
              <p className="text-red-600 text-xl font-bold">৳{pending.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-lime-300 text-black p-4 rounded shadow">
              <h4>Today</h4>
              <p className="text-xl font-bold">৳{today.toFixed(2)}</p>
            </div>
            <div className="bg-teal-700 text-white p-4 rounded shadow">
              <h4>This Week</h4>
              <p className="text-xl font-bold">৳{thisWeek.toFixed(2)}</p>
            </div>
            <div className="bg-cyan-500 text-black p-4 rounded shadow">
              <h4>This Month</h4>
              <p className="text-xl font-bold">৳{thisMonth.toFixed(2)}</p>
            </div>
            <div className="bg-amber-400 text-black p-4 rounded shadow">
              <h4>This Year</h4>
              <p className="text-xl font-bold">৳{thisYear.toFixed(2)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyEarnings;
