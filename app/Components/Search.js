import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Search = ({searchedItem,setSearchText,setSearchedItem}) => {
    // console.log(searchedItem.slice(0,5));
    return (
        <>
        {   searchedItem.length > 0 ? 
            <div className='bg-white text-black w-[28rem] p-5 absolute top-[4.5rem] z-50 left-1/2 transform -translate-x-1/2'>
            <h5 className='text-right'>Products</h5>
            <div className='flex flex-col gap-3'>
                {
                    
                    searchedItem.slice(0,5).map((item,idx) => {
                        return <Link onClick={() => {setSearchText(''),setSearchedItem([])}} href={`/products/${item.id}`} key={idx} className='flex gap-2 items-center  z-50'>
                            <img 
                            src={item.image_path}
                            height={50}
                            width={50}
                            alt='product'
                            />
                            <h3 className='text-black text-sm font-medium z-50'>{item.name}</h3>
                        </Link>
                    })
                    
                }
            </div>
            
        </div>
        : ""
        }
        </>
    );
};

export default Search;