'use client'
import React, {  useEffect, useState } from 'react';
import { FaFacebook, FaRegHeart, FaRegUser } from 'react-icons/fa6';
import companyLogo from '/app/assets/download__4_-removebg-preview-removebg-preview (1).png';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Navbar from './Navbar';
import Image from 'next/image';
import useStore from '../CustomHooks/useStore';
import CartItems from './CartItems';
import Link from 'next/link';
import Search from './Search';
import LoginForm from './LoginForm';
import Modal from './Modal';
import RegisterForm from './RegisterForm';
import 'animate.css';
import { IoLocationOutline } from 'react-icons/io5';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { userId } from '../(home)/page';
const Header = ({data}) => {
    const {getCartItems,refetch,setRefetch,setOpenCart,openCart,getWishList,isLoginModal,setIsLoginModal,setToken,setHasToken} = useStore();
    const [scroll,setScroll] = useState(0);
    const [keyword,setKeyword] = useState('');
    const [searchedItem,setSearchedItem] = useState([]);
    const [isRegistered,setIsRegistered] = useState(false);
    const [showUserInfo,setShowUserInfo] = useState(false);
    const [email,setEmail] = useState(null);
    const [reload,setReload] = useState(false);
    const pathname = useSearchParams();

    useEffect(() => {
        const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
        if(userEmail){
            setEmail(userEmail);
            setReload(false);
        }
    },[email,reload])

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

    useEffect(() => {
        if(pathname.get('login') == 'false'){
            setIsLoginModal(true)
        }
    },[pathname])
   
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
    
    if(keyword){
        axios.post(`https://www.outletexpense.xyz/api/public/search-product`,{keyword, user_id:userId})
        .then(res => {
            setSearchedItem(res.data.data.data)
        })
        .catch(err => console.log(err))
    }
   }

   useEffect(() => {
    searchedItems()
   },[keyword])

   const handleModalClose = () => setIsLoginModal(false);

   const handleUserInfo = () => {
    setShowUserInfo(true);
   }

   const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setHasToken(false)
    setEmail(null);
   }

    return (
        <div className={` w-full z-50 fixed text-white  transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${scroll > 0 ? ' shadow-lg' : ''}`}>
            {/* desktop menu */}
           <div className='flex gap-3 justify-between items-center bg-white text-black p-3 md:px-12'>
           <Link href={'/'}><Image src={companyLogo} alt='company-logo' height={100} width={100} className='w-auto h-auto'/></Link>
            <div className='hidden md:flex lg:flex gap-2 flex-1'>
                <input onChange={(e) => setKeyword(e.target.value)} value={keyword}  type="text" placeholder='Search for Products' className='border  p-2 md:w-[20rem] lg:w-[32rem] outline-none text-black bg-white text-sm rounded-md'/>
                <button className='bg-[#1A1A7E] text-white px-6 text-sm rounded-md'>Search</button>
            </div>
            <div className='hidden md:hidden lg:flex items-center  gap-4 '>
                <Link  href={'/find-our-store'} className='flex items-center text-nowrap gap-1 border py-1 px-2 rounded-md text-sm border-[#1A1A7E]'><span><IoLocationOutline /></span> Store Location</Link>
                
                <Link target='_blank' href={'https://www.facebook.com/brothersmobile520'} className='flex text-nowrap items-center gap-1 border py-1 px-2 rounded-md text-sm border-[#1A1A7E]'><FaFacebook /> Facebook Page</Link>
            </div>
            <div className='flex items-center gap-3 text-black relative'>
               {
                email ?<div  onMouseEnter={handleUserInfo} onMouseLeave={() => setShowUserInfo(false)}>
                <div className='border p-2 rounded-full border-[#1A1A7E]'><FaRegUser  className='font-semibold  text-xl  cursor-pointer hover:text-blue-500'/></div>
                </div> :<div className='border p-2 rounded-full border-[#1A1A7E]'><FaRegUser  onClick={() => {setIsLoginModal(true)}} className='font-semibold  text-xl cursor-pointer hover:text-blue-500'/></div> 
               }
               <div className='relative border p-2 rounded-full border-[#1A1A7E]'>
               <Link href={'/wishlist'}  >
                    <FaRegHeart className='font-semibold hover:text-blue-500  text-xl cursor-pointer'/>
                </Link>
                <p className=" bg-[#1A1A7E] text-white cursor-pointer w-fit px-1 rounded-full text-sm absolute -top-3 -right-1">{wishList.length || 0}</p>
               </div>
                
                <div className="relative border p-2 rounded-full border-[#1A1A7E]" onClick={() => setOpenCart(!openCart)}>
                <HiOutlineShoppingBag className='font-semibold hover:text-blue-500 text-xl cursor-pointer'/>
                <p className='bg-[#1A1A7E] cursor-pointer text-white w-fit px-1 rounded-full text-sm absolute -top-2 -right-1'>{total}</p>
                </div>
                {   showUserInfo &&
                    <div onMouseEnter={handleUserInfo} onMouseLeave={() => setShowUserInfo(false)} className={`bg-white shadow-lg absolute z-50 top-9 -right-1`}>
                        <p className='border-b cursor-pointer p-3 hover:text-blue-500'>{email}</p>
                        <p onClick={handleLogout} className='p-3 cursor-pointer hover:text-blue-500'>Logout</p>
                    </div>
                }
            </div>
           </div>
           <Navbar data={data}/>
           {
            openCart && <CartItems />
           }

           {/* searchedItems */}
           {
            keyword ? <Search 
            searchedItem={searchedItem}
            setKeyword={setKeyword}
            setSearchedItem={setSearchedItem}
            /> : null
           }

           {
            isLoginModal ? 
            <Modal 
            content={isRegistered ? 
            <LoginForm  
            isLoginModal={isLoginModal} 
            onClose = {handleModalClose}
            setIsRegistered={setIsRegistered} 
            setReload={setReload}
            isRegistered={isRegistered}/> : 
            <RegisterForm 
            setIsRegistered={setIsRegistered} 
            isLoginModal={isLoginModal} 
            isRegistered={isRegistered} />} 
            onClose = {handleModalClose}
            setReload={setReload}
            title={isRegistered ? "Sign In" : 'Sign Up'}/> : null
           }
           
           <Toaster 
            toastOptions={{
                className: '',
                style: {
                background : '#161616',
                padding: '10px 16px 10px 16px',
                color: '#C7C6D3',
                },
            }}
            containerStyle={{
                top: 20,
                left: 50,
                bottom: 20,
                // right: 20,
            }}
            />
        </div>
    );
};

export default Header;