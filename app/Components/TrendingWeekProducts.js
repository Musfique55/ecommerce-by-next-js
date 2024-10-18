import React from 'react';
import Heading from '../CustomHooks/heading';
import ReactStars from "react-rating-stars-component";
import Image from 'next/image';
import { GoChevronRight } from 'react-icons/go';
import Link from 'next/link';
import useStore from '../CustomHooks/useStore';

const TrendingWeekProducts = ({products}) => {
    const filteredProducts = products.filter(product => product.category === 'Speaker');
    const {handleCart} = useStore();
    
    return (
        <div className='mt-10'>
            <div className="flex flex-wrap  items-center md:flex-nowrap md:justify-between">
                 <Heading title={'Trending This Week'}/>
                 <Link href={'/'}><p className='flex items-center mt-5 gap-0 md:gap-2 text-gray-500 font-medium'>View All Products <span><GoChevronRight /></span></p></Link>
                 
            </div>
           <div className='grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
           {
                filteredProducts.length > 0 ? (
                    filteredProducts.map((product, idx) => {
                      return (
                        <Link
                        key={idx}
                        href={`products/${product.title}`}
                        className="max-w-sm bg-white  border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
                      >
                          <Image
                          src={product?.image[0]}
                          height='256'
                          width='256'
                          alt = "mobile-phone"  
                          />
  
                          <p className="text-[#1A1A7E] text-sm mb-2">
                            In stock {product.stocks} Items
                          </p>
  
                          <h3 className="text-lg font-medium mb-2 text-black">
                            {product.title}
                          </h3>
  
                          <p className="text-xl text-gray-800 font-bold mb-4">
                            ${product.price}
                          </p>
  
                          <div className="flex items-center  mb-4">
                          <ReactStars
                            count={5}
                            edit={false}
                            size={24}
                            value={product.ratings || 0}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#1A1A7E"
                          />
                          <p className="ml-2 mt-1 block text-gray-600 ">
                            ({product.ratings})
                          </p>
                          </div>
  
                          <button onClick={() => handleCart(product,1)} className="bg-[#1A1A7E] text-white w-full py-2 rounded-lg font-semibold  transition-colors">
                            Order Now
                          </button>
                        </Link>
                      );
                    })
                  ) : (
                    <p>No products found</p>
                  )
            }
           </div>
            
        </div>
    );
};

export default TrendingWeekProducts;