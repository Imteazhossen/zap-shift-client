import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaQuoteLeft } from 'react-icons/fa';
import midImage from '../../../assets/customer-top.png';

const testimonials = [
  {
    text: "Posture Pro changed the way I sit and stand — absolutely life-changing!",
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    avatar: "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
  },
  {
    text: "I feel more confident and pain-free at work now.",
    name: "Nasir Uddin",
    role: "CEO",
    avatar: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
  },
  {
    text: "Customer support is fantastic — they guided me perfectly!",
    name: "Rasel Ahamed",
    role: "CTO",
    avatar: "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
  },
  {
    text: "Now I never miss a delivery, thanks to their live tracking.",
    name: "Sara Rahman",
    role: "Marketing Lead",
    avatar: "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
  },
  {
    text: "Professional, quick and responsive — highly recommend.",
    name: "Tanvir Ahmed",
    role: "E-commerce Manager",
    avatar: "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
  },
  {
    text: "My customers are happier than ever with this delivery service.",
    name: "Afia Jahan",
    role: "Business Owner",
    avatar: "https://img.daisyui.com/images/profile/demo/averagebulk@192.webp"
  },
  {
    text: "Safe, fast and super easy to track — loved it!",
    name: "Shuvo Khan",
    role: "Content Creator",
    avatar: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
  },
  {
    text: "Reliable service every time, never disappointed.Reliable service every time, never disappointed.",
    name: "Minhaj Uddin",
    role: "Freelancer",
    avatar: "https://img.daisyui.com/images/profile/demo/averagebulk@192.webp"
  },
  {
    text: "From order to delivery — smooth experience.",
    name: "Jannat Jahan",
    role: "HR Manager",
    avatar: "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
  },
  {
    text: "User-friendly and trustworthy delivery system.",
    name: "Samiya Hossain",
    role: "Project Manager",
    avatar: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
  }
];

const Reviews = () => {
  return (
    <section className="bg-white py-10 my-10">
      <div className="text-center mb-10">
        <img src={midImage} alt="box" className="mx-auto h-40  my-10 mb-6" />
        <h2 className="text-3xl md:text-4xl  my-10 font-bold text-slate-800">What our customers are saying</h2>
        <p className="text-gray-600 max-w-xl  my-10 mx-auto mt-2">
          Enhance posture, mobility, and well-being effortlessly. Achieve proper alignment, reduce pain,
          and strengthen your body with ease!
        </p>
      </div>

      <div className="w-full  my-10 max-w-7xl mx-auto px-4 overflow-visible">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          navigation={{ nextEl: '.next', prevEl: '.prev' }}
          pagination={{ clickable: true, el: '.pagination' }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="overflow-visible "
        >
          {testimonials.map((review, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className="overflow-visible  my-10 h-full">
                  <div
                    className={`transition-all duration-300 p-6 rounded-2xl shadow-md bg-white ${
                      isActive ? 'scale-105 opacity-105' : 'scale-95 opacity-50'
                    }`}
                  >
                    <FaQuoteLeft className="text-3xl mb-4" />
                    <p className="text-gray-700 mb-6">{review.text}</p>
                    <hr className="border-dashed border-t-2 border-gray-300 mb-4" />
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full">
                          <img src={review.avatar} alt={review.name} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{review.name}</h4>
                        <p className="text-sm text-gray-500">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation + Pagination center aligned */}
        <div className="flex flex-col items-center  my-10 justify-center gap-4 mt-6">
         
          <div className="flex items-center  mb-10 gap-4">
            <button className="prev btn btn-circle bg-sky-200 text-sky-800">❮</button>
             <div className="pagination" />
            <button className="next btn btn-circle bg-sky-200 text-sky-800">❯</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
