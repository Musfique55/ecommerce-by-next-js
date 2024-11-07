"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import banners from "/banners.json";
import Link from "next/link";
const HeroSlider = ({ slides }) => {
  const [index, setIndex] = useState(0);
  // const [animate, setAnimate] = useState(false);
  const [isInfinite,setIsInfinite] = useState(true);
  const dot = <GoDotFill />;
  console.log(slides);

  const dots = new Array(slides?.images.length).fill(dot);

  useEffect(() => {
    if(isInfinite){
      const interval = setInterval(() => {
        // if (!animate) return;
        // setAnimate(true)
        // setTimeout(() => {
        //   setIndex((prevIndex) =>
        //     prevIndex === slides?.images.length - 1 ? 0 : prevIndex + 1
        // );
        // setAnimate(false);
  
        // }, 500);
        setIndex((prevIndex) =>
          prevIndex === slides?.images.length - 1 ? 0 : prevIndex + 1
      );
      }, 4000);
      return () => clearInterval(interval);
    }

  }, [slides?.images.length,isInfinite]);


  // const titleBreak = slides[index].title.split(" ");
  const image = slides?.images[index];

  const handleNext = () => {
      // setAnimate(false); 
      if(index === slides.images.length - 1){
        setIndex(0)
      }else{
        setIndex(index + 1)
      }
      // if(index === )
      // setTimeout(() => setAnimate(true), 100);
      
  }
  const handlePrev = () => {
    // setAnimate(false); // Briefly disable animation to reset
      setIndex((prevIndex) => 
        prevIndex ===  0 ? slides?.images.length - 1 : prevIndex - 1
      );
      
  }

  

  console.log(index);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4 lg:grid-cols-9">
      {/* slider */}
      <div
        id="slide"
        style={{
          backgroundImage: `url(${index === 0 ? slides?.images[slides?.images.length - 1] : slides?.images[index - 1] || index === slides.images.length - 1 && slides.images[0]})`,
        }}
        className={`col-span-3 bg-no-repeat bg-center md:bg-left-top bg-cover h-[450px] flex flex-col justify-center items-start space-y-5 overflow-hidden p-8 rounded-md relative md:col-span-3 lg:col-span-6`}
      >
        
        <Image 
        key={image}
        layout="fill"
        objectFit="cover"
        alt="slider"
        src={image}
        className="animate__animated animate__slideInRight"
        />
        <div className="absolute bg-white  transform right-5 -translate-y-1/2 opacity-[0.8] cursor-pointer rounded-full p-2 z-10"  onClick={() => handleNext()} onMouseEnter={() => setIsInfinite(false)} onMouseLeave={() => setIsInfinite(true)}>
        <FaChevronRight onClick={handleNext} className="text-black text-xl "/>
        </div>

        <div className="absolute bg-white  transform left-5 -translate-y-1/2 opacity-[0.7] cursor-pointer rounded-full p-2 z-10" onClick={handlePrev} onMouseEnter={() => setIsInfinite(false)} onMouseLeave={() => setIsInfinite(true)}>
        <FaChevronLeft className="text-black text-xl "/>
        </div>
       
        <div
          className={`flex  absolute transform -translate-x-1/2 left-1/2 bottom-8`}
        >
          {slides
          ?.images.map((_, i) => {
            return (
              <span
                onClick={() => setIndex(i)}
                key={i}
                className={`${
                  index === i
                    ? "text-white border rounded-full"
                    : "text-gray-400"
                } cursor-pointer `}
              >
                {dots[i]}
              </span>
            );
          })}
        </div>
      </div>
      {/* right banner */}
      <div className="col-span-3 md:col-span-1 lg:col-span-3 space-y-3">
        <div
          className={` flex flex-col-reverse items-center px-5 space-y-5 bg-gradient-to-b  from-[#751C6B] via-[#5C0D81] to-[#2A2047] relative rounded-md   md:flex-row md:justify-start `}
        >
          <div className="space-y-5 flex flex-col items-center md:items-start">
            <h3 className="text-white text-2xl font-semibold text-wrap">
            Explore Apple Watch
            </h3>
            <div className="flex items-center gap-3 ">
              <Link href={'/category/Smart Watch'}><button className="flex  items-center border-b text-white font-medium text-lg p-0">
                Shop Now{" "}
              </button></Link>
              <span className="text-white">
                <FaArrowRight />
              </span>
            </div>
          </div>
          <Image
            src={"https://i.ibb.co.com/BTvjjXj/1704564727-removebg-preview.png"}
            width="200"
            height="200"
            className=" "
            alt="apple-watch"
          />
        </div>

        <div
        className={'col-span-3 bg-gradient-to-t from-[#33B852] to-[#78D86A] rounded-md px-5 py-2 flex flex-col-reverse items-center justify-between md:flex-row md:col-span-2 lg:col-span-3 '}
      >
        <div className="flex flex-col space-y-3 md:space-y-5 justify-center ">
          <h3 className="text-white text-2xl mt-5 font-semibold md:mt-0">Beats Studio Buds</h3>
          <div className="flex items-center  gap-3 justify-center md:justify-start">
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
      

      {/* bottom banners */}
      {/* {
              restBanners.map((banner,idx) => {
                 return (
                    <div key={idx} className={`col-span-3 bg-${banner.background_color} rounded-md p-5 flex flex-col-reverse items-center justify-between md:flex-row md:col-span-2 lg:col-span-3`}>
                      <div className="flex flex-col space-y-3 md:space-y-8 justify-center ">
                      <h3 className="text-white text-xl mt-5 md:mt-0">{banner.title}</h3>
                      <div className="flex items-center  gap-3 justify-center md:justify-start">
                      <button className="flex gap-3 items-center border-b text-white font-medium text-lg p-0">Shop Now </button>
                      <span className="text-white"><FaArrowRight /></span>
                      </div>
                      </div>
                      <Image 
                      src={`${banner.image[0].path}`}
                      width='150'
                      height='150'
                      className="object-cover"
                      alt='samsung-gear-camera'/>
                    </div>
                 )
              })
            } */}

      
      {/* <div
        className={'col-span-3 bg-gradient-to-t from-[#33B852] to-[#78D86A] rounded-md p-5 flex flex-col-reverse items-center justify-between md:flex-row md:col-span-2 lg:col-span-3'}
      >
        <div className="flex flex-col space-y-3 md:space-y-8 justify-center ">
          <h3 className="text-white text-xl mt-5 md:mt-0">Beats Studio Buds</h3>
          <div className="flex items-center  gap-3 justify-center md:justify-start">
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
          width="150"
          height="150"
          className="object-cover"
          alt="Beats-Studio-Buds"
        />
      </div>
      <div
        className={'col-span-3 bg-gradient-to-br from-black to-gray-700 rounded-md p-5 flex flex-col-reverse items-center justify-between md:flex-row md:col-span-2 lg:col-span-3'}
      >
        <div className="flex flex-col space-y-3 md:space-y-8 justify-center ">
          <h3 className="text-white text-xl mt-5 md:mt-0">Canon Dslr Camera</h3>
          <div className="flex items-center  gap-3 justify-center md:justify-start">
            <Link href={'/category/Camera'}>
            <button className="flex gap-3 items-center border-b text-white font-medium text-lg p-0">
              Shop Now{" "}
            </button>
            </Link>
           
            <span className="text-white">
              <FaArrowRight />
            </span>
          </div>
        </div>
        <Image
          src={`https://i.ibb.co.com/HGq12Ng/70de89e7dfae0fdc030ed5c5006f93d2-removebg-preview.png`}
          width="150"
          height="150"
          className="object-cover"
          alt="Canon-Dslr-Camera"
        />
      </div> */}
    </div>
  );
};

export default HeroSlider;
