'use client'
import React, {  useEffect, useState } from 'react';
import { FaFacebook, FaRegHeart, FaRegUser } from 'react-icons/fa6';
import companyLogo from '/app/assets/WhatsApp Image 2024-12-10 at 19.23.01_515d1d11.jpg'
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
import { SearchIcon } from 'lucide-react';
const Header = ({data}) => {
    const {getCartItems,refetch,setRefetch,setOpenCart,openCart,getWishList} = useStore();
    const [scroll,setScroll] = useState(0);
    const [keyword,setKeyword] = useState('');
    const [searchedItem,setSearchedItem] = useState([]);
    const [isShowModal,setIsShowModal] = useState(false); 
    const [isRegistered,setIsRegistered] = useState(false);
    const [showUserInfo,setShowUserInfo] = useState(false);
    const [email,setEmail] = useState(null);
    const [reload,setReload] = useState(false);

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
        axios.post('https://www.outletexpense.xyz/api/public/search-product',{keyword})
        .then(res => setSearchedItem(res.data.data.data))
        .catch(err => console.log(err))
    }
   }

   useEffect(() => {
    searchedItems()
   },[keyword])

   const handleModalClose = () => setIsShowModal(false);

   const handleUserInfo = () => {
    setShowUserInfo(true);
   }

   const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setEmail(null)
   }

    return (
        <div className={` w-full z-50  text-white  transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${scroll > 0 ? 'fixed shadow-lg' : 'relative'}`}>
            {/* desktop menu */}
           <div className='flex justify-between bg-black text-white p-3 md:px-12'>
           <Link href={'/'}><Image src={companyLogo} alt='company-logo' height={20} width={50} className='w-auto h-auto'/></Link>
            <div className='hidden md:flex lg:flex  flex-1 items-center'>
                <input onChange={(e) => setKeyword(e.target.value)} value={keyword}  type="text" placeholder='Search for Products' className='border ml-8 px-2 py-1 h-10 md:w-[20rem] lg:w-[28rem] outline-none text-black bg-white text-sm rounded-full placeholder:text-gray-500'/>
                {/* <button className='bg-[#0E7BBB] text-white px-6 text-sm rounded-md h-10'>Search</button> */}
                <SearchIcon className='cursor-pointer -ml-10 text-[#0E7BBB]' size={28}/>
            </div>
            <div className='hidden md:hidden lg:flex items-center gap-4 mr-10'>
                <Link target='_blank' href={'https://www.google.com/maps/search/?api=1&query=Jamuna+Future+Park+Level+4,+Block+C+Shop+19C+KA+244,+Kuril+Progoti+Soroni+1229'} className='flex items-center gap-1 border py-1 px-2 rounded-md text-sm border-[#0E7BBB]'><span><IoLocationOutline /></span> Store Location</Link>
                
                <Link target='_blank' href={'https://www.facebook.com/brothersmobile520'} className='flex items-center gap-1 border py-1 px-2 rounded-md text-sm border-[#0E7BBB]'><FaFacebook /> Facebook Page</Link>
            </div>
            <div className='flex items-center gap-3 text-black relative'>
               {
                email ?<div  onMouseEnter={handleUserInfo} onMouseLeave={() => setShowUserInfo(false)}>
                <div className='border p-2 rounded-full text-white  border-[#0E7BBB]'><FaRegUser  className='font-semibold  text-xl  cursor-pointer hover:text-blue-500'/></div>
                </div> :<div className='border p-2 rounded-full text-white  border-[#0E7BBB]'><FaRegUser  onClick={() => {setIsShowModal(true)}} className='font-semibold  text-xl cursor-pointer text-white  hover:text-blue-500'/></div> 
               }
               <div className='relative border p-2 rounded-full border-[#0E7BBB]'>
               <Link href={'/wishlist'}  >
                    <FaRegHeart className='font-semibold text-white hover:text-blue-500  text-xl cursor-pointer'/>
                </Link>
                <p className=" bg-[#0E7BBB] text-white cursor-pointer w-fit px-1 rounded-full text-sm absolute -top-3 -right-1">{wishList.length || 0}</p>
               </div>
                
                <div className="relative border p-2 rounded-full border-[#0E7BBB]" onClick={() => setOpenCart(!openCart)}>
                <HiOutlineShoppingBag className='font-semibold text-white hover:text-blue-500 text-xl cursor-pointer'/>
                <p className='bg-[#0E7BBB] cursor-pointer text-white w-fit px-1 rounded-full text-sm absolute -top-2 -right-1'>{total}</p>
                </div>
                {   showUserInfo &&
                    <div onMouseEnter={handleUserInfo} onMouseLeave={() => setShowUserInfo(false)} className={`bg-white shadow-lg absolute z-50 top-9 -right-1`}>
                        <p className='border-b cursor-pointer p-3  hover:text-blue-500'>{email}</p>
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
            isShowModal ? 
            <Modal 
            content={isRegistered ? 
            <LoginForm  
            isShowModal={isShowModal} 
            onClose = {handleModalClose}
            setIsRegistered={setIsRegistered} 
            setReload={setReload}
            isRegistered={isRegistered}/> : 
            <RegisterForm 
            setIsRegistered={setIsRegistered} 
            isShowModal={isShowModal} 
            isRegistered={isRegistered} />} 
            isShowModal={isShowModal}
            onClose = {handleModalClose}
            setReload={setReload}
            title={isRegistered ? "Sign In" : 'Sign Up'}/> : null
           }
           
        </div>
    );
};

export default Header;