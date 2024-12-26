import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Heading from '../CustomHooks/heading';
const Brands = ({brands}) => {

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
            {
                brands?.data && brands?.data.length > 0 ?
                brands.data.map((item) => {
                    return <Link key={item.id} href={`/brands/${item.id}?brand=${item.name}`}>
                    <Image
                    alt='apple'
                    src={item.image_path}
                    height={75}
                    width={75}
                    />
                    </Link>
                })
                : <p>No Brands Available</p>
            }    
            
            
            </div>
           
        </div>
    );
};

export default Brands;