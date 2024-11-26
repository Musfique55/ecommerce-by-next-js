'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { RiMenu4Fill } from "react-icons/ri";
import CategoryPopup from './CategoryPopup';
import { FaPhoneAlt } from 'react-icons/fa';
import useSWR from 'swr';




const fetcher = (url) => fetch(url).then(res => res.json());

const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false);
    const [isHovered,setIsHovered] =useState(false);
    const {data, error, isLoading} = useSWR('https://www.outletexpense.xyz/api/public/categories/38',fetcher);

    

    const handleMobileCategory = () => {
        setIsHovered(!isHovered)
    }
    return (
        <div className='relative'>
        {/* desktop menu */}
            <div className='border-t w-full bg-gradient-to-r from-[#141129]  to-[#040209] text-white z-40 py-3 px-5 hidden items-center gap-10 md:px-12 md:hidden lg:flex'>
                
                <div onMouseEnter={() => setIsHovered(true)}  className='flex items-center gap-3'>
                    <Link href={'/'} className='font-semibold text-[13px]'>Home</Link>
                </div>
                
                <div className='flex justify-between items-center flex-1'>
                    <div className='flex items-center gap-5 border-l-2 border-gray-300'>
                    {
                        data?.data.slice(0,9).map((item,idx) => {
                            return <Link key={idx} href={`/category/${item.category_id}?category=${item.name}`} className={`text-white text-[13px] text-nowrap font-semibold  ${idx === 0 ? 'pl-5' : ''}`}>{item.name}</Link>
                        })
                    }
                    <Link href={'/'} className='flex items-center'>
                    <span className='text-[13px] text-transparent bg-gradient-to-r from-[#4F75FF] via-[#00CCDD] to-[#7CF5FF] font-semibold bg-clip-text'>
                        Online Exclusive
                    </span>
                    </Link>
                    </div>
                    <div > 
                    <p className='flex items-center text-[13px] gap-2'><span><FaPhoneAlt className='text-white' /></span>
                    +8801639-147270</p>
                    </div>
                </div>
            </div>

            {/* tablet menu */}
            <div className='relative z-[60]'>
            <div className='hidden bg-gradient-to-r from-[#141129]  to-[#040209] z-40 text-white border-t p-5 md:flex lg:hidden items-center gap-10 md:px-12'>
                <div onClick={handleMobileCategory} className='flex items-center gap-3'>
                <Link href={'/'} className='font-semibold text-[13px]'>Home</Link>
                </div>
                <div className='flex justify-between items-center flex-1 '>
                    <div className='flex gap-5 border-l-2 border-gray-300'>
                    {
                        data?.data.slice(0,6).map((item,idx) => {
                            return <Link key={idx} href={`/category/${item.category_id}?category=${item.name}`} className={`text-white text-nowrap  ${idx === 0 ? 'pl-5' : ''}`}>{item.name}</Link>
                        })
                    }
                    </div>
                    
                </div>

            </div>
                {/* <div className='bg-white text-black text-center z-40 hidden md:block lg:hidden'>
                        <p className='flex items-center gap-2 text-sm'>
                        <span><FaPhoneAlt className='text-white' /></span>
                        01639-147270</p>
                </div> */}
            </div>
            


            {/* mobile menu */}
            <div className='relative'>
            <div className='  border-t bg-gradient-to-r from-[#141129]  to-[#040209] text-white p-5 flex justify-between lg:hidden items-center gap-10 md:px-12 md:hidden '>
                <div onClick={handleMobileCategory} className='flex  items-center gap-3'>
                    <Link href={'/'} className='font-semibold text-[13px]'>Home</Link>
                </div>
                <div onClick={() => setIsOpen(!isOpen)}>           
                    <RiMenu4Fill className='text-white text-right text-xl'/>
                </div>
                
            </div>
                {
                    isOpen && <div className='bg-white flex flex-col space-y-3 text-black p-5 transition ease-in-out'>
                    {
                           data?.data.slice(0,6).map((item,idx) => {
                                return <Link onClick={() => setIsOpen(!isOpen)} key={idx} href={`/category/${item.category_id}?category=${item.name}`} className={`text-gray-600 text-nowrap dark:text-black `}>{item.name}</Link>
                            })
                        }
                    </div>
                }
            </div>

            {/*all categories */}
            {/* {isHovered && <CategoryPopup isHovered={isHovered} setIsHovered={setIsHovered}/>} */}
            {/* {isHovered && <CategoryPopup isHovered={isHovered} setIsHovered={setIsHovered}/>} */}
            
        </div>
    );
};

export default Navbar;