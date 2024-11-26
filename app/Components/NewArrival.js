'use client'
import Image from 'next/image';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Heading from '../CustomHooks/heading';
import useStore from '../CustomHooks/useStore';
import Link from 'next/link';
import SubHeading from '../CustomHooks/subHeading';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

const NewArrival = () => {
    const {data : newArrivals} = useSWR(`https://outletexpense.xyz/api/public/new-arrivals/38`,fetcher);

    const {handleCart,handleBuy} = useStore();
    return (
        <div className="mt-12">
          <Heading title={'New Arrival'}/>
          <SubHeading subheading={'Gadgets'}/>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
                {/* left banner */}
                <div className="col-span-1 flex flex-col-reverse w-full items-center p-5 space-y-5 bg-gradient-to-b  from-[#2A2047] via-[#5C0D81] to-[#751C6B] relative rounded-md  md:flex-col md:justify-start md:items-start">
                    <div className="space-y-7 flex flex-col items-center md:items-start">
                        <h3 className="text-white text-2xl font-semibold text-wrap">Hot Deals</h3>
                        <p className="text-gray-400 text-wrap">Grab the best deals now! Enjoy massive discounts on top products, from tech to fashion. Hurry, these offers {`won't`} last long!</p>
                        <Link  href={'/category/Smart Watch'}>
                        <button className="flex items-center gap-3 text-black bg-white font-semibold px-4 py-3 rounded-md ">Shop Now <span className="text-black"><FaArrowRight /></span></button>
                        </Link>
                        
                    </div>
                    {
                      newArrivals?.data.length > 0 && <Image
                      src={newArrivals?.data[1]?.image_path || ''}
                      width={500}
                      height={500}
                      className="static md:absolute md:transform md:left-1/2 md:-translate-x-1/2 md:bottom-4"
                      alt={newArrivals?.data[1]?.name}/>
                    }
                  
                </div>
                {/* products */}
                <div className="col-span-1 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:col-span-3 lg:col-span-4">
                {
                    newArrivals?.data.length > 0 ? 
                    newArrivals?.data.map((product,idx) => {
                         return (
                          <div key={idx} className="max-w-sm bg-white text-center border-gray-200 flex flex-col justify-between p-4 border rounded-lg">
                      <Link
                        href={`products/${product?.id}`}
                      >
                        {product.image_path ? <Image
                          src={product?.image_path}
                          height={256}
                          width={256}
                          alt={product?.name}
                          quality={75}
                        /> : 'No Image'}
                        
                        <h3 className="text-sm font-medium mb-2 text-black">
                          {product?.name}
                        </h3>

                        <p className="text-sm text-gray-800 font-bold mb-4">
                          {product?.retails_price} ৳
                        </p>
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