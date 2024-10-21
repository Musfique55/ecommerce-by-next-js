'use client'
import React, { useRef, useState } from 'react';
import products from '/products.json';
import categories from '/collection.json';
import { MdColorLens } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
const AllProducts = () => {
    const collectionRef = useRef(null);
    const [current,setCurrent] = useState('');
    // const handleProducts = async () => {
    //     const res = await fetch('/products.json');
    //     const data = await res.json();
    //     return data;
    // }
     // const all = await handleProducts();
    
     const handleMouseEnter = (itemCategory) => {
        setCurrent(itemCategory);
      };
    
      const handleMouseLeave = () => {
        setCurrent(null);
      };

    return (
        <div className='text-black  grid col-span-1 md:grid-cols-5 gap-8'>
                {
                    categories.length > 0 ? 
                    categories.map((item,idx) => {
                        return <Link href={`/category/${item.category}`} key={idx} ref={collectionRef} onMouseEnter={ () => handleMouseEnter(item.category)} onMouseLeave={handleMouseLeave} className=' relative flex flex-col items-center justify-between'>
                            <Image 
                            src={item?.image}
                            width={200}
                            height={200}
                            alt='category-image'
                            className='bg-black hover:scale-105 cursor-pointer'
                            />
                            <h2 className='text-2xl text-center mt-3'>{item.category}</h2>
                            <Link className='text-[#8A8A8A] mt-3 border-b hover:border-gray-300' href={`/category/${item.category}`}>View Products</Link>

                            {
                                current === item.category && collectionRef.current &&
                                (<div className='bg-[rgba(0,0,0,0.5)] absolute h-[200px] w-[200px] top-0 text-white flex justify-center items-center cursor-pointer'>
                                {
                                    products.filter((product) => product.category === item.category).length
                                }
                                {' '} Products
                                </div>)
                            }
                        </Link>
                    })
                    : <p>No Collection Found</p>
                }
        </div>
    );
};

export default AllProducts;