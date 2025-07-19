// src/components/BenefitCard.jsx
import React from 'react';

const BenefitCard = ({ title, description, image }) => {
  return (
    <div  className="transition duration-300 transform hover:scale-105 w-full flex flex-col md:flex-row items-center gap-5 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
      {/* Image */}
      <div className="w-full md:w-1/5 flex justify-center">
        <img src={image} alt={title} className="w-40 h-40 object-contain" />
      </div>

      {/* Vertical dashed line */}
      <div className="hidden md:block h-34 border-l-2 border-dashed border-gray-400"></div>

      {/* Text content */}
      <div className="w-full md:w-4/5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
       
    </div>
  );
};

export default BenefitCard;
