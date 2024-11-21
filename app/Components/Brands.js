import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Heading from '../CustomHooks/heading';
import appleLogo from '/app/assets/galati-romania-april-29-2023-600nw-2295394661-ezgif.com-webp-to-png-converter-removebg-preview.png';
import oneplusLogo from '/app/assets/OnePlus-Logo.png'
import honorLogo  from '/app/assets/Honor_(brand)-Logo.wine.png'
import googleLogo from '/app/assets/google-logo-editorial-vector-symbol-260nw-2317648589.webp';
import samsungLogo from '/app/assets/Samsung-Logo-2005-present-removebg-preview.png';
import xioamiLogo from '/app/assets/png-transparent-xiaomi-logo-robot-vacuums-brands.png';
const Brands = () => {
    return (
        <div className=' mt-12'>
            <div className="flex mb-8 justify-between items-center">
                <div className='h-5 w-10'>

                </div>
                <Heading title={'Shop By Brands'}/>
                <Link
                href="/brands"
                className="text-[#1A1A7E] hover:bg-[#1A1A7E] hover:text-white border rounded-3xl border-[#1A1A7E] flex items-center gap-2 px-2 h-fit py-1"
                >
                All Brands
                {/* <span className="sr-only">View all brands</span> */}
                <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                    />
                </svg>
                </Link>
            </div>
            <div className='flex items-center justify-center gap-5'>
            <Link href={'/brands'}>
            <Image
            alt='apple'
            src={appleLogo}
            height={75}
            width={75}
            />
            </Link>
            <Link href={'/brands'}>
            <Image
            alt='samsung'
            src={samsungLogo}
            height={75}
            width={75}
            />
            </Link>
            <Link href={'/brands'}><Image
            alt='honor'
            src={honorLogo}
            height={75}
            width={75}
            /></Link>
            <Link href={'/brands'}><Image
            alt='oneplus'
            src={oneplusLogo}
            height={75}
            width={75}
            /></Link>
            <Link href={'/brands'}><Image
            alt='google'
            src={googleLogo}
            height={75}
            width={75}
            /></Link>
            <Link href={'/brands'}>
            <Image
            alt='xiaomi'
            src={xioamiLogo}
            height={75}
            width={75}
            />
            </Link>
            </div>
           
        </div>
    );
};

export default Brands;