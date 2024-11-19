'use client'
import  { useContext } from 'react';
import { storeContext } from '../StoreContext/store';

const useStore = () => {
    const store = useContext(storeContext)
    return store;
};

export default useStore;