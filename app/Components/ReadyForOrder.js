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



const ReadyForOrder = ({products}) => {
  const { handleCart, handleBuy } = useStore();
  


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
              768: { slidesPerView: 3, spaceBetween: 40 },
              1024: { slidesPerView: 6, spaceBetween: 8 },
            }}
            className="trending-swiper"
          >
            {
            
            products?.data.data.length > 0 ? (
              products.data.data.map((product) => (
                <SwiperSlide key={product.id} className="select-none">
                  <Link
                    href={`products/${product.id}`}
                    className="bg-white text-center w-60 h-80 border-gray-200 gap-4 p-4 border rounded-2xl"
                  >
                    <div className="flex relative items-center justify-center h-52">
                      {product?.image_path ? (
                        <Image
                          src={product?.image_path}
                          height={145}
                          width={145}
                          alt="mobile-phone"
                          quality={75}
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                          height={145}
                          width={145}
                          loading='lazy'
                          alt="mobile-phone"
                          quality={75}
                        />
                      )}
                      {/* Discount Ribbon */}
                      {product.discount ? (
                        <p className="text-white bg-[#178489] rounded-md absolute py-1 px-[6px] text-sm top-0 left-0">
                          SAVE {product.discount}%
                        </p>
                      ) : ''}
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mt-5 mb-2 text-black">{product.name}</h3>
                      <div>
                        {product?.discount ? (
                          <div className="text-nowrap flex gap-2 justify-center items-center">
                            <span className="text-xs font-bold text-[#1A1A7E] line-through">
                              {product?.retails_price} ৳
                            </span>
                            <span className="text-sm font-bold text-[#1A1A7E]">
                              {(product?.retails_price -
                                (product?.retails_price * product.discount) / 100
                              ).toFixed(0)}{' '}
                              ৳
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-[#1A1A7E]">
                            {product?.retails_price} ৳
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-center md:flex-row">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleBuy(product, 1);
                        }}
                        className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold transition-colors"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCart(product, 1);
                        }}
                        className="bg-[#1A1A7E] border border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <p>No products found</p>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ReadyForOrder;
