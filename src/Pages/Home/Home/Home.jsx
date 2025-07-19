import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import ClientLogos from '../ClientLogoMarquee/ClientLogos';
import BenefitsSection from '../BenefitSection/BenefitSection';
import BeMerchant from '../BeMerchant/BeMerchant';
import HowItWorksSection from '../HowItWorksSection/HowItWorksSection';
import DashedBorder from '../../SharedComponents/DashedBorder/DashedBorder';
import Reviews from '../ReviewSection/Reviews';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <HowItWorksSection></HowItWorksSection>
          <OurServices></OurServices>
          <ClientLogos></ClientLogos>
          <DashedBorder></DashedBorder>
          <BenefitsSection></BenefitsSection>
          <DashedBorder></DashedBorder>
          <BeMerchant></BeMerchant>
          <Reviews></Reviews>
        </div>
    );
};

export default Home;