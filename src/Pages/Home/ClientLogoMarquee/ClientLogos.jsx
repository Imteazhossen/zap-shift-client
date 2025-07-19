import React from "react";
import Marquee from "react-fast-marquee";
import logo1 from '../../../assets/brands/casio.png'
import logo2 from '../../../assets/brands/amazon.png'
import logo3 from '../../../assets/brands/moonstar.png'
import logo4 from '../../../assets/brands/amazon_vector.png'
import logo5 from '../../../assets/brands/start.png'
import logo6 from '../../../assets/brands/randstad.png'
import logo7 from '../../../assets/brands/start-people 1.png'

const logos = [logo1,logo2,logo3,logo4,logo5,logo6,logo7];

const ClientLogos = () => {
  return (
    <div className="bg-white pb-16 px-10">
      <h2 className=" text-3xl md:text-4xl font-bold text-center my-20">We've helped thousands of sales teams</h2>
      <Marquee speed={60} gradient={false} pauseOnHover={true}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-8 flex items-center justify-center">
            <img
              src={logo}
              alt={`client-logo-${index}`}
              className="h-5 md:h-5 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientLogos;
