'use client'
import React, { useEffect, useState } from 'react';
import useStore from '../CustomHooks/useStore';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

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
            <table className='text-black w-full mt-10 bg-white'>
                <thead>
                    <tr className='grid grid-cols-6 border border-gray-300 py-4'>
                        <th></th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Stock Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        wishList.length > 0 ?
                        wishList.map((item,idx) => {
                            return <tr key={idx} className='text-black grid grid-cols-6 justify-items-center items-center border border-gray-300 '>
                                <td>
                                    <IoClose onClick={() => handleWishlistDelete(item.title)} className='cursor-pointer'/>
                                </td>
                                <td>
                                    <Image 
                                    src={item.image[0]}
                                    height={100}
                                    width={100}
                                    alt='product-image'
                                    
                                    />
                                </td>
                                <td className='text-lg font-semibold'>
                                {item.title}
                                </td>
                                <td>
                                    {item.price}
                                </td>
                                <td>
                                    {item.stocks}
                                </td>
                                <td>
                                <button onClick={() => handleCart(item,1)} className="py-2 px-3 w-full bg-[#4d5959] text-white mt-3">Add to Cart</button>
                                </td>
                            </tr>
                        }) 
                        : <tr className='text-black text-center border border-gray-300 '>
                            <td colSpan="6" className="text-center py-4">No products were added to the wishlist</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default WishList;