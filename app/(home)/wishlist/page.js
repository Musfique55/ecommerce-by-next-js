'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import useStore from '@/app/CustomHooks/useStore';

const WishList = () => {
    const {getWishList,handleCart,handleWishlistDelete,refetch,setRefetch} = useStore();
    const [mounted, setMounted] = useState(false);
    const [wishList,setWishList] = useState([])
    useEffect(() => {
        setMounted(true);
        setWishList(getWishList());
        if(refetch){
            setRefetch(false)
            setWishList(getWishList());
            
        }
    },[refetch,setRefetch,getWishList])

    if(!mounted){
        return null;
    }
    return (
        <div>
            <div className='bg-black text-white p-5 text-center text-xl'>
                <h3>Wishlist</h3>
            </div>
            <div className='overflow-x-auto'>
            <table className='text-black w-full mt-10 bg-white'>
                <thead >
                    <tr className='border border-gray-300 py-4 '>
                        <th className="text-center align-middle me-4"></th>
                        <th className="text-center align-middle text-nowrap px-4">Product Image</th>
                        <th className="text-center align-middle text-nowrap px-4">Product Name</th>
                        <th className="text-center align-middle text-nowrap px-4">Unit Price</th>
                        <th className="text-center align-middle text-nowrap px-4">Stock Status</th>
                        <th className="text-center align-middle text-nowrap px-4 "></th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        wishList.length > 0 ?
                        wishList.map((item,idx) => {
                            return <tr key={idx} className='text-black  justify-items-center items-center border border-gray-300 '>
                                <td className='align-middle pl-2'>
                                    <IoClose onClick={() => handleWishlistDelete(item.title)} className='cursor-pointer'/>
                                </td>
                                <td className=''>
                                    <img 
                                    src={item.image[0]}
                                    height={100}
                                    width={100}
                                    alt='product-image'
                                    className='mx-auto'
                                    />
                                </td>
                                <td className='text-lg text-center font-semibold align-middle'>
                                {item.title}
                                </td>
                                <td className='align-middle text-center'>
                                    {item.price}
                                </td>
                                <td className='align-middle text-center'> 
                                    {item.stocks}
                                </td>
                                <td className='align-middle text-center pr-2'>
                                <button onClick={() => handleCart(item,1)} className="text-nowrap py-2 px-3 bg-[#4d5959] text-white mx-auto rounded-md hover:bg-[#3c4949] transition-colors md:py-2 md:px-4"
    >Add to Cart</button>
                                </td>
                            </tr>
                        }) 
                        : <tr className='text-black text-center border border-gray-300 '>
                            <td colSpan="6" className="text-center py-4"><p>No products were added to the wishlist</p></td>
                        </tr>
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default WishList;