import Image from 'next/image';
import React from 'react';
import StoreProvider from '../StoreContext/store';
import "../globals.css";
import companyLogo from '/app/assets/download__4_-removebg-preview-removebg-preview (1).png';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Link from 'next/link';
const CheckoutLayout = ({children}) => {
    return (
        <html>
        <StoreProvider>
            <body className='bg-white'>
            <div className='text-black h-full w-full   ' >
                <div className='flex justify-between items-center border p-5  md:p-12'>
                    <Link href={'/'}><Image height={100} alt='company-logo' width={100} src={companyLogo}/> </Link>
                    <Link href={'/cart'}><HiOutlineShoppingBag className='text-[rgba(25,144,198,1)] text-xl'/></Link>
                </div>
                <div className='nunito'>
                {children}
                </div>
            </div>
            </body>
        </StoreProvider>
        </html>
        
        
    );
};

export default CheckoutLayout;