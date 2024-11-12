'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { CiGrid41 } from "react-icons/ci";
import { RiMenu4Fill } from "react-icons/ri";
import CategoryPopup from './CategoryPopup';
import colletion from '/collection.json';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi2';
const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false);
    const [isHovered,setIsHovered] =useState(false);

// const navItems = [
//     {
//         title : 'Home',
//         link : '/' 
//     },
//     {
//         title : 'Products',
//         link : '/products' 
//     },
//     {
//         title : 'About',
//         link : '/' 
//     },
//     {
//         title : 'Contact',
//         link : '/' 
//     },
//     {
//         title : 'Blog',
//         link : '/' 
//     }
// ]

    const handleMobileCategory = () => {
        setIsHovered(!isHovered)
    }
    return (
        <div className='relative'>
        {/* desktop menu */}
            <div className='border-t w-full bg-gradient-to-r from-[#141129]  to-[#040209] text-white z-40 py-3 px-5 hidden items-center gap-10 md:px-12 md:hidden lg:flex'>
                <Link href={'#'}>
                <div onMouseEnter={() => setIsHovered(true)}  className='flex items-center gap-3'>
                    <Link href={'/'} className='font-semibold text-sm'>Home</Link>
                </div>
                </Link>
                <div className='flex justify-between items-center flex-1'>
                    <div className='flex gap-5 border-l-2 border-gray-300'>
                    {
                        colletion.map((item,idx) => {
                            return <Link key={idx} href={item.category} className={`text-white text-xs font-semibold  ${idx === 0 ? 'pl-5' : ''}`}>{item.category}</Link>
                        })
                    }
                    <Link href={'/'} className='text-xs text-white bg-gradient-to-r from-[#4F75FF] via-[#00CCDD] to-[#7CF5FF] font-semibold bg-clip-text text-transparent'>Online Exclusive</Link>
                    </div>
                    <div > 
                    <p className='flex items-center text-sm gap-2'><span><FaPhoneAlt className='text-white' /></span>
                    +8801639-147270</p>
                    </div>
                </div>
            </div>

            {/* tablet menu */}
            <div className='relative z-[60]'>
            <div className='hidden bg-white z-40 text-black border-t p-5 md:flex lg:hidden items-center gap-10 md:px-12'>
                <div onClick={handleMobileCategory} className='flex items-center gap-3'>
                    <CiGrid41 className='text-lg'/>
                    <p className='font-medium'>All Categories</p>
                </div>
                <div className='flex justify-between items-center flex-1 '>
                    <div className='flex gap-5 border-l-2 border-gray-300'>
                    {
                        colletion.map((item,idx) => {
                            return <Link key={idx} href={item.category} className={`text-white  ${idx === 0 ? 'pl-5' : ''}`}>{item.category}</Link>
                        })
                    }
                    </div>
                    
                </div>
            </div>
                <div className='bg-white text-black text-center z-40 hidden md:block lg:hidden'>
                        <p className='flex items-center gap-2 text-sm'>
                        <span><FaPhoneAlt className='text-white' /></span>
                        01639-147270</p>
                </div>
            </div>
            


            {/* mobile menu */}
            <div className='relative'>
            <div className='  border-t bg-white text-black p-5 flex justify-between lg:hidden items-center gap-10 md:px-12 md:hidden '>
                <div onClick={handleMobileCategory} className='flex  items-center gap-3'>
                    <CiGrid41 className='text-lg'/>
                    <p className='font-medium'>All Categories</p>
                </div>
                <div onClick={() => setIsOpen(!isOpen)}>           
                    <RiMenu4Fill className='text-black text-right text-xl'/>
                </div>
                
            </div>
                {
                    isOpen && <div className='bg-white flex flex-col space-y-3 text-black p-5 transition ease-in-out'>
                    {
                            colletion.map((item,idx) => {
                                return <Link onClick={() => setIsOpen(!isOpen)} key={idx} href={item.category} className={`text-gray-600 dark:text-black `}>{item.category}</Link>
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