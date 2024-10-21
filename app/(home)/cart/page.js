'use client'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../../CustomHooks/useStore';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const {getCartItems,refetch,setRefetch,handleCartItemDelete,handleDncQuantity,handleIncQuantity} = useStore();
    const [cartItems,setCartItems] = useState([]);
    const [checked,setChecked] = useState(false);
    const [instructions,setInstructions] = useState('');
    const [location,setLocation] = useState('');
    const [zipCode,setZipCode] = useState('');
    const [cartTotal, setCartTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const router = useRouter();
    useEffect(() => {
        setCartItems(getCartItems());
        if(refetch){
            setRefetch(false)
            setCartItems(getCartItems());
        }
    },[refetch,getCartItems,cartTotal])
    
    const handleRedirect = () => {
        if(checked){
            router.push('/checkout')
        }else{
            alert('Please Accept Terms & Conditions First')
        }
    }

    useEffect(() => {
        const total = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        setCartTotal(total);
    }, [cartItems]);

    const handleCalculation = (e) => {
        e.preventDefault();
        const zip = e.target.zipcode.value;
        setZipCode(zip);
        setShippingCost(400);
    } 

    const handleClearCart = () => {
        setRefetch(true);
        localStorage.removeItem('cart');
    }

    return (
        <div className='text-black'>
            <table className='text-black w-full mt-10 bg-white'>
                <thead>
                    <tr className='grid grid-cols-7 border border-gray-300 py-4'>
                        <th className='col-span-3 font-normal '>Product </th>
                        <th className=' font-normal '>Price</th>
                        <th className=' font-normal '>Quantity</th>
                        <th className=' font-normal '>Total</th>
                        <th className=' font-normal '></th>
                    </tr>
                </thead>
                <tbody>
                    {
                       cartItems.length > 0  ?
                        cartItems.map((item,idx) => {
                            return <tr key={idx} className='text-black grid grid-cols-7 justify-items-center items-center  border-gray-300 border-t-0 border'>
                                
                                <td className='col-span-1'>
                                    <Image 
                                    src={item.image[0]}
                                    height={100}
                                    width={100}
                                    alt='product-image'
                                    
                                    />
                                </td>
                                <td className=' font-medium col-span-2'>
                                {item.title}
                                </td>
                                <td>
                                    ${item.price}
                                </td>
                                <td>
                                <div className="flex items-center border border-gray-300 rounded w-fit">
                                    <input
                                    type="number"
                                    value={ item.quantity}
                                    min={1}
                                    className="w-12 h-10 text-center border-none focus:outline-none no-arrows"
                                    />
                                    <div className="flex flex-col justify-between ">
                                    <button
                                        onClick={() =>
                                            handleIncQuantity(item.title,item.quantity)
                                        }
                                        className="px-2 border-b border-l border-gray-300"
                                    >
                                        ▲
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDncQuantity(item.title,item.quantity)
                                        }
                                        className="px-2 border-l border-gray-300"
                                    >
                                        ▼
                                    </button>
                                    </div>
                                </div>
                                </td>
                                <td>
                                    ${item.quantity * item.price}
                                </td>
                                <td>
                                    <IoClose onClick={() => handleCartItemDelete(item.title)} className='cursor-pointer'/>
                                </td>
                                
                            </tr>
                        }) 
                        : <tr className='text-black text-center border border-gray-300 border-t-0'>
                            <td colSpan="6" className="text-center py-4">No products were added to the wishlist</td>
                        </tr>
                    }
                </tbody>
                {   cartItems.length > 0  ?
                    <tfoot className='border border-t-0 border-gray-300 '> 
                    <tr>
                    <td className='py-4 '><button onClick={handleClearCart} className='bg-[#4eb0be] text-sm text-white py-2 px-5 ml-5'>Clear Cart</button></td>
                    </tr>
                </tfoot> : null
                }
            </table>
            <div className='grid grid-cols-2 gap-10 my-10'>
                {/* shiiping fees */}
                    <div className='col-span-1 '>
                        <h3 className='text-[#4D5959]  text-lg font-semibold'>Special instructions for seller</h3>
                        
                        <textarea onChange={(e) => setInstructions(e.target.value)} rows={5} className='w-full bg-[#F2F3F7] border border-gray-300 mt-10 outline-none'></textarea>
                        <h3 className='text-[#4D5959] mt-10 text-lg font-semibold'>Get shipping estimates
                        </h3>
                        <form onSubmit={handleCalculation} className='grid grid-cols-2 gap-3 mt-5'>
                            <div className='grid-cols-1'>
                            <p className='my-3'>Country</p>
                            <select name="country" onChange={(e) => setLocation(e.target.value)} id="country" className='p-2 w-full bg-[#F2F3F7] border-gray-300 border outline-none'>
                                <option value="bd">Bangladesh</option>
                                <option value="usa">USA</option>
                                <option value="uk">UK</option>
                            </select>
                            </div>
                            <div className='grid-cols-1'>
                            <p className='my-3'>Zip/Postal Code</p>
                            <input type="text" name='zipcode'  className='w-full p-2 bg-[#F2F3F7] border-gray-300 border outline-none'/>
                            </div>

                            <button  className='bg-[#4eb0be] py-2 text-white mt-5  px-5' type="submit">Calculate Shipping</button>

                        </form>
                            <p className='text-sm mt-8'>There is one shipping rate available for {zipCode || ''} Bangladesh.</p>
                            <li className='text-sm mt-8'>BDT 400 depending on location at BDT 400.00</li>
                    </div>

                    {/* cart totals */}
                    <div className='col-span-1 '>
                        <h3 className='text-[#4D5959]  text-lg font-semibold'>Cart Totals</h3>
                        <div className='border border-gray-300 font-semibold p-5 text-[#4D5959] flex gap-20 text-base mt-10'>
                            <p>Cart Totals</p>
                            <p>${shippingCost ?  cartTotal + shippingCost : cartTotal.toFixed(2)}</p>
                        </div>
                        <p className='text-[#575E63] text-sm mt-4'>* The final price with your coupon code will apply in Checkout page</p>
                        <p className='text-[#575E63] text-sm mt-4'>
                        * All charges are billed in BDT. While the content of your cart is currently displayed in BDT, the checkout will use BDT at the most current exchange rate.</p>

                        <div className='flex gap-1 mt-5'>
                            <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
                            <label >I agree with the terms and conditions.</label>
                        </div>
                        <Image 
                            src={'https://www.custommacbd.com/cdn/shop/files/SSL_Commerz_Pay_With_logo_All_Size-01_320x.png?v=1614930139'}
                            height={500}
                            width={500}
                            className="mt-3"
                            alt="ssl-commerce"
                        />
                       <div className="w-full flex justify-end">
                       <button onClick={handleRedirect} className='bg-[#4eb0be] py-2 text-white mt-5  px-5'>Processed to Checkout</button>
                       </div>
                    </div>
            </div>
        </div>
    );
};

export default CartPage;