'use client'
import React from 'react';
import Heading from '../CustomHooks/heading';
import useStore from '../CustomHooks/useStore';
import Link from 'next/link';
import SubHeading from '../CustomHooks/subHeading';
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';


const NewArrival = ({banner}) => {
    const {handleCart,handleBuy} = useStore();
    const {data : newArrivals} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/new-arrivals/${userId}`,fetcher)


    return (
        <div className="mt-12">
          <Heading title={'New Arrival'}/>
          <SubHeading subheading={'Gadgets'}/>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-5">
                {/* left banner */}
                <div className="col-span-1 flex flex-col-reverse w-full items-center  space-y-5  relative rounded-md  md:flex-col md:justify-start md:items-start"
               
                >
                    
                   
                    { banner?.data &&
                      banner?.data.length > 0 && banner?.data && banner?.data[4] && <Image
                      src={banner?.data && banner?.data[4] && banner.data[4]?.image_path}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill={true}
                      style={{objectFit: 'cover'}}
                      className="rounded-lg"
                      alt={banner.data[4].title || ''}
                      quality={100}
                      />
                    } 

                    
                  
                </div>
                {/* products */}
                <div className="col-span-1 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:col-span-3 lg:col-span-4">
                {
                    newArrivals?.data.length > 0 ? 
                    newArrivals?.data.map((product,idx) => {
                         return (
                          <div key={idx} className="max-w-sm bg-white text-center border-gray-200 flex flex-col justify-between p-4 border rounded-lg space-y-2">
                      <Link
                        href={`products/${product?.id}`}
                      >
                        <div className='flex justify-center relative'>
                        {product.image_path ? <Image
                          src={product?.image_path}
                          height={145}
                          width={145}
                          alt={product?.name}
                          quality={100}
                          className=' object-contain'
                        /> : <Image
                        src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                        height={145}
                        width={145}
                        alt="mobile-phone"
                        loading='lazy'
                        quality={100}
                      />}
                        {
                              product.discount ?
                              <p className="text-white bg-[#178489] rounded-md  absolute py-1 
                              px-[6px] text-sm top-0 left-0">SAVE {product.discount}%</p> : ''
                          }
                        </div>
                        
                        
                        <h3 className="text-sm font-medium mt-5 text-black">
                          {product?.name}
                        </h3>

                        <div className='mt-2'>
                        {
                          product?.discount ? <div className="text-nowrap flex gap-2 justify-center items-center">
                          <span className="text-xs font-bold text-[#1A1A7E] line-through">{product?.retails_price} ৳</span>
                          <span className="text-sm font-bold text-[#1A1A7E]">{product?.retails_price - ((product?.retails_price * product.discount) / 100).toFixed(0)} ৳</span>
                        </div> :
                        <span className="text-sm font-bold text-[#1A1A7E]">{product?.retails_price} ৳</span>
                        }
                        </div>  
                      </Link>
                       <div className='flex flex-col gap-2 items-center md:flex-row'>
                        <button onClick={() => {handleBuy(product,1)}} className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold  transition-colors">Buy Now</button>
                        <button
                            onClick={(e) => {e.preventDefault(),handleCart(product,1)}}
                            className="bg-[#1A1A7E] border border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold  transition-colors"
                            >
                            Add to Cart
                        </button>
                       </div>
                      </div>
                        );
                    })
                    : <p>No products found</p>
                }
                </div>
            </div>
        </div>
    );
};

export default NewArrival;