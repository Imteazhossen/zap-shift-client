import React from 'react';
import location from '../../../assets/location.png';

const BeMerchant = () => {
    return (
        <div data-aos="zoom-in" className=" bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] my-16 rounded-4xl p-16">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={location}
                    className="max-w-md rounded-lg "
                />
                <div>
                    <h1 className="text-4xl text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white ">
                       We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn btn-primary rounded-full text-black md:mr-5">Become a merchant</button>
                    <button className="mt-5 md:mt-0 btn btn-outline text-primary rounded-full">Earn with Profast Courier</button>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;