// src/sections/BenefitsSection.jsx
import React from 'react';
import BenefitCard from './BenefitCard';
import benefitImage1 from '../../../assets/benefitImages/Transit warehouse.png'
import benefitImage2 from '../../../assets/benefitImages/Vector.png'


const benefitData = [
  {
    title: 'Live Parcel Tracking',
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: benefitImage1,
  },
  {
    title: '100% Safe Delivery',
    description:
      'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    image: benefitImage2,
  },
  {
    title: '24/7 Call Center Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    image: benefitImage1,
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 px-5 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Why Choose Us
      </h2>
      <div className="flex flex-col gap-6">
        {benefitData.map((item, index) => (
          <BenefitCard
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
