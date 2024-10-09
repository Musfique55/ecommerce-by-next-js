'use client'

import Image from 'next/image';
import { useState,useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import banners from '/banners.json';
const HeroSlider = ({slides}) => {

    const [index,setIndex] = useState(0);
    const dot = <GoDotFill />
    const dots = new Array(slides.length).fill(dot);

    
    useEffect(() => {
     const interval = setInterval(() => {
        handleNext()
      },2000)

      return () => clearInterval(interval)
    },[index])

  const handleNext = () => {
    
      setTimeout(() => {
    setIndex((prevIndex) =>( prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
    },500)
  }

  const handlePrev = () => {
    
    setTimeout(() => {
      setIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
    },500)
  }

  const titleBreak = slides[index].title.split(' ');
  const image = slides[index].image;

  const rightBanner = banners[0].image[0].path;
  const restBanners = banners.slice(1);

    return (
        <div className="grid  grid-cols-1 gap-5 md:grid-cols-9">
             

            {/* slider */}
            <div id="slide"
            style = {{
              backgroundImage : `url(${image})`
            }}
            
            className={`col-span-3 bg-no-repeat bg-center md:bg-left-top bg-cover h-[450px] flex flex-col justify-center items-start space-y-5  p-8 rounded-md relative md:col-span-7`}>
                <h1 className="text-white text-4xl md:text-6xl font-semibold"  data-testid="title">{titleBreak[0]} <br/> {titleBreak[1]} {titleBreak[2]}</h1>
                <p className="text-white font-medium" data-testid="text">{slides[index].text}</p>
                <button className="flex items-center gap-3 bg-white font-semibold px-4 py-3 rounded-md ">Shop Now  <span><FaArrowRight /></span></button>
                <div className={`flex  absolute transform -translate-x-1/2 left-1/2 bottom-8`}>{
                  slides.map((_,i) => {
                    return (
                      <span onClick={() => setIndex(i)} key={i} className={`${index === i ? 'text-white border rounded-full' : 'text-gray-400'} cursor-pointer`}>{
                        dots[i]
                      }</span>
                    )
                  })
                }</div>
            </div>
            {/* right banner */}
            <div className={`col-span-3 flex flex-col-reverse items-center p-5 space-y-5 bg-${banners[0].background_color} relative rounded-md md:col-span-2 md:flex-col md:justify-start md:items-start`}>
                <div className="space-y-4 flex flex-col items-center md:items-start">
                <h3 className="text-white text-2xl font-semibold text-wrap">{banners[0]?.title}</h3>
                <div className="flex items-center gap-3 ">
                <button className="flex  items-center border-b text-white font-medium text-lg p-0">Shop Now </button>
                <span className="text-white"><FaArrowRight /></span>
              </div>
                </div>
                <Image 
                src={`${rightBanner}`}
                width="500"
                height="500"
                className="static md:absolute md:left-1/2 md:transform md:bottom-4 md:-translate-x-1/2 "
                alt="apple-watch"/>
            </div>

                {/* bottom banners */}
            {
              restBanners.map((banner,idx) => {
                 return (
                    <div key={idx} className={`col-span-3 bg-${banner.background_color} rounded-md p-5 flex flex-col-reverse items-center justify-between md:flex-row`}>
                      <div className="flex flex-col space-y-3 md:space-y-8 justify-center ">
                      <h3 className="text-white text-xl mt-5 md:mt-0">{banner.title}</h3>
                      <div className="flex items-center  gap-3 justify-center md:justify-start">
                      <button className="flex gap-3 items-center border-b text-white font-medium text-lg p-0">Shop Now </button>
                      <span className="text-white"><FaArrowRight /></span>
                      </div>
                      </div>
                      <Image 
                      src={`${banner.image[0].path}`}
                      width='200'
                      height='200'
                      className="object-cover"
                      alt='samsung-gear-camera'/>
                    </div>
                 )
              })
            }
            
        </div>
    );
};

export default HeroSlider;