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
  return (
    <div className="grid grid-cols-1 mt-32 gap-5 md:grid-cols-4 lg:grid-cols-9">
      {/* slider */}
      <div
        className="col-span-3  swiper-container-2 bg-no-repeat bg-center md:bg-left-top bg-cover h-full flex flex-col justify-center items-start space-y-5 overflow-hidden rounded-md relative md:col-span-4 lg:col-span-6"
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
          modules={[Navigation,Pagination,Autoplay]}
          className="trending-swiper"
        >
          { slider.status == 200 && slider?.data.length > 0 &&
          
          slider.data[0].image_path.map((img, idx) => (
           
            <SwiperSlide key={idx} className="relative">
            <div className="relative w-full aspect-video "> 
              <Image
                src={img}
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="slider-image"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-md"
                quality={100}
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
      <div className="col-span-3 md:col-span-4 grid grid-cols-2 gap-5 lg:col-span-3 lg:space-y-3 lg:gap-0">
       {/*bg-gradient-to-b  from-[#751C6B] via-[#5C0D81] to-[#2A2047] */}
        <div
          className={`col-span-1 flex  items-center px-5 space-y-5   relative rounded-md aspect-video md:col-span-1  justify-start lg:col-span-3`}
          // style={{background : banner?.data[0]?.background_color}}
        >
          
          {
              banner?.data && banner?.data[0] &&  <Image
              src={banner?.data && banner?.data[0] && banner?.data[0]?.image_path}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill={true}
              style={{objectFit: 'cover'}}
              priority={true}
              className="cursor-pointer rounded-md "
              alt="apple-watch"  
              
            />
          }
         
        </div>

        <div
        className={'col-span-1 bg-gradient-to-t  rounded-md px-5 pt-2 flex aspect-video relative justify-between  md:col-span-1 lg:col-span-3 '}
        // style={{background : banner?.data[2]?.background_color}}
      >
       
        {
          banner?.data && banner?.data[1] && <Image
          src={banner?.data && banner?.data[1] && banner?.data[1]?.image_path}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{objectFit: 'cover'}}
          priority={true}
          className=" cursor-pointer rounded-md "
          alt="Beats-Studio-Buds"
        />
        }
        
        </div>
      </div>
      
    </div>
  );
};

export default HeroSlider;


