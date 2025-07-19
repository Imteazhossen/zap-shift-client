import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const generateTrackingId = () => {
    const randomString = Math.random().toString(36).substr(2, 8).toUpperCase();
    return `TRK-${randomString}`;
};

const SendParcel = () => {
    const { user } = useAuth();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [warehouses, setWarehouses] = useState([]);
    const [regions, setRegions] = useState([]);
    const axiosSecure = useAxiosSecure();

    const selectedSenderRegion = watch("senderRegion");
    const selectedReceiverRegion = watch("receiverRegion");
    const parcelType = watch("type");
    const weight = parseFloat(watch("weight")) || 0;
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/warehouses.json')
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

    const calculateCost = (type, weight, senderDistrict, receiverDistrict) => {
        const isSameDistrict = senderDistrict === receiverDistrict;
        if (type === "document") {
            return isSameDistrict ? 60 : 80;
        } else {
            if (weight <= 3) {
                return isSameDistrict ? 110 : 150;
            } else {
                const extra = Math.ceil(weight - 3) * 40;
                return isSameDistrict ? 110 + extra : 150 + extra + 40;
            }
        }
    };

    const pricingBreakdown = (data, total) => {
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        let html = `<div style="text-align:left; font-size: 16px">`;
        html += `<p><strong>Type:</strong> ${data.type}</p>`;
        if (data.type === 'document') {
            html += `<p>Base Rate (${isSameDistrict ? 'Within' : 'Outside'} District): ৳${isSameDistrict ? 60 : 80}</p>`;
        } else {
            const base = data.weight <= 3 ? (isSameDistrict ? 110 : 150) : (isSameDistrict ? 110 : 150);
            const extraKg = data.weight > 3 ? Math.ceil(data.weight - 3) : 0;
            const extraCost = extraKg * 40;
            html += `<p>Base Rate: ৳${base}</p>`;
            if (extraKg > 0) {
                html += `<p>Extra Weight Charges: ৳${extraCost} (${extraKg}kg x ৳40)</p>`;
                if (!isSameDistrict) html += `<p>Outside District Surcharge: ৳40</p>`;
            }
        }
        html += `<hr/><p style="font-size: 18px;"><strong>Total Cost: ৳${total}</strong></p>`;
        html += `</div>`;
        return html;
    };

    const onSubmit = (data) => {
        const cost = calculateCost(data.type, data.weight || 0, data.senderDistrict, data.receiverDistrict);
        const summary = pricingBreakdown(data, cost);

        const fullData = {
            ...data,
            cost,
            creation_date: new Date().toISOString(),
            user_email: user?.email || 'unknown',
            tracking_id: generateTrackingId(),
            delivery_status: 'not_collected',
        };



        Swal.fire({
            title: 'Estimated Delivery Cost',
            html: summary,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Proceed to Payment',
            cancelButtonText: 'Go Back',
            customClass: {
                confirmButton: 'bg-lime-500 text-white hover:bg-lime-600 px-4 py-2 rounded',
                cancelButton: 'bg-lime-500 text-white hover:bg-lime-600 px-4 py-2 rounded'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Final submission:", fullData);

                ///// axios 

                axiosSecure.post('/parcels', fullData)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            // TODO: here you can redirect to the payment page 

                            Swal.fire('Success!', `Parcel submitted with Tracking ID: ${fullData.tracking_id}`, 'success');
                            reset()

                            navigate('/dashboard/myParcels');
                        }
                    })

                    ;
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-5 bg-white rounded shadow">
            <h2 className="text-3xl font-bold text-center mb-2">Send a Parcel</h2>
            <p className="text-center text-gray-500 mb-6">Fill out the form to schedule your pickup and delivery</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Parcel Info */}
                <fieldset className="border-2 rounded p-4 border-[#CAEB66]">
                    <legend className="font-bold text-lg text-black">Parcel Info</legend>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div>
                            <label className="block font-semibold">Parcel Type</label>
                            <div className="flex gap-4 mt-1">
                                <label className="label cursor-pointer">
                                    <span className="label-text mr-2">Document</span>
                                    <input {...register("type", { required: true })} type="radio" value="document" className="radio checked:bg-primary" />
                                </label>
                                <label className="label cursor-pointer">
                                    <span className="label-text mr-2">Non-Document</span>
                                    <input {...register("type", { required: true })} type="radio" value="non-document" className="radio checked:bg-primary" />
                                </label>
                            </div>
                            {errors.type && <span className="text-red-500 text-sm">Parcel type is required</span>}
                        </div>

                        <div>
                            <label className="block font-semibold">Parcel Name</label>
                            <input {...register("title", { required: true })} type="text" placeholder="Describe your parcel" className="input input-bordered w-full" />
                            {errors.title && <span className="text-red-500 text-sm">Parcel name is required</span>}
                        </div>

                        {parcelType === 'non-document' && (
                            <div>
                                <label className="block font-semibold">Weight (kg)</label>
                                <input {...register("weight", { valueAsNumber: true })} type="number" className="input input-bordered w-full" />
                            </div>
                        )}
                    </div>
                </fieldset>

                {/* Sender & Receiver Side by Side */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Sender */}
                    <fieldset className="border-2 rounded p-4 border-[#CAEB66]">
                        <legend className="font-bold text-lg text-black">Sender Info</legend>
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <input {...register("senderName", { required: true })} className="input input-bordered w-full" placeholder="Sender Name" />
                            <input {...register("senderContact", { required: true })} className="input input-bordered w-full" placeholder="Contact" />
                            <select {...register("senderRegion", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {regions.map(region => <option key={region}>{region}</option>)}
                            </select>
                            <select {...register("senderDistrict", { required: true })} className="select select-bordered w-full">
                                <option value="">Select District</option>
                                {getDistrictsByRegion(selectedSenderRegion).map(d => <option key={d}>{d}</option>)}
                            </select>
                            <select {...register("senderArea", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Covered Area</option>
                                {warehouses.filter(w => w.region === selectedSenderRegion).flatMap(w => w.covered_area).map((area, idx) => (
                                    <option key={idx}>{area}</option>
                                ))}
                            </select>
                            <input {...register("senderAddress", { required: true })} className="input input-bordered w-full" placeholder="Address" />
                            <textarea {...register("pickupInstruction", { required: true })} className="textarea textarea-bordered w-full" placeholder="Pickup Instruction" />
                        </div>
                    </fieldset>

                    {/* Receiver */}
                    <fieldset className="border-2 rounded p-4 border-[#CAEB66]">
                        <legend className="font-bold text-lg text-black">Receiver Info</legend>
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <input {...register("receiverName", { required: true })} className="input input-bordered w-full" placeholder="Receiver Name" />
                            <input {...register("receiverContact", { required: true })} className="input input-bordered w-full" placeholder="Contact" />
                            <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {regions.map(region => <option key={region}>{region}</option>)}
                            </select>
                            <select {...register("receiverDistrict", { required: true })} className="select select-bordered w-full">
                                <option value="">Select District</option>
                                {getDistrictsByRegion(selectedReceiverRegion).map(d => <option key={d}>{d}</option>)}
                            </select>
                            <select {...register("receiverArea", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Covered Area</option>
                                {warehouses.filter(w => w.region === selectedReceiverRegion).flatMap(w => w.covered_area).map((area, idx) => (
                                    <option key={idx}>{area}</option>
                                ))}
                            </select>
                            <input {...register("receiverAddress", { required: true })} className="input input-bordered w-full" placeholder="Address" />
                            <textarea {...register("deliveryInstruction", { required: true })} className="textarea textarea-bordered w-full" placeholder="Delivery Instruction" />
                        </div>
                    </fieldset>
                </div>

                <div className="text-center mt-6">
                    <button type="submit" className="btn bg-primary hover:bg-sky-500 text-black px-8">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SendParcel;
