import React from 'react';
import Sponsors from './Sponsors';
import { FaFacebookF, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa6';
import Image from 'next/image';

const Footer = () => {
    return (
        <div >
            <Sponsors />
            <div className='bg-[#F2F3F7] flex justify-between flex-wrap items-center p-5 md:px-12 md:flex-nowrap'>
                <h3 className='font-semibold text-xl mb-4 text-black'>Sign Up For Newsletter & Get 20% Off</h3>
                <div className='flex items-center gap-3'>
                    <input type="text" placeholder='Enter Your Email' className='p-2 border-2 outline-none  md:w-72 lg:w-72'/>
                    <button className='bg-[#1A1A7E] text-white p-2 rounded-sm'>Subscribe</button>
                </div>
            </div>
            <footer className="bg-white text-gray-700 py-10 px-5 md:px-12">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
                    {/* Left Section - Company Info */}
                    <div className="col-span-2 space-y-3">
                    
                    <Image src={'https://lh5.googleusercontent.com/proxy/lIj6Eiy46BsCbQnELvfarNxD0O9St_tQpnTftcr0lmOD361EfYxlO-9wBSA9DV2N0rTLJgl89hRXwGDGWObAijvhvcHxMCwnQz7egxS9C8EKRfKx1hQt'} height={100} width={150} alt='company-logo'/>
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
                    <ul className="space-y-2 text-sm">
                        <li><a href="#">Laptop & Desktop</a></li>
                        <li><a href="#">Smart Home Electronics</a></li>
                        <li><a href="#">Smart Watches</a></li>
                        <li><a href="#">Internal Components</a></li>
                        <li><a href="#">Virtual Reality Headsets</a></li>
                    </ul>
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
                    <p className="text-sm text-gray-500">&copy; 2024 Squad Innovators. All rights reserved.</p>
                    <div className="flex space-x-4 mt-3 md:mt-0">
                        <a href="#" className="text-gray-500 hover:text-gray-700 text-xl"><FaTwitter /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 text-xl"><FaLinkedin /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 text-xl"><FaFacebookF /></a>
                    </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;