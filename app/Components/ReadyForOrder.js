'use client'
import React from 'react';
import Heading from '../CustomHooks/heading';
import ReactStars from "react-rating-stars-component";
import Image from 'next/image';
import { GoChevronRight } from 'react-icons/go';
import Link from 'next/link';
import useStore from '../CustomHooks/useStore';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation } from 'swiper/modules';
import '../globals.css'
const ReadyForOrder = ({products}) => {

    const {handleCart,handleBuy} = useStore();

    return (
        <div className='mt-20'>
            <Heading title={'Ready for Order'}/>
           <div >
            <div className='swiper-hover my-10'>
            <Swiper
            slidesPerView={2}
            spaceBetween={20}
            navigation= {true}
            loop={true}
            modules={[Navigation]}
            breakpoints={{
              // Responsive breakpoints
              640: {
                slidesPerView: 2, // Show 2 slides for devices with width >= 640px
                spaceBetween: 10, // Adjust space for mobile
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4, // Show 4 slides for devices with width >= 1024px
                spaceBetween: 20, // Default space for larger screens
              },
            }}
            className="trending-swiper"
            >
              {
                products?.data.length > 0 ? (
                  products?.data.map((product, idx) => {
                    return (
                      <SwiperSlide key={product.id} className="flex select-none justify-center">
                      <Link
                      href={`products/${product.id}`}
                      className="max-w-sm bg-white text-center border-gray-200 grid grid-rows-[auto,1fr,auto] gap-4 p-4 border rounded-lg "
                      >
                        <div className="flex items-center justify-center">
                          {
                            product?.image_path ?
                            <Image
                            src={product?.image_path}
                            height="200"
                            width="200"
                            alt="mobile-phone"
                            quality={75}
                          />
                            : <p>No image</p>
                          }
                        
                        </div>
  
  
                        <div>
                          <h3 className="text-sm font-medium mb-2 text-black">
                            {product.name}
                          </h3>
    
                          <p className="text-sm text-gray-800 font-bold mb-4">
                            {product.retails_price} ৳
                          </p>
                        </div>
  
  
                       <div className='flex flex-col gap-2 items-center md:flex-row'>
                        <button onClick={(e) => {e.preventDefault(),handleBuy(product,1)}} className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold  transition-colors">Buy Now</button>
                        <button
                            onClick={(e) => {e.preventDefault(),handleCart(product,1)}}
                            className="bg-[#1A1A7E] border border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold  transition-colors"
                            >
                            Add to Cart
                            </button>
                       </div>
                      </Link>
                      </SwiperSlide>
                      
                    );
                  })
                ) : (
                  <p>No products found</p>
                )
              }
              
            </Swiper>
            </div>
           </div>
            
        </div>
    );
};

export default ReadyForOrder;