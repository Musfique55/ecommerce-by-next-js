'use client'
import React from 'react';
import { FaFacebookF, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa6';
import Image from 'next/image';
import companyLogo from '/app/assets/download__4_-removebg-preview-removebg-preview (1).png';
import Link from 'next/link';
const Footer = ({data}) => {
    return (
        <div >
            <div className='bg-[#F2F3F7] flex justify-between flex-wrap items-center p-5 md:px-12 md:flex-nowrap'>
                {/* <h3 className='font-semibold text-xl mb-4 text-black'>Sign Up For Newsletter & Get 20% Off</h3>
                <div className='flex items-center gap-3'>
                    <input type="text" placeholder='Enter Your Email' className='p-2 text-black border-2 outline-none bg-white md:w-72 lg:w-72'/>
                    <button className='bg-[#1A1A7E] text-white p-2 rounded-sm'>Subscribe</button>
                </div> */}
            </div>
            <footer className="bg-gradient-to-r from-[#141129]  to-[#040209] text-white py-10 px-5 md:px-12">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
                    {/* Left Section - Company Info */}
                    <div className="col-span-2 space-y-3">
                    
                    <Image src={companyLogo} height={100} width={150} alt='company-logo'/>
                    <p className="mt-2 text-sm">
                        We’re not just an online store; {`we're`} your gateway to a world of cutting-edge electronics and telemobile devices.
                    </p>
                    <p className="mt-4 flex items-center">
                        <FaPhone className="mr-2 text-xl" /> 
                        <span className="text-lg font-semibold">(808) 555-0111</span>
                    </p>
                    <p className="text-sm mt-1">Got Questions? Call us 24/7</p>
                    </div>

                    {/* Center Section - Links */}
                    <div>
                    <h3 className="text-lg font-semibold mb-3">Popular Categories</h3>
                    <div className="space-y-2  flex flex-col justify-start">
                    {
                        data?.data.slice(0,6).map((item,idx) => {
                            return <Link key={idx} href={`/category/${item.category_id}?category=${item.name}`}  className={`text-white text-sm `}>{item.name}</Link>
                        })
                    }
                        
                    </div>
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold mb-3">Let Us Help You</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#">Your Account</a></li>
                        <li><a href="#">Your Order</a></li>
                        <li><a href="#">Return Policy</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Popular Products</a></li>
                    </ul>
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold mb-3">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Newsletter</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 border-t pt-5 text-center md:text-left">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-white">&copy; 2024 Squad Innovators. All rights reserved.</p>
                    <div className="flex space-x-4 mt-3 md:mt-0">
                        <a href="#" className="text-gray-500 hover:text-white text-xl"><FaTwitter /></a>
                        <a href="#" className="text-gray-500 hover:text-white text-xl"><FaLinkedin /></a>
                        <a href="#" className="text-gray-500 hover:text-white text-xl"><FaFacebookF /></a>
                    </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;