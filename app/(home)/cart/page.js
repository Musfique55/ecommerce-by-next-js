'use client'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../../CustomHooks/useStore';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { FaRegTrashAlt } from "react-icons/fa";

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
        const total = cartItems.reduce((acc, curr) => acc + curr?.retails_price * curr.quantity, 0);
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

    console.log(cartItems);

    return (
        <div className='text-black '>
            {/* desktop cart */}
            <div className='overflow-x-scroll hidden md:block'>
            <table className='text-black min-w-[800px] md:w-full mt-10 bg-white'>
                <thead>
                    <tr className=' border font-semibold border-gray-300 '>
                        <th className=' font-bold align-middle text-center  py-4'><p>Product </p></th>
                        <th className='text-center font-bold '>Price</th>
                        <th className='text-center font-bold '>Quantity</th>
                        <th className='text-center font-bold '>Total</th>
                        <th className='text-center font-bold '></th>
                    </tr>
                </thead>
                <tbody>
                    {
                       cartItems.length > 0  ?
                        cartItems.map((item,idx) => {
                            return <tr key={idx} className='text-black  justify-items-center items-center  border-gray-300 border-t-0 border'>
                                
                                <td className=' flex gap-10 align-middle'>
                                    {
                                       item?.image_path ? 
                                       <img 
                                        src={item?.image_path}
                                        height={100}
                                        width={100}
                                        alt='product-image'
                                        />
                                       : <img
                                       src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                                       height="200"
                                       width="200"
                                       alt="mobile-phone"
                                       quality={75}
                                     />
                                    }
                                    
                                    <p className='font-semibold my-auto'>{item?.name}</p>
                                </td>
                               
                                <td className='font-semibold text-center align-middle'>
                                    {item?.retails_price} ৳
                                </td>
                                <td className='text-center align-middle'>
                                <div className="flex mx-auto items-center border border-gray-300 rounded w-fit">
                                    <input
                                    type="number"
                                    value={ item.quantity}
                                    min={1}
                                    className="w-12 h-10 text-center border-none focus:outline-none no-arrows"
                                    />
                                    <div className="flex flex-col justify-between ">
                                    <button
                                        onClick={() =>
                                            handleIncQuantity(item?.id,item.quantity)
                                        }
                                        className="px-2 border-b border-l border-gray-300"
                                    >
                                        ▲
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDncQuantity(item?.id,item.quantity)
                                        }
                                        className="px-2 border-l border-gray-300"
                                    >
                                        ▼
                                    </button>
                                    </div>
                                </div>
                                </td>
                                <td className='font-semibold text-center align-middle'>
                                    {item?.quantity * item?.retails_price} ৳
                                </td>
                                <td className='text-center align-middle px-4'>
                                    <IoClose onClick={() => handleCartItemDelete(item?.id)} className='cursor-pointer'/>
                                </td>
                                
                            </tr>
                        }) 
                        : <tr className='text-black text-center border border-gray-300 border-t-0'>
                            <td colSpan="6" className="text-center py-4">No products were added to the cart</td>
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
            </div>

            {/* mobile cart */}
            <div className='flex flex-col gap-y-5 md:hidden'>
                {
                    cartItems.length > 0  ?
                    cartItems.map((item,idx) => {
                        return <div key={idx} className='flex gap-3 space-y-3 items-center bg-white p-5'>
                            {
                             item?.image_path ?   
                            <img height={100} width={100} src={item.image_path} alt='products'/> :
                            <img
                            src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                            height="200"
                            width="200"
                            alt="mobile-phone"
                            quality={75}
                          />
                            }
                            <div className=' flex-1'>
                                <h3 className='font-semibold'>{item?.name}</h3>
                                <div className="flex items-center justify-between">
                                    <p className='font-semibold'>{item?.retails_price} ৳</p>
                                    <div className="flex mx-auto items-center border border-gray-300 rounded w-fit gap-5">
                                    <input
                                    type="number"
                                    value={ item?.quantity}
                                    min={1}
                                    className="w-12 h-10  text-center border-none focus:outline-none no-arrows"
                                    />
                                    <div className="flex flex-col justify-between ">
                                    <button
                                        onClick={() =>
                                            handleIncQuantity(item?.id,item?.quantity)
                                        }
                                        className="px-2 border-b border-l border-gray-300"
                                    >
                                        ▲
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDncQuantity(item?.id,item?.quantity)
                                        }
                                        className="px-2 border-l border-gray-300"
                                    >
                                        ▼
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <FaRegTrashAlt onClick={() => handleCartItemDelete(item?.id)} className='text-xl'/>
                        </div>

                    }) : <p className='text-black text-center border border-gray-300 border-t-0'>No products were added to the cart</p>
                }
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-10'>
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
                            <p>{shippingCost ?  cartTotal + shippingCost : cartTotal.toFixed(2)} ৳</p>
                        </div>
                        <p className='text-[#575E63] text-sm mt-4'>* The final price with your coupon code will apply in Checkout page</p>
                        <p className='text-[#575E63] text-sm mt-4'>
                        * All charges are billed in BDT. While the content of your cart is currently displayed in BDT, the checkout will use BDT at the most current exchange rate.</p>

                        <div className='flex gap-1 mt-5'>
                            <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
                            <label >I agree with the terms and conditions.</label>
                        </div>
                        <img 
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