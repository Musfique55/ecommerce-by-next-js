'use client'
import Image from 'next/image';
import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useState } from 'react';
import Heading from '../CustomHooks/heading';
import useStore from '../CustomHooks/useStore';
import Link from 'next/link';

const RecommendedProducts = ({categories,products}) => {
    const trendingProducts = categories.slice(2).reverse();
    const [currentCategory,setCurrentCategory] = useState(trendingProducts[0]);
    const [index, setIndex] = useState(0);
    const {handleCart} = useStore();
    const filteredProducts = products.filter(
        (product) => product.category === currentCategory
      );
    return (
        <div className="mt-12">
          <Heading title={'Recommended for you'}/>
            <Tabs >
                <TabList className="flex gap-5 mb-10 flex-wrap">
                {
                    trendingProducts.map((cat,idx) => {
                        return <Tab onClick={() => {setIndex(idx);setCurrentCategory(cat)}} key={idx} className={`text-lg  cursor-pointer outline-none ${index === idx ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]" : 'text-black'}`}>
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
                                return <Link
                                key={idx}
                                href={`products/${product.title}`}
                                className="max-w-sm bg-white  border-gray-200 flex flex-col justify-between p-4 border rounded-lg md:flex-row "
                              >
                                <Image
                                src={product?.image[0]}
                                height='150'
                                width='150'
                                alt = "mobile-phone"  
                                />
                                {/* <img src={product.image} alt="" lazyLoad={true}/> */}
        
                                <div className="flex-1 flex flex-col justify-between h-full">
                                <p className="text-[#1A1A7E] text-sm mb-2">
                                  In stock {product.stocks} Items
                                </p>
        
                                <h3 className="text-lg font-medium mb-2 text-black">
                                  {product.title}
                                </h3>
        
                                <p className="text-xl text-gray-800 font-bold mb-4">
                                  ${product.price}
                                </p>
        
                                <button onClick={(e) => {e.preventDefault(),handleCart(product,1)}} className="bg-[#1A1A7E] text-white w-full py-2 rounded-lg font-semibold  transition-colors">
                                  Add to Cart
                                </button>
                                </div>
                              </Link>
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