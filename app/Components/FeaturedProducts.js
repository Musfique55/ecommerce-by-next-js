'use client'
import React, { useState } from 'react';
import Heading from '../CustomHooks/heading';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Image from 'next/image';
import Link from 'next/link';
import useStore from '../CustomHooks/useStore';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';

const FeaturedProducts = ()  => {
  const [index, setIndex] = useState(0);
  const { handleCart,handleBuy } = useStore();
  const {data : bestSellers,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/best-sellers/${userId}`,fetcher);
  const {data : bestDeals,isLoading: Loading} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/best-deals/${userId}`,fetcher);

  return (
      <div className='mt-20'>
          <Heading title={"Featured Products"}/>
          <Tabs className="">
              <TabList className="flex flex-wrap gap-5 mt-5 mb-8 justify-center md:flex-wrap lg:flex-nowrap">
                  <Tab onClick={() => setIndex(0)} className={`text-sm  cursor-pointer outline-none ${
                index === 0
                  ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]"
                  : "text-black"
              }`}>Best Deals</Tab>
                  <Tab onClick={() => setIndex(1)} className={`text-sm  cursor-pointer outline-none ${
                index === 1
                  ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]"
                  : "text-black"
              }`}>
                  Best Sellers
                  </Tab>
              </TabList>

              <TabPanel>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {
               isLoading ?
               <div className='col-span-6 flex gap-5 justify-center'>
                  {
                   Array.from({length : 6}).map((_,idx) => {
                     return <div key={idx} >
                       <CardSkeleton  />
                     </div>
                  })
                 }
                  </div>   :

              bestDeals?.data.length > 0 ? (
                bestDeals?.data.slice(0,12).map((product, idx) => {
                  return (
                    <div key={idx} className="max-w-sm bg-white text-center border-gray-200 flex flex-col justify-between p-4 border rounded-2xl">
                    <Link
                      href={`products/${product?.id}`}
                    >
                      <div className='flex justify-center relative'>
                      {
                        product?.image_path ? 
                        <Image
                        src={product?.image_path}
                        height={145}
                        width={145}
                        alt={product?.name}
                        quality={75}
                      />
                        : <Image
                        src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                        height={145}
                        width={145}
                        alt="mobile-phone"
                        quality={75}
                      />
                      }
                      {
                            product.discount ?
                            <p className="text-gray-300 bg-[#1A1A7E] rounded-md  absolute py-1 
                            px-[6px] text-sm top-0 left-0">SAVE {product.discount}%</p> : ''
                        }
                      </div>
                      
                      
                      <h3 className="text-sm font-medium mt-5 mb-2 text-black">
                        {product?.name}
                      </h3>

                      <div className='mb-2'>
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
                      <button onClick={() => {handleBuy(product,1)}} className="border-[#1A1A7E] text-nowrap border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold  transition-colors">Buy Now</button>
                      <button
                          onClick={(e) => {e.preventDefault(),handleCart(product,1)}}
                          className="bg-[#1A1A7E] border text-nowrap border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold  transition-colors"
                          >
                          Add to Cart
                      </button>
                     </div>
                    </div>
                  );
                })
              ) : <p>No products found</p>}
            </div>
              </TabPanel>
              <TabPanel>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {
              Loading ?
              <div className='col-span-6 flex gap-5 justify-center'>
                  {
                   Array.from({length : 6}).map((_,idx) => {
                     return <div key={idx} >
                       <CardSkeleton  />
                     </div>
                  })
                 }
                  </div>  :
              bestSellers?.data.length > 0 ? (
                bestSellers?.data.slice(0,12).map((product, idx) => {
                  return (
                    <div key={idx} className="max-w-sm bg-white text-center border-gray-200 flex flex-col justify-between p-4 border rounded-2xl">
                    <Link
                      href={`products/${product?.id}`}
                    >
                      <div className='flex justify-center relative'>
                      {
                        product?.image_path ? 
                        <Image
                        src={product?.image_path}
                        height={145}
                        width={145}
                        alt={product?.name}
                        quality={75}
                      />
                        : <Image
                        src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                        height={145}
                        width={145}
                        alt="mobile-phone"
                        quality={75}
                      />
                      }
                      {
                            product.discount ?
                            <p className="text-gray-300 bg-[#1A1A7E] rounded-md  absolute py-1 
                            px-[6px] text-sm top-0 left-0">SAVE {product.discount}%</p> : ''
                        }
                      </div>
                      
                      <h3 className="text-sm font-medium mt-5 mb-2 text-black">
                        {product?.name}
                      </h3>

                      <div className='mb-2'>
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
                      <button onClick={() => {handleBuy(product,1)}} className="border-[#1A1A7E] text-nowrap border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold  transition-colors">Buy Now</button>
                      <button
                          onClick={(e) => {e.preventDefault(),handleCart(product,1)}}
                          className="bg-[#1A1A7E] border border-transparent text-xs text-nowrap text-white w-full px-[2px] py-1 rounded-md font-semibold  transition-colors"
                          >
                          Add to Cart
                      </button>
                     </div>
                    </div>
                  );
                })
              ): <p>No products found</p>}
            </div>
              </TabPanel>
          </Tabs>
      </div>
  );
}

export default FeaturedProducts;