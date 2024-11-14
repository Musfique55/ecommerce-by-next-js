import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Heading from '../CustomHooks/heading';
import appleLogo from '/app/assets/galati-romania-april-29-2023-600nw-2295394661-ezgif.com-webp-to-png-converter-removebg-preview.png';
import samsungLogo from '/app/assets/Samsung-Logo-2005-present-removebg-preview.png';
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
            alt='huawei'
            src={'https://upload.wikimedia.org/wikipedia/commons/f/fa/Huawei_logo_icon_170010.png'}
            height={75}
            width={75}
            /></Link>
            <Link href={'/brands'}><Image
            alt='nokia'
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXP6Yq-KaR8wTfr8fPYuaOLPxazR9jT0qJA&s'}
            height={75}
            width={75}
            /></Link>
            <Link href={'/brands'}><Image
            alt='canon'
            src={'https://global.canon/en/corporate/logo/img/logo_01.png'}
            height={75}
            width={75}
            /></Link>
            <Link href={'/brands'}>
            <Image
            alt='sharp'
            src={'https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_of_the_Sharp_Corporation.svg'}
            height={75}
            width={75}
            />
            </Link>
            </div>
           
        </div>
    );
};

export default Brands;