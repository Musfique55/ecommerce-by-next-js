'use client'
import { useState, useEffect } from 'react';
import products from '/products.json';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
const TrendingProducts = () => {
   const [currentCategory,setCurrentCategory] = useState('Speaker'); 
   const [index,setIndex] = useState(0);
   const categories = [...new Set(products.map(product => product.category))];
   const filteredProducts = products.filter(product => product.category === currentCategory);

//    console.log(thisCategory);
    return (
        <div className="mt-10">
            <h2 className="text-3xl font-semibold">Trending Products</h2>

            <Tabs className="mt-5">
                <TabList className="flex gap-5 mb-5">
                    {
                        categories.map((category,idx) => {
                            return <Tab key={idx} onClick={() => {setCurrentCategory(category);setIndex(idx)}} className={`text-lg  cursor-pointer outline-none ${index === idx ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]" : ""}`}>{category}</Tab>
                        })
                    }
                </TabList>

                {
                    categories.map((_,idx) => {
                       return <TabPanel key={idx}>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {
                                    filteredProducts.length > 0  ? 
                                    filteredProducts.map((product,idx)=> {
                                        return (
                                            <div key={idx}>
                                            {/* <Image /> */}
                                            <h3 className="text-lg font-semibold">{product.title}</h3>
                                            <p className="text-gray-600">${product.price}</p>
                                            <p className="text-yellow-500">Rating: {product.ratings}★</p>
                                            <p className="text-green-500">In Stock: {product.stocks}</p>
                                            </div>
                                        )
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

export default TrendingProducts;