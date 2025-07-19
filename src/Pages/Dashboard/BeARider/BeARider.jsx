import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const [warehouses, setWarehouses] = useState([]);
  const [regions, setRegions] = useState([]);

  const selectedRegion = watch("region");

  useEffect(() => {
    fetch('warehouses.json')
      .then(res => res.json())
      .then(data => {
        setWarehouses(data);
        const uniqueRegions = [...new Set(data.map(item => item.region))];
        setRegions(uniqueRegions);
      });
  }, []);

  const getDistrictsByRegion = (region) => {
    return warehouses
      .filter(w => w.region === region)
      .map(w => w.district);
  };

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      name: user.displayName,
      email: user.email,
      status: 'pending',
      applied_at: new Date().toISOString()
    };

    axiosSecure.post('/riders', riderData)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire('Success!', 'Your rider application is submitted and under review.', 'success');
          reset();
        }
      })
      .catch(() => {
        Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
      });
      console.log(riderData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-4 text-center text-black">🚴 Become a Rider</h2>
      <p className="text-center text-gray-500 mb-6">Apply to join as a delivery rider for our platform.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name & Email (read-only) */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">Name</label>
            <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label font-semibold">Email</label>
            <input type="email" value={user?.email} readOnly className="input input-bordered w-full" />
          </div>
        </div>

        {/* Age, Phone, NID */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label font-semibold">Age</label>
            <input type="number" {...register("age", { required: true })} placeholder="Enter your age" className="input input-bordered w-full" />
            {errors.age && <p className="text-red-500 text-sm">Age is required</p>}
          </div>
          <div>
            <label className="label font-semibold">Phone Number</label>
            <input type="tel" {...register("phone", { required: true })} placeholder="01XXXXXXXXX" className="input input-bordered w-full" />
            {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
          </div>
          <div>
            <label className="label font-semibold">NID Number</label>
            <input type="text" {...register("nid", { required: true })} placeholder="National ID" className="input input-bordered w-full" />
            {errors.nid && <p className="text-red-500 text-sm">NID is required</p>}
          </div>
        </div>

        {/* Location */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">Region</label>
            <select {...register("region", { required: true })} className="select select-bordered w-full">
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region}>{region}</option>
              ))}
            </select>
            {errors.region && <p className="text-red-500 text-sm">Region is required</p>}
          </div>

          <div>
            <label className="label font-semibold">District</label>
            <select {...register("district", { required: true })} className="select select-bordered w-full">
              <option value="">Select District</option>
              {getDistrictsByRegion(selectedRegion).map(d => <option key={d}>{d}</option>)}
            </select>
            {errors.district && <p className="text-red-500 text-sm">District is required</p>}
          </div>
        </div>

        {/* Bike Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">Bike Brand</label>
            <input type="text" {...register("bikeBrand", { required: true })} placeholder="e.g. Yamaha, Honda" className="input input-bordered w-full" />
            {errors.bikeBrand && <p className="text-red-500 text-sm">Bike brand is required</p>}
          </div>
          <div>
            <label className="label font-semibold">Bike Registration Number</label>
            <input type="text" {...register("bikeRegNumber", { required: true })} placeholder="e.g. DHA 123456" className="input input-bordered w-full" />
            {errors.bikeRegNumber && <p className="text-red-500 text-sm">Registration number is required</p>}
          </div>
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button type="submit" className="btn bg-primary text-black hover:bg-sky-400 px-8">Submit Application</button>
        </div>
      </form>
    </div>
  );
};

export default BeARider;
