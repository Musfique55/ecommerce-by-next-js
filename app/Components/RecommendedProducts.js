'use client'
import Image from 'next/image';
import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useState } from 'react';

const RecommendedProducts = ({categories,products}) => {
    const trendingProducts = categories.slice(2).reverse();
    const [currentCategory,setCurrentCategory] = useState(trendingProducts[0]);
    const [index, setIndex] = useState(0);
    const filteredProducts = products.filter(
        (product) => product.category === currentCategory
      );
    return (
        <div className="mt-12">
            <h3 className="text-3xl font-semibold mb-5">Recommended for you</h3>
            <Tabs >
                <TabList className="flex gap-5 mb-10 flex-wrap">
                {
                    trendingProducts.map((cat,idx) => {
                        return <Tab onClick={() => {setIndex(idx);setCurrentCategory(cat)}} key={idx} className={`text-lg  cursor-pointer outline-none ${index === idx ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]" : ''}`}>
                            {cat}
                        </Tab>
                    })
                }
                </TabList>
                {
                    categories.map((_,idx) => {
                        return <TabPanel key={idx}>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.length > 0 ? 
                            filteredProducts.map((product,idx) => {
                                return <div
                                key={idx}
                                className="  bg-white border-gray-200 flex p-5 gap-5 items-center justify-around border rounded-lg"
                              >
                                <Image
                                src={product?.image}
                                height='150'
                                width='150'
                                alt = "mobile-phone"  
                                />
                                {/* <img src={product.image} alt="" lazyLoad={true}/> */}
        
                                <div className="flex-1 flex flex-col justify-between h-full">
                                <p className="text-[#1A1A7E] text-sm mb-2">
                                  In stock {product.stocks} Items
                                </p>
        
                                <h3 className="text-lg font-medium mb-2">
                                  {product.title}
                                </h3>
        
                                <p className="text-xl text-gray-800 font-bold mb-4">
                                  ${product.price}
                                </p>
        
                                <button className="bg-[#1A1A7E] text-white w-full py-2 rounded-lg font-semibold  transition-colors">
                                  Order Now
                                </button>
                                </div>
                              </div>
                            })
                            : (
                                <p>No products found</p>
                            )
                        }
                        </div>
                    </TabPanel>
                    })
                    
                    
                }
           
            </Tabs>
            

        </div>
    );
};

export default RecommendedProducts;