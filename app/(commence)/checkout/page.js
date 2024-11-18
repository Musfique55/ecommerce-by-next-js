'use client'
import DeliveryForm from '@/app/Components/DeliveryForm';
import useStore from '@/app/CustomHooks/useStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const CheckoutPage = () => {
    const {getCartItems} = useStore();
    const [token, setToken] = useState(null);

    const router = useRouter();
    
    const cartItems = getCartItems();
    const quantity = cartItems.reduce((acc,curr) => acc + curr.quantity,0);
    const Subtotal = cartItems.reduce((acc,curr) => acc + curr.price * curr.quantity,0);


    useEffect(() => {
      if (typeof window !== 'undefined') {
        // Check for the token after the component is mounted
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
  
        if (!storedToken) {
          // Get the current URL for redirection
          const intendedUrl = window.location.pathname;
          // Redirect to login page with the intended URL as a query param
          router.push(`/login?redirect=${intendedUrl}`);
        }
      }
    }, [router]);
  
    // If the token is not set, return null to avoid rendering before the redirect happens
    if (!token) {
      return null;
    }
    return (
            <div className='text-black flex flex-col-reverse md:flex-col-reverse lg:grid  lg:grid-cols-3 relative'>
            <div className='col-span-1 md:col-span-2 border-gray-300 border-r p-5 md:pl-12 md:py-12'>
                <DeliveryForm cartItems={cartItems}/>
            </div>

            {
                cartItems.length > 0 ?  <div className='col-span-1 p-5  md:pb-12  bg-[#FAFAFA]   md:pr-12'>
                <div className='static w-full md:static md:w-full lg:fixed lg:w-[400px] gap-2  flex flex-col h-fit md:h-fit lg:min-h-screen '>
                {
                    cartItems.length > 0 &&
                        cartItems.map((item,idx) => {
                            return <div key={idx} className='flex justify-between items-center '>
                                <div className='flex gap-3 items-center '>
                                    <div className='relative  p-2 '>
                                    <Image height={80} width={80} alt='product' src={item.image[0]} className='border border-gray-300'/>
                                    <p className='absolute bg-[rgba(0,0,0,0.5)] text-[12px] text-white flex items-center justify-center w-6 h-6 -right-1 -top-2 rounded-full'>{item.quantity}</p>
                                    </div>
                                    <h3>{item.title}</h3>
                                   
                                </div>
                                <p>{item.price} ৳</p>
                            </div>
                        })     
                   
                }
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
                    <p>400৳</p>
                </div>
                <div className='flex justify-between items-center font-medium text-gray-600 text-lg pb-12'>
                    <p>Total</p>
                    <p>{(Subtotal + 400).toFixed(2)}৳</p>
                </div>
                </div>
            </div>
                : <p className='font-extrabold text-2xl text-center'>Cart is Empty</p>
            }

            
        </div>
    );
};


export default CheckoutPage;