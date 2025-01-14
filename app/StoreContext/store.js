'use client';
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const storeContext = createContext(null);
const StoreProvider = ({children}) => {
    const [refetch,setRefetch] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [openCart,setOpenCart] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [isLoginModal,setIsLoginModal] = useState(false); 
    const [token,setToken] = useState(null);
    const [hasToken,setHasToken] = useState(false);
    const [loading,setLoading] = useState(true)    
    useEffect(() => {
        setIsMounted(true);
    },[])

 
    const router = useRouter(); 
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if(storedToken){
            setLoading(false);
            setToken(storedToken);
            setHasToken(true);
        }else{
            setToken(null);
            // setLoading(false);
        }
    },[])

    const handleCart = (item,quantity) => {
        if(!isMounted) return;
        setRefetch(true);
        const cartItems =JSON.parse(localStorage.getItem('cart')) || [];
        const existingProducts = cartItems.find(product => product.id === item.id);
        if(item.status !== "Stock out" && item.status){
            if(existingProducts){
                existingProducts.quantity += quantity;
            }else{
                const itemWithQty = {...item,'quantity' : quantity}
                cartItems.push(itemWithQty);
            }
            toast.success('Item added to cart successfully');
        }else{
            toast.error('Out of stock!')
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



    
    const handleIncQuantity = (id,qty) => {
        const items = getCartItems();
        const updatedItems = items.map(item => {
            if(item.id === id){
              return {...item,quantity : qty + 1}
            }
            return item
        })       
        localStorage.removeItem('cart');
        localStorage.setItem('cart',JSON.stringify(updatedItems));
        handleCartUpdate();
    }

    const handleDncQuantity = (id,qty) => {
        const items = getCartItems();
        const updatedItems = items.map(item => {
            if(item.id === id){
              return {...item,quantity : qty - 1}
            }
            return item;
        })  
        localStorage.removeItem('cart');
        localStorage.setItem('cart',JSON.stringify(updatedItems));
        handleCartUpdate();
    }

    const handleCartItemDelete = (id) => {
        setRefetch(true);
        const items = getCartItems();
        const restItems = items.filter(item => item.id !== id);
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

    const handleBuy = (item,quantity) => {
        handleCart(item,quantity);
        router.push('/checkout');
    }

    const reload = (boolean) => {
        setRefetch(boolean)
    }

    
    const values = {handleCart,getCartItems,refetch,openCart,setOpenCart,reload,handleIncQuantity,handleDncQuantity,cartItems,setRefetch,handleCartItemDelete,handleWishlist,getWishList,handleBuy,handleWishlistDelete,isLoginModal,setIsLoginModal,token,setToken,hasToken,setHasToken,loading,setLoading}
    
    return (
        <storeContext.Provider value={values}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreProvider;