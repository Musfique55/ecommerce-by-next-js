'use client';
import React, { createContext, useEffect, useState } from 'react';
import products from '/products.json';
export const storeContext = createContext(null);
const StoreProvider = ({children}) => {
    const [refetch,setRefetch] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [openCart,setOpenCart] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    useEffect(() => {
        setIsMounted(true);
    },[])

    const brands  = [...new Set(products.map(product => product.brand_name))];
    console.log(brands);

    const handleCart = (item,quantity) => {
        if(!isMounted) return;
        setRefetch(true);
        const cartItems =JSON.parse(localStorage.getItem('cart')) || [];
        const existingProducts = cartItems.find(product => product.title === item.title);
        if(existingProducts){
            existingProducts.quantity += quantity;
        }else{
            const itemWithQty = {...item,'quantity' : quantity}
            cartItems.push(itemWithQty);
        }
        localStorage.setItem('cart',JSON.stringify(cartItems));
    }

    const getCartItems = () => {
        if(!isMounted) return [];
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        return cartItems;
    }

    const handleCartUpdate = () => {
        setRefetch(true);
        const updatedItems = getCartItems();
        setCartItems(updatedItems);
    }

    
    const handleIncQuantity = (title,qty) => {
        const items = getCartItems();
        const updatedItems = items.map(item => {
            if(item.title === title){
              return {...item,quantity : qty + 1}
            }
            return item
        })       
        localStorage.removeItem('cart');
        localStorage.setItem('cart',JSON.stringify(updatedItems));
        handleCartUpdate();
    }

    const handleDncQuantity = (title,qty) => {
        const items = getCartItems();
        const updatedItems = items.map(item => {
            if(item.title === title){
              return {...item,quantity : qty - 1}
            }
            return item;
        })  
        localStorage.removeItem('cart');
        localStorage.setItem('cart',JSON.stringify(updatedItems));
        handleCartUpdate();
    }

    const handleCartItemDelete = (title) => {
        setRefetch(true);
        const items = getCartItems();
        const restItems = items.filter(item => item.title !== title);
        localStorage.removeItem('cart');
        localStorage.setItem('cart',JSON.stringify(restItems));
    }

    const handleWishlist = (product) => {
        setRefetch(true);
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isExist = wishlist.find(item => item.title === product.title);
        if(!isExist){
            wishlist.push(product);
            localStorage.setItem('wishlist',JSON.stringify(wishlist));
        }else{
            alert('already in wishlist')
        }
    }

    const getWishList = () => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem('wishlist')) || [];
          }
          return [];
    }

    const handleWishlistDelete = (title) => {
        setRefetch(true);
        const items = getWishList();
        const remainingItems = items.filter(item => item.title !== title);
        localStorage.removeItem('wishlist');
        localStorage.setItem('wishlist',JSON.stringify(remainingItems));
    }

    const reload = (boolean) => {
        setRefetch(boolean)
    }
    const values = {handleCart,getCartItems,refetch,brands,openCart,setOpenCart,reload,handleIncQuantity,handleDncQuantity,cartItems,setRefetch,handleCartItemDelete,handleWishlist,getWishList,handleWishlistDelete}
    return (
        <storeContext.Provider value={values}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreProvider;