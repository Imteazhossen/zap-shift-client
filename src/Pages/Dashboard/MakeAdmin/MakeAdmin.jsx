import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Live search with debounce
  useEffect(() => {
    if (!email) {
      setUsers([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/users/search?email=${email}`);
        setUsers(res.data);
      } catch (err) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [email, axiosSecure]);

  const handleRoleChange = async (targetEmail, role) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `This will set ${targetEmail}'s role to '${role}'`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, proceed'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/${targetEmail}/role`, { role });
        if (res.data.modified) {
          Swal.fire('Success', `Role updated to ${role}`, 'success');
          // Refresh users list
          const updated = await axiosSecure.get(`/users/search?email=${email}`);
          setUsers(updated.data);
        }
      } catch {
        Swal.fire('Error', 'Failed to update role', 'error');
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        🔍 Manage Admin Access
      </h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Type user email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full max-w-xl mx-auto block text-sm"
        />
        {loading && <p className="text-center text-xs mt-2 text-gray-400">Searching...</p>}
      </div>

      {users.length > 0 && (
        <div className="space-y-4 max-w-xl mx-auto">
          {users.map((user, idx) => (
            <div
              key={user.email}
              className="bg-base-200 p-5 rounded-xl shadow-md border border-base-300"
            >
              <p><strong>📧 Email:</strong> {user.email}</p>
              <p>
                <strong>🛡️ Role:</strong>{' '}
                <span className={`badge ${user.role === 'admin' ? 'badge-success' : 'badge-outline'}`}>
                  {user.role}
                </span>
              </p>
              <p><strong>📅 Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>

              <div className="mt-3">
                {user.role !== 'admin' ? (
                  <button
                    onClick={() => handleRoleChange(user.email, 'admin')}
                    className="btn btn-primary text-black btn-sm mr-2"
                  >
                    ✅ Make Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleRoleChange(user.email, 'user')}
                    className="btn bg-red-500 btn-sm"
                  >
                    ❌ Remove Admin
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
