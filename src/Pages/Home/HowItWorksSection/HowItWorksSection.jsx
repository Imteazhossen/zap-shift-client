import React from 'react';
import { FaTruck, FaMoneyBillWave, FaWarehouse, FaBuilding } from 'react-icons/fa';

const HowItWorksSection = () => {
  const howItWorksData = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaTruck className="text-3xl" />,
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaMoneyBillWave className="text-3xl" />,
    },
    {
      id: 3,
      title: "Delivery Hub",
      description: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaWarehouse className="text-3xl" />,
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaBuilding className="text-3xl" />,
    },
  ];

  return (
    <section className="py-10 px-5 md:px-20 bg-base-100">
      <h2 className="text-4xl font-bold text-left mb-10">How It Works</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {howItWorksData.map(({ id, title, description, icon }) => (
          <div key={id} className="bg-white p-6 transition duration-300 transform hover:scale-120  rounded-xl shadow-md h-full">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
