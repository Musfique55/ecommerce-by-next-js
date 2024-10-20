import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Search = ({searchedItem,setSearchText,setSearchedItem}) => {
    return (
        <>
        {   searchedItem.length > 0 ? 
            <div className='bg-white text-black w-[28rem] p-5 absolute top-[4.5rem] z-50 left-1/2 transform -translate-x-1/2'>
            <h5 className='text-right'>Products</h5>
            {
                
                searchedItem.map((item,idx) => {
                    return <Link onClick={() => {setSearchText(''),setSearchedItem([])}} href={`/products/${item.title}`} key={idx} className='flex gap-2 items-center  z-50'>
                        <Image 
                        src={item.image[0]}
                        height={100}
                        width={100}
                        alt='product'
                        />
                        <h3 className='text-black text-sm font-medium z-50'>{item.title}</h3>
                    </Link>
                })
                
            }
        </div>
        : null
        }
        </>
    );
};

export default Search;