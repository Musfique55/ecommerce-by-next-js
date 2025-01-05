"use client";
import React, { useEffect, useState } from "react";
import "react-range-slider-input/dist/style.css";
import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";
import { userId } from "../page";


const fetcher = (url) => fetch(url).then(res => res.json());

const Page = () => {
  const {data : brands} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/brands/${userId}`,fetcher);
  const [selectAlph,setSelectedAlph] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));


  useEffect(() => {
    if(brands?.data && brands?.data.length > 0){
    const sortedBrands =  brands.data.filter((item) => item.name.toLowerCase().startsWith(selectAlph.toLowerCase()));  
    setFilteredItems(sortedBrands)      
    }
  },[brands?.data,selectAlph])

   

  return (
    <>
      <div className="mt-40">
        <h3 className="text-black font-semibold text-3xl mb-5">All Brands</h3>
        <div className="flex flex-wrap gap-3 mb-5">
            <p onClick={() => setSelectedAlph('')} className={`text-base cursor-pointer   py-[2px] px-[3px] rounded-md hover:bg-[#12457f94] ${!selectAlph ? 'bg-[#12447F] text-white' : 'text-black'}`}>All</p>
            {
                alphabets.map((item,idx) => {
                    return <p onClick={() => setSelectedAlph(item)} key={idx} className={`text-base cursor-pointer 
                        lg:hover:bg-[#12457f41] py-[2px] px-[3px] rounded-md ${item === selectAlph ? "bg-[#12447F] text-white" : "bg-transparent text-black "}`}>{item}</p>
                })
            }
        </div>
        <hr  className="border-[#12447F] w-full lg:w-[80%] border-2"/>
        <div className="flex lg:gap-3 flex-wrap items-center">
        {filteredItems.length > 0 ?
         filteredItems.map((brand, idx) => {
          return (
            <Link href={`/brands/${brand.id}?brand=${brand.name}`} key={idx}>
                <button
                className={`${
                    "flex items-center gap-3 font-semibold text-black text-sm rounded-full px-2 py-1  hover:text-gray-500  transition-transform duration-300 hover:filter hover:grayscale-[70%]"
                } `}
                >
                <Image alt={brand.name} src={brand.image_path} width={70} height={70} className="inherit"/> 
                {brand.name}
                </button>
            </Link>
           
          );
        })  : <p className="text-center mt-5 text-black">No brand Available</p>
        } 
        </div>
       
      </div>
      
    </>
  );
};

export default Page;
