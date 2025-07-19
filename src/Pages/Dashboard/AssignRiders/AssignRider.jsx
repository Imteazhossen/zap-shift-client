import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { TiUserAdd } from "react-icons/ti";
import Swal from 'sweetalert2';

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load assignable parcels (paid + not_collected)
  const fetchParcels = () => {
    axiosSecure.get('/parcels')
      .then(res => {
        const filtered = res.data.filter(parcel =>
          parcel.payment_status === 'paid' &&
          parcel.delivery_status === 'not_collected'
        );
        setParcels(filtered);
      });
  };

  useEffect(() => {
    fetchParcels();
  }, [axiosSecure]);

  // Fetch riders when modal opens
  useEffect(() => {
    if (selectedParcel) {
      const district = selectedParcel.senderDistrict;
      axiosSecure.get(`/riders/by-district/${district}`)
        .then(res => setRiders(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedParcel, axiosSecure]);

  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedParcel(null);
    setIsModalOpen(false);
    setRiders([]);
  };

  const handleAssignRider = async (parcelId, riderId, riderEmail) => {
    try {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, { riderId , riderEmail});
      if (res.data.modified) {
        Swal.fire('✅ Success', 'Rider has been assigned!', 'success');
        closeModal();
        fetchParcels(); // refresh list
      }
    } catch (err) {
      console.error('Assign error:', err);
      Swal.fire('❌ Failed', 'Could not assign rider', 'error');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 Assign Riders to Parcels</h2>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table w-full text-sm">
          <thead className="bg-neutral text-white">
            <tr>
              <th>Tracking ID</th>
              <th>Type</th>
              <th>Title</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Pickup Area</th>
              <th>Delivery Area</th>
              <th>Weight</th>
              <th>Cost</th>
              <th>Created</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover">
                <td>{parcel.tracking_id}</td>
                <td>{parcel.type}</td>
                <td>{parcel.title}</td>
                <td>
                  <div>
                    <p className="font-semibold">{parcel.senderName}</p>
                    <p className="text-xs text-gray-500">{parcel.senderContact}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p className="font-semibold">{parcel.receiverName}</p>
                    <p className="text-xs text-gray-500">{parcel.receiverContact}</p>
                  </div>
                </td>
                <td>{parcel.senderArea}, {parcel.senderDistrict}</td>
                <td>{parcel.receiverArea}, {parcel.receiverDistrict}</td>
                <td>{parcel.weight}kg</td>
                <td>৳{parcel.cost}</td>
                <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                <td>
                  <span className="btn btn-warning">Not Collected</span>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => openModal(parcel)}
                    className="btn btn-primary  text-black"
                  >
                    <TiUserAdd size={25} className='animate-ping ' /> Assign Rider
                  </button>
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="12" className="text-center py-6 text-gray-500">
                  No assignable parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl shadow-lg relative animate__animated animate__fadeInDown">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Assign Rider for Parcel: <span className="text-primary">{selectedParcel.tracking_id}</span>
            </h3>

            <button className="absolute top-2 right-3 text-gray-500" onClick={closeModal}>✕</button>

            {riders.length === 0 ? (
              <p className="text-center text-gray-500">
                No riders available in <strong>{selectedParcel.senderDistrict}</strong>
              </p>
            ) : (
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {riders.map(rider => (
                  <li key={rider._id} className="border p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">{rider.name}</p>
                      <p className="text-sm text-gray-500">{rider.email} | {rider.phone}</p>
                    </div>
                    <button
                      className="btn btn-primary text-black"
                      onClick={() => handleAssignRider(selectedParcel._id, rider._id, rider.email)}
                    >
                      <TiUserAdd size={20} />  Assign
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
