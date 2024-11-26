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
import useSWR from "swr";

const fetcher = (url) => fetch(url).then(res => res.json());
const HeroSlider = ({ slides }) => {

  const {data : slider} = useSWR(`https://www.outletexpense.xyz/api/get-sliders/3`,fetcher);

  const {data : banner} = useSWR(`https://www.outletexpense.xyz/api/get-banners/3`,fetcher);



  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4 lg:grid-cols-9">
      {/* slider */}
      <div
        className="col-span-3  swiper-container-2 bg-no-repeat bg-center md:bg-left-top bg-cover h-[400px] flex flex-col justify-center items-start space-y-5 overflow-hidden rounded-md relative md:col-span-4 lg:col-span-6"
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
          {slider?.data[1]?.image_path.map((img, idx) => (
           
            <SwiperSlide key={idx}>
              <div className="relative ">
                <Image
                  src={`${img}`}
                  height={500}
                  width={500}
                  alt="slider-image"
                  style={{objectFit: 'cover'}}
                  quality={75}
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
      <div className="col-span-3 md:col-span-4 grid grid-cols-2 gap-5 lg:col-span-3 lg:space-y-3 lg:gap-0">
       {/*bg-gradient-to-b  from-[#751C6B] via-[#5C0D81] to-[#2A2047] */}
        <div
          className={`col-span-3 flex  items-center px-5 space-y-5   relative rounded-md lg:h-[194px] md:col-span-1  justify-start lg:col-span-3`}
          style={{background : banner?.data[0].background_color}}
        >
          <div className="flex flex-col space-y-3 md:space-y-5 justify-center">
            <h3 className="text-white text-2xl font-semibold text-wrap">
            { banner?.data[0].title}
            </h3>
            <div className="flex items-center gap-3 justify-start">
              <Link href={banner?.data[0].button_url ? banner?.data[0].button_url : '/'}><button className="flex  items-center border-b text-white font-medium text-lg p-0">
                { banner?.data[0].button_text}{" "}
              </button></Link>
              <span className="text-white">
                <FaArrowRight />
              </span>
            </div>
          </div>
          <Image
            src={banner?.data[0].image_path}
            width="200"
            height="200"
            className=" "
            alt="apple-watch"
          />
        </div>

        <div
        className={'col-span-3 bg-gradient-to-t from-[#33B852] to-[#78D86A] rounded-md px-5 py-2 flex lg:h-[194px]  justify-between  md:col-span-1 lg:col-span-3 '}
      >
        <div className="flex flex-col space-y-3 md:space-y-5 justify-center ">
          <h3 className="text-white text-2xl mt-5 font-semibold md:mt-0">Beats Studio Buds</h3>
          <div className="flex items-center  gap-3 justify-start">
           <Link href={'/category/Smart Buds'}> <button className="flex gap-3 items-center border-b text-white font-medium text-lg p-0">
              Shop Now{" "}
            </button></Link>
            <span className="text-white">
              <FaArrowRight />
            </span>
          </div>
        </div>
        <Image
          src={`https://i.ibb.co.com/Qpp0fPK/studiobudsplus-blackgold-01-removebg-preview.png`}
          width="200"
          height="200"
          className="object-cover"
          alt="Beats-Studio-Buds"
        />
        </div>
      </div>
      
    </div>
  );
};

export default HeroSlider;


// 'use client';

// import Image from "next/image";
// import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import '../globals.css'
// import useSWR from "swr";

// const fetcher = (url) => fetch(url).then(res => res.json());

// const HeroSlider = ({ slides }) => {
//   const {data: slider} = useSWR(`https://www.outletexpense.xyz/api/get-sliders/38`, fetcher);
//   const {data: banner} = useSWR(`https://www.outletexpense.xyz/api/get-banners/38`, fetcher);

//   return (
//     <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-9">
//       {/* slider */}
//       <div className="col-span-1 md:col-span-2 lg:col-span-6 relative">
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={20}
//           navigation={{
//             nextEl: '.custom-next-2',
//             prevEl: '.custom-prev-2',
//           }}
//           loop={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           modules={[Navigation, Autoplay, Pagination]}
//           className="trending-swiper h-[400px] rounded-md overflow-hidden"
//         >
//           {slides?.images.map((img, idx) => (
//             <SwiperSlide key={idx}>
//               <div className="relative w-full h-full">
//                 <Image
//                   src={img}
//                   layout="fill"
//                   objectFit="cover"
//                   alt={`slider-image-${idx}`}
//                   quality={100}
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Custom Navigation Buttons */}
//         <div className="absolute custom-next-2 bg-white right-2 top-1/2 -translate-y-1/2 opacity-80 cursor-pointer rounded-full p-2 z-10 hover:opacity-100 transition-opacity">
//           <FaChevronRight className="text-black text-xl" />
//         </div>
//         <div className="absolute custom-prev-2 bg-white left-2 top-1/2 -translate-y-1/2 opacity-80 cursor-pointer rounded-full p-2 z-10 hover:opacity-100 transition-opacity">
//           <FaChevronLeft className="text-black text-xl" />
//         </div>
//       </div>

//       {/* right banner */}
//       <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 md:col-span-2 lg:col-span-3 h-[400px]">
//         <div className="bg-gradient-to-b  from-[#751C6B] via-[#5C0D81] to-[#2A2047] rounded-md p-4 flex flex-col sm:flex-row items-center justify-between h-[194px]">
//           <div className="space-y-3 text-center sm:text-left">
//             <h3 className="text-white text-xl sm:text-2xl font-semibold">Explore Apple Watch</h3>
//             <div className="flex items-center justify-center sm:justify-start gap-3">
//               <Link href="/category/Smart Watch">
//                 <button className="flex items-center border-b text-white font-medium text-lg p-0">
//                   Shop Now
//                 </button>
//               </Link>
//               <span className="text-white">
//                 <FaArrowRight />
//               </span>
//             </div>
//           </div>
//           <Image
//             src="https://i.ibb.co.com/BTvjjXj/1704564727-removebg-preview.png"
//             width={100}
//             height={100}
//             className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
//             alt="apple-watch"
//           />
//         </div>

//         <div className="bg-gradient-to-t  from-[#33B852] to-[#78D86A] rounded-md p-4 flex flex-col sm:flex-row items-center justify-between h-[194px]">
//           <div className="space-y-3 text-center sm:text-left">
//             <h3 className="text-white text-xl sm:text-2xl font-semibold">Beats Studio Buds</h3>
//             <div className="flex items-center justify-center sm:justify-start gap-3">
//               <Link href="/category/Smart Buds">
//                 <button className="flex items-center border-b text-white font-medium text-lg p-0">
//                   Shop Now
//                 </button>
//               </Link>
//               <span className="text-white">
//                 <FaArrowRight />
//               </span>
//             </div>
//           </div>
//           <Image
//             src="https://i.ibb.co.com/Qpp0fPK/studiobudsplus-blackgold-01-removebg-preview.png"
//             width={100}
//             height={100}
//             className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
//             alt="Beats-Studio-Buds"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSlider;


