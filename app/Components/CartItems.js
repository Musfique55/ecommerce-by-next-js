import React from 'react';
import useStore from '../CustomHooks/useStore';
import { IoClose } from "react-icons/io5";
const CartItems = () => {
    const {getCartItems,setOpenCart,openCart} = useStore();
    const items = getCartItems();
    return (
        <div className='absolute bg-white text-black w-96 p-5 top-0 right-0 flex flex-col h-screen overflow-y-scroll z-50'>
            <IoClose onClick={() => setOpenCart(!openCart)} className='text-black text-xl self-end cursor-pointer'/>
            {
                items.length > 0 ? 
                items?.map((item,idx) => {
                    return <div key={idx}>
                        <p>{item?.title}</p>
                    </div>
                })
                : <p>Cart is Empty</p>
            }
        </div>
    );
};

export default CartItems;