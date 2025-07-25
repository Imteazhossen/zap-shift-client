import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const PaymentForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');

    const { parcelId } = useParams();

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }

    });

    if (isPending) {
        return 'loading....';
    }
    console.log(parcelInfo);

    const amount = parcelInfo.cost
    const amountInCents = amount * 100;
    console.log(amountInCents);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            console.log('PaymentMethod', paymentMethod);
        }

        //step-2 create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            parcelId
        })

        const clientSecret = res.data.clientSecret;


        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        })

        if (result.error) {
            setError(result.error.message);
        }
        else {
            setError('');
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded');
                console.log(result);

                //step-4 mark parcel paid also create payment history 
                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types,
                }
                const paymentRes = await axiosSecure.post('/payments', paymentData);
                if (paymentRes.data.insertedId) {
                    // Refresh parcel list
                    queryClient.invalidateQueries(['my-parcels', user.email]);

                    // Optionally: Navigate back to MyParcels page
                    navigate('/dashboard/myParcels');

                    // Optional: show success message
                    Swal.fire('Payment Successful!', 'Your parcel is now marked as paid.', 'success');
                }
            }
        }
        console.log('res from intent', res);




    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement>

                </CardElement>
                <button
                    className='p-2 btn btn-primary text-black border w-full'
                    type='submit' disabled={!stripe}>
                    Pay $ {amount}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;