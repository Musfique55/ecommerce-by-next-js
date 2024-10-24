import Image from 'next/image';
import React, { useContext } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Heading from '../CustomHooks/heading';
import { storeContext } from '../StoreContext/store';
import useStore from '../CustomHooks/useStore';
import Link from 'next/link';

const BestDeals = ({products}) => {
    const filteredProducts = products.filter((product) => product.category === 'Smart Watch');
    const {handleCart} = useStore();
    return (
        <div className="mt-12">
          <Heading title={'Best Deals'}/>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
                {/* left banner */}
                <div className="col-span-1 flex flex-col-reverse w-full items-center p-5 space-y-5 bg-gradient-to-b  from-[#2A2047] via-[#5C0D81] to-[#751C6B] relative rounded-md  md:flex-col md:justify-start md:items-start">
                    <div className="space-y-7 flex flex-col items-center md:items-start">
                        <h3 className="text-white text-2xl font-semibold text-wrap">Hot Deals</h3>
                        <p className="text-gray-400 text-wrap">Grab the best deals now! Enjoy massive discounts on top products, from tech to fashion. Hurry, these offers {`won't`} last long!</p>
                        <Link  href={'/category/Smart Watch'}>
                        <button className="flex items-center gap-3 text-black bg-white font-semibold px-4 py-3 rounded-md ">Shop Now <span className="text-black"><FaArrowRight /></span></button>
                        </Link>
                        
                    </div>
                    <Image
                    src={filteredProducts[0].image[0]}
                    width="500"
                    height="500"
                    className="static md:absolute md:transform md:left-1/2 md:-translate-x-1/2 md:bottom-4"
                    alt="apple-watch"/>
                    
                </div>
                {/* products */}
                <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:col-span-3 lg:col-span-4">
                {
                    filteredProducts.length > 0 ? 
                    filteredProducts.map((product,idx) => {
                        return ( <Link
                          key={idx}
                          href={`products/${product.title}`}
                          className="max-w-sm bg-white  border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
                        >
                            <Image
                            src={product?.image[0]}
                            height='200'
                            width='200'
                            alt = "mobile-phone"  
                            className="h-48"                      
                            />
                            {/* <img src={product.image} alt="" lazyLoad={true}/> */}
    
                            <p className="text-[#1A1A7E] text-sm mb-2">
                              In stock {product.stocks} Items
                            </p>
    
                            <h3 className="text-lg font-medium mb-2 text-black">
                              {product.title}
                            </h3>
    
                            <p className="text-xl text-gray-800 font-bold mb-4">
                              ${product.price}
                            </p>
    
                            <button onClick={(e) => {e.preventDefault(),handleCart(product,1)}} className="bg-[#1A1A7E] text-white w-full py-2 rounded-lg font-semibold  transition-colors">
                              Add to Cart
                            </button>
                          </Link>)
                    })
                    : <p>No products found</p>
                }
                </div>
            </div>
        </div>
    );
};

export default BestDeals;