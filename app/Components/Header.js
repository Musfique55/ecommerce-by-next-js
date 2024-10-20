'use client'
import React, {  useEffect, useState } from 'react';
import { FaRegHeart, FaRegUser } from 'react-icons/fa6';
import { GoSearch } from 'react-icons/go';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Navbar from './Navbar';
import Image from 'next/image';
import useStore from '../CustomHooks/useStore';
import CartItems from './CartItems';
import Link from 'next/link';
import products from '/products.json';
import Search from './Search';
const Header = () => {
    const {getCartItems,refetch,setRefetch,setOpenCart,openCart,getWishList} = useStore();
    const [scroll,setScroll] = useState(0);
    const [searchText,setSearchText] = useState('');
    const [searchedItem,setSearchedItem] = useState([]);
    useEffect(() => {
        getCartItems();
        if(refetch){
            getCartItems();
            setRefetch(false);
        }
    },[refetch,getCartItems])

    useEffect(() => {
        getWishList();
        if(refetch){
            setRefetch(false)
            getWishList()
        }
    },[refetch,getWishList])
    const wishList = getWishList();
   const items =  getCartItems();
   const total = items?.reduce((acc,curr) => acc += curr.quantity,0) || 0;

   useEffect(() => {
    const handleScroll = () => {
        setScroll(window.scrollY);
    }
    window.addEventListener('scroll',handleScroll)    
   },[scroll])

   const searchedItems = () => {
    if(searchText){
        const items = products.filter(item => {
            const regex = new RegExp(searchText,'i');
            return regex.test(item.title)
        });
        setSearchedItem(items);
    }
   }

   useEffect(() => {
    searchedItems()
   },[searchText])


    return (
        <div className={` w-full z-50  transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${scroll > 0 ? 'fixed shadow-lg' : 'static'}`}>
            {/* desktop menu */}
           <div className='flex justify-between bg-white p-5  md:px-12'>
           <Link href={'/'}><Image src={'https://lh5.googleusercontent.com/proxy/lIj6Eiy46BsCbQnELvfarNxD0O9St_tQpnTftcr0lmOD361EfYxlO-9wBSA9DV2N0rTLJgl89hRXwGDGWObAijvhvcHxMCwnQz7egxS9C8EKRfKx1hQt'} alt='company-logo' height={100} width={100} className='w-auto h-auto'/></Link>
            <div className='hidden md:flex lg:flex'>
                <input onChange={(e) => setSearchText(e.target.value)} value={searchText} type="text" placeholder='Search for Anything' className='border p-2 md:w-[20rem] lg:w-[28rem] outline-none text-black'/>
                <button className='bg-[#1A1A7E] text-white px-4'><GoSearch /></button>
            </div>
            <div className='flex items-center gap-3 text-black'>
            <FaRegUser className='font-semibold text-xl cursor-pointer'/>
            <Link href={'/wishlist'}  className="relative">
                <FaRegHeart className='font-semibold text-xl cursor-pointer'/>
                <p className='bg-[#1A1A7E] text-white w-fit px-1 rounded-full text-sm absolute -top-3 -right-1'>{wishList.length || 0}</p>
            </Link>
            <div className="relative" onClick={() => setOpenCart(!openCart)}>
            <HiOutlineShoppingBag className='font-semibold text-2xl cursor-pointer'/>
            <p className='bg-[#1A1A7E] text-white w-fit px-1 rounded-full text-sm absolute -top-2 -right-1'>{total}</p>
            </div>
            </div>
           </div>
           <Navbar />
           {
            openCart && <CartItems />
           }

           {/* searchedItems */}
           {
            searchText ? <Search 
            searchedItem={searchedItem}
            setSearchText={setSearchText}
            setSearchedItem={setSearchedItem}
            /> : null
           }
           
        </div>
    );
};

export default Header;