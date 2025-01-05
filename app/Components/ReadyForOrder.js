'use client';
import React from 'react';
import Heading from '../CustomHooks/heading';
import Image from 'next/image';
import Link from 'next/link';
import useStore from '../CustomHooks/useStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import '../globals.css';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';



const ReadyForOrder = () => {
  const { handleCart, handleBuy } = useStore();
  const {data : products,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/products/${userId}?page=1&limit=12`,fetcher)


  return (
    <div className="mt-20">
      <Heading title={'Ready for Order'} />
      <div>
        <div className="swiper-hover my-10">
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            navigation={true}
            loop={true}
            modules={[Navigation]}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 6, spaceBetween: 10 },
            }}
            className="trending-swiper"
          >
          {
          isLoading ?
          <div className='flex gap-5  justify-center'>
               {
                Array.from({length : 6}).map((_,idx) => {
                  return  <CardSkeleton key={idx} />
               })
              }
          </div> 
            :
            products?.data &&
            products?.data.length > 0 ? (
              products.data.map((product) => (
                <SwiperSlide key={product.id} className="select-none">
                  <Link 
                    href={`products/${product.id}`} 
                    className="block bg-white border-gray-200 border rounded-2xl h-[420px]" // Fixed height
                  >
                    <div className="p-4 h-full flex flex-col">
                      {/* Image Container - Fixed height */}
                      <div className="relative h-[145px] flex items-center justify-center mb-4">
                        <Image
                          src={product?.image_path || 'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                          height={145}
                          width={145}
                          alt={product?.name || 'mobile-phone'}
                          quality={75}
                          style={{objectFit: 'contain'}}
                          className="object-contain"
                        />
                        {product.discount && (
                          <p className="text-gray-300 bg-[#1A1A7E] rounded-md absolute py-1 
                            px-[6px] text-sm top-0 left-0">
                            SAVE {product.discount}%
                          </p>
                        )}
                      </div>

                      {/* Product Info - Flex grow to take remaining space */}
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-sm font-medium mb-2 text-black line-clamp-2 flex-grow">
                          {product?.name}
                        </h3>

                        {/* Price Section */}
                        <div className="mb-4">
                          {product?.discount ? (
                            <div className="flex gap-2 justify-center items-center">
                              <span className="text-xs font-bold text-[#1A1A7E] line-through">
                                {product?.retails_price} ৳
                              </span>
                              <span className="text-sm font-bold text-[#1A1A7E]">
                                {product?.retails_price - ((product?.retails_price * product.discount) / 100).toFixed(0)} ৳
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm font-bold text-[#1A1A7E] block text-center">
                              {product?.retails_price} ৳
                            </span>
                          )}
                        </div>

                        {/* Buttons - Fixed at bottom */}
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <button 
                            onClick={() => handleBuy(product, 1)}
                            className="border-[#1A1A7E] text-nowrap border text-xs text-[#1A1A7E] w-full px-2 py-1.5 rounded-md font-semibold transition-colors hover:bg-[#1A1A7E] hover:text-white"
                          >
                            Buy Now
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              handleCart(product, 1)
                            }}
                            className="bg-[#1A1A7E] text-nowrap border border-transparent text-xs text-white w-full px-2 py-1.5 rounded-md font-semibold transition-colors hover:bg-[#151562]"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
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
