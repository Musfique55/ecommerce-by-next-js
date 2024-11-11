import React, { useState } from 'react';
import Heading from '../CustomHooks/heading';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import products from "/products.json";
import Image from 'next/image';
import Link from 'next/link';
import useStore from '../CustomHooks/useStore';
const FeaturedProducts = () => {
    const [index, setIndex] = useState(0);
    const { handleCart } = useStore();
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
                {products.length > 0 && (
                  products.slice(0,12).map((product, idx) => {
                    return (
                      <Link
                        key={idx}
                        href={`products/${product.title}`}
                        className="max-w-sm bg-white text-center border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
                      >
                        <Image
                          src={product?.image[0]}
                          height="256"
                          width="256"
                          alt="mobile-phone"
                          quality={75}
                        />


                        <h3 className="text-sm font-medium mb-2 text-black">
                          {product.title}
                        </h3>

                        <p className="text-sm text-gray-800 font-bold mb-4">
                          {product.price} ৳
                        </p>


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
                    );
                  })
                )}
              </div>
                </TabPanel>
                <TabPanel>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {products.length > 0 && (
                  products.slice(13,19).map((product, idx) => {
                    return (
                      <Link
                        key={idx}
                        href={`products/${product.title}`}
                        className="max-w-sm bg-white text-center border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
                      >
                        <Image
                          src={product?.image[0]}
                          height="256"
                          width="256"
                          alt="mobile-phone"
                          quality={75}
                        />


                        <h3 className="text-sm font-medium mb-2 text-black">
                          {product.title}
                        </h3>

                        <p className="text-sm text-gray-800 font-bold mb-4">
                          {product.price} ৳
                        </p>


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
                    );
                  })
                )}
              </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default FeaturedProducts;