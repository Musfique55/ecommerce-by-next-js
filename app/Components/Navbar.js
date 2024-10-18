'use client'
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { CiGrid41 } from "react-icons/ci";
import { RiMenu4Fill } from "react-icons/ri";

const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false);
    
const navItems = [
    {
        title : 'Home',
        link : '/' 
    },
    {
        title : 'Products',
        link : '/' 
    },
    {
        title : 'Shop',
        link : '/' 
    },
    {
        title : 'About',
        link : '/' 
    },
    {
        title : 'Contact',
        link : '/' 
    },
    {
        title : 'Blog',
        link : '/' 
    }
]

    return (
        <>
        {/* desktop menu */}
            <div className='border-t w-full bg-white text-black z-40 p-5 hidden items-center gap-10 md:px-12 md:hidden lg:flex'>
            <Link href={'/'}>
            <div className='flex items-center gap-3'>
                <CiGrid41 className='text-lg'/>
                <p className='font-medium'>All Categories</p>
            </div>
            </Link>
            <div className='flex justify-between items-center flex-1'>
                <div className='flex gap-5 border-l-2 border-gray-300'>
                {
                    navItems.map((item,idx) => {
                        return <Link key={idx} href={item.link} className={`text-gray-600  ${idx === 0 ? 'pl-5' : ''}`}>{item.title}</Link>
                    })
                }
                </div>
                <div >
                    <p>Up to <span className='text-[#1A1A7E] font-medium'>60%</span> off to all items</p>
                </div>
            </div>
        </div>

        {/* tablet menu */}
        <div className='hidden  border-t p-5 md:flex lg:hidden items-center gap-10 md:px-12'>
            <Link href={'/'}>
            <div className='flex items-center gap-3'>
                <CiGrid41 className='text-lg'/>
                <p className='font-medium'>All Categories</p>
            </div>
            </Link>
            <div className='flex justify-between items-center flex-1 '>
                <div className='flex gap-5 border-l-2 border-gray-300'>
                {
                    navItems.map((item,idx) => {
                        return <Link key={idx} href={item.link} className={`text-gray-600 dark:text-white ${idx === 0 ? 'pl-5' : ''}`}>{item.title}</Link>
                    })
                }
                </div>
                
            </div>
            <div>
                    <p>Up to <span className='text-[#1A1A7E] font-medium'>60%</span> off to all items</p>
            </div>
        </div>


        {/* mobile menu */}
        <div className='relative'>
        <div className='  border-t p-5 flex justify-between lg:hidden items-center gap-10 md:px-12 md:hidden '>
            <Link href={'/'}>
            <div className='flex  items-center gap-3'>
                <CiGrid41 className='text-lg'/>
                <p className='font-medium'>All Categories</p>
            </div>
            </Link>
            <div onClick={() => setIsOpen(!isOpen)}>
                
                <RiMenu4Fill className='text-white text-right text-xl'/>
            </div>
            
        </div>
            {
                isOpen && <div className='bg-white flex flex-col space-y-3 text-black p-5 transition ease-in-out'>
                {
                        navItems.map((item,idx) => {
                            return <Link onClick={() => setIsOpen(!isOpen)} key={idx} href={item.link} className={`text-gray-600 dark:text-black `}>{item.title}</Link>
                        })
                    }
                </div>
            }
        </div>
        </>
    );
};

export default Navbar;