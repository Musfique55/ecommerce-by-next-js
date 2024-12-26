import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Search = ({searchedItem,setSearchText,setSearchedItem,searchBarRef}) => {

    return (
        <>
        {   searchedItem && searchedItem.length > 0 ? 
            <div ref={searchBarRef} className='bg-white text-black w-[28rem] p-5 absolute lg:top-[4.5rem] top-[10rem] z-[1000] lg:z-50 left-1/2 transform -translate-x-1/2 rounded-md'>
            <h5 className='text-right'>Products</h5>
            <div className='flex flex-col gap-3'>
                {
                    searchedItem.slice(0,5).map((item,idx) => {
                        return <Link onClick={() => {setSearchText(''),setSearchedItem([])}} href={`/products/${item.id}`} key={idx} className='flex gap-2 items-center z-50 hover:bg-gray-200'>
                            {
                                item?.images?.length > 0 ? 
                                <Image
                                    src={item?.images[0]}
                                    height={50} 
                                    width={50} 
                                    alt="mobile-phone"
                                    quality={75}
                                />  : 
                                item?.image_path ? 
                                <Image 
                                src={item.image_path}
                                height={50}
                                width={50}
                                alt='product'
                                />
                                :
                                <Image
                                    src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                                    height={50} 
                                    width={50} 
                                    alt="mobile-phone"
                                    quality={75}
                                />
                            }
                            <h3 className='text-black text-sm font-medium z-50'>{item.name}</h3>
                        </Link>
                    })
                }
            </div>
            
        </div>
        : <p>No Products</p>

        }
        </>
    );
};

export default Search;