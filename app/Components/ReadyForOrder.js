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
    const filteredProducts = products.filter(product => product.category === 'Speaker');
    const {handleCart} = useStore();

    return (
        <div className='mt-10'>
            <Heading title={'Ready for Order'}/>
           <div >
            <div className='swiper-hover'>
            <Swiper
            slidesPerView={4}
            spaceBetween={20}
            navigation= {true}
            loop={true}
            modules={[Navigation]}
            className="trending-swiper"
            >
              {
                filteredProducts.length > 0 ? (
                  filteredProducts.map((product, idx) => {
                    return (
                      <SwiperSlide key={idx} className="flex select-none justify-center">
                      <Link
                      href={`products/${product.title}`}
                      className="max-w-sm bg-white text-center border-gray-200 grid grid-rows-[auto,1fr,auto] gap-4 p-4 border rounded-lg "
                      >
                        <div className="flex items-center justify-center">
                        <Image
                          src={product?.image[0]}
                          height="200"
                          width="200"
                          alt="mobile-phone"
                          quality={75}
                        />
                        </div>
  
  
                        <div>
                          <h3 className="text-sm font-medium mb-2 text-black">
                            {product.title}
                          </h3>
    
                          <p className="text-sm text-gray-800 font-bold mb-4">
                            {product.price} ৳
                          </p>
                        </div>
  
  
                       <div className='flex gap-2 items-center'>
                        <button className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold  transition-colors">Buy Now</button>
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