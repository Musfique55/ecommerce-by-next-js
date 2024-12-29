'use client'
import DeliveryForm from '@/app/Components/DeliveryForm';
import useStore from '@/app/CustomHooks/useStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const CheckoutPage = () => {
    const {getCartItems,setIsLoginModal,token,hasToken} = useStore();


    const router = useRouter();
    
    const cartItems = getCartItems();
    const quantity = cartItems.reduce((acc,curr) => acc + curr.quantity,0);
    const Subtotal = cartItems.reduce((acc,curr) => acc + curr.retails_price * curr.quantity,0);

    useEffect(() => {

        if (!hasToken && !token) {
          const intendedUrl = window.location.pathname;
          router.push(`/?redirect=${intendedUrl}&login=false`);
          setIsLoginModal(true);
        }
      }, [token, router, setIsLoginModal,hasToken]);



    return (
            <div className='text-black flex flex-col-reverse md:flex-col-reverse lg:grid lg:grid-cols-3 relative mt-32'>
            <div className='col-span-1 md:col-span-2 border-gray-300 border-r '>
                <DeliveryForm cartItems={cartItems} cartTotal={Subtotal}/>
            </div>

            {
                cartItems.length > 0 ?  
                <div className='col-span-1 bg-[#FAFAFA] md:py-10 md:px-5 space-y-5 rounded-tr-lg rounded-br-lg'>
                <div className=' w-full gap-2 '>
                {
                    cartItems.length > 0 &&
                        cartItems.map((item) => {
                            return <div key={item.id} className='flex justify-between items-center '>
                                <div className='flex gap-3 items-center '>
                                    <div className='relative  p-2 '>
                                    {
                                       item?.images?.length > 0 ? (
                                        <Image
                                            height={60} 
                                            width={60} 
                                            alt="product" 
                                            src={item.images[0]} 
                                            className="border border-gray-300" 
                                        />
                                    ) : item?.image_path ? (
                                        <Image 
                                            height={60} 
                                            width={60} 
                                            alt="product" 
                                            src={item.image_path} 

                                            className="border border-gray-300" 
                                        />
                                    ) : (
                                        <Image
                                        src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                                        height={60} 
                                        width={60}
                                        loading='lazy'
                                        alt="mobile-phone"
                                        />
                                    )
                                    }
                                   
                                    
                                    <p className='absolute bg-[rgba(0,0,0,0.5)] text-[12px] text-white flex items-center justify-center w-6 h-6 -right-1 -top-2 rounded-full'>{item.quantity}</p>
                                    </div>
                                    <h3 className='w-[225px] text-wrap'>{item.name}</h3>
                                   
                                </div>
                                <p>{item.retails_price} ৳</p>
                            </div>
                        })     
                   
                }
                
                </div>
                <div className='flex gap-4'>
                    <input type="text" className='p-3 text-black bg-white outline-none border w-96 rounded-md' placeholder='Discount Code '/>
                    <button type="submit" className='border p-3 bg-[#F1F1F1] text-gray-400 rounded-md'>Apply</button>
                </div>

                <div className='flex justify-between text-sm font-medium'>
                    <p className='flex gap-2 items-center'>Subtotal<span>{quantity}</span></p>
                    <p>{Subtotal}৳</p>
                </div>
                <div className="flex items-center justify-between text-sm font-medium">
                    <p>Shipping</p>
                    <p>200</p>
                </div>
                <div className='flex justify-between items-center font-medium text-gray-600 text-lg pb-12'>
                    <p>Total</p>
                    <p>{(Subtotal + 200).toFixed(2)}৳</p>
                </div>
            </div>
                : <p className='font-extrabold text-2xl text-center'>Cart is Empty</p>
            }

            
        </div>
    );
};


export default CheckoutPage;