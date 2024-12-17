"use client";
import Image from "next/image";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../globals.css'


const HeroSlider = ({slider,banner}) => {

  console.log(banner.data[0]);
  
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4 lg:grid-cols-9">
      {/* slider */}
      <div
        className="col-span-3  bg-no-repeat bg-center md:bg-left-top bg-cover h-[400px] flex flex-col justify-center items-start space-y-5 overflow-hidden rounded-md relative md:col-span-4 lg:col-span-6"
        >
        {/* Swiper component */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            nextEl: '.custom-next-2',
            prevEl: '.custom-prev-2',
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation,Autoplay,Pagination]}
          className="trending-swiper"
        >
          { slider.status == 200 && slider?.data.length > 0 &&
          
          slider.data[0].image_path.map((img, idx) => (
           
            <SwiperSlide key={idx}>
              <div className="relative ">
                <Image
                  src={`${img}`}
                  height={500}
                  width={500}
                  alt="slider-image"
                  style={{objectFit: 'cover'}}
                  className="rounded-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

  {/* Custom Navigation Buttons - Outside of Swiper */}
    <div className="absolute custom-next-2 bg-white  transform right-5 -translate-y-1/2 opacity-[0.8] cursor-pointer rounded-full p-2 z-10"  >
      <FaChevronRight className="text-black text-xl "/>
    </div>

        <div className="absolute custom-prev-2 bg-white  transform left-5 -translate-y-1/2 opacity-[0.7] cursor-pointer rounded-full p-2 z-10">
        <FaChevronLeft className="text-black text-xl "/>
        </div>
        </div>
      {/* right banner */}
      <div className="col-span-3">
      <div className="col-span-3 md:col-span-4  lg:col-span-3 lg:space-y-3 lg:gap-0 lg:h-[194px]">
          {
              banner?.data && banner?.data[0] && <Image
              src={banner.data[0].image_path}
              width={500}
              height={500}
              className="cursor-pointer h-[190px] rounded-md"
              alt="apple-watch" 
               
            />
          }     
      </div>

        <div
        className={'col-span-3 md:col-span-4 lg:col-span-3 lg:space-y-3 lg:gap-0 lg:h-[194px]'}
        // style={{background : banner?.data[2]?.background_color}}
      >
        {
          banner?.data && banner?.data[1] && <Image
          src={banner?.data[1]?.image_path}
          width={200}
          height={200}
          className="object-cover cursor-pointer"
          alt="Beats-Studio-Buds"
        />
        }       
        </div>
      </div>
      
      
    </div>
  );
};

export default HeroSlider;


