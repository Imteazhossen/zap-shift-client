import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerImage1 from '../../../assets/banner/banner1.png'
import bannerImage2 from '../../../assets/banner/banner2.png'
import bannerImage3 from '../../../assets/banner/banner3.png'

const Banner = () => {
    return (
         <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src={bannerImage1}/>
                    <p className="legend">Get your Parcel On Time</p>
                </div>
                <div>
                    <img src={bannerImage2} />
                    <p className="legend">Fast & Easy Pickup</p>
                </div>
                <div>
                    <img src={bannerImage3} />
                    <p className="legend">30 Minutes Delivery </p>
                </div>
            </Carousel>
    );
};

export default Banner;