'use client';
import React, { createContext, useEffect, useState } from 'react';

export const storeContext = createContext(null);
const StoreProvider = ({children}) => {
    const [refetch,setRefetch] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [openCart,setOpenCart] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[])


    const handleCart = (item) => {
        if(!isMounted) return;
        setRefetch(true);
        const cartItems =JSON.parse(localStorage.getItem('cart')) || [];
        const existingProducts = cartItems.find(product => product.title === item.title);
        if(existingProducts){
            existingProducts.quantity += 1;
        }else{
            const itemWithQty = {...item,'quantity' : 1}
            cartItems.push(itemWithQty);
        }
        localStorage.setItem('cart',JSON.stringify(cartItems));
        
    }

    const getCartItems = () => {
        if(!isMounted) return [];
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setRefetch(false);
        return cartItems;
    }
    const values = {handleCart,getCartItems,refetch,openCart,setOpenCart}
    return (
        <storeContext.Provider value={values}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreProvider;