
import React from 'react';
import { FaTruck, FaGlobe, FaBoxes, FaMoneyBillWave, FaBuilding, FaUndo } from 'react-icons/fa';

const services = [
  {
    title: 'Express & Standard Delivery',
    description:
      'We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.',
    icon: <FaTruck size={40} className="text-sky-500" />,
  },
  {
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.',
    icon: <FaGlobe size={40} className="text-sky-500" />,
  },
  {
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
    icon: <FaBoxes size={40} className="text-sky-500" />,
  },
  {
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
    icon: <FaMoneyBillWave size={40} className="text-sky-500" />,
  },
  {
    title: 'Corporate Service / Contract In Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.',
    icon: <FaBuilding size={40} className="text-sky-500" />,
  },
  {
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
    icon: <FaUndo size={40} className="text-sky-500" />,
  },
];

const OurServices = () => {
  return (
    <section className="bg-[#003c46] py-16 px-4 md:px-10 rounded-xl text-white my-15">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-300">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`bg-white text-black p-6 rounded-xl shadow transition duration-300 transform hover:scale-105 hover:bg-lime-300`}
          >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-center mb-2">{service.title}</h3>
            <p className="text-sm text-center text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
