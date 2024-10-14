import React from 'react';
import Heading from '../CustomHooks/heading';
import { Rating } from '@smastrom/react-rating';
import Image from 'next/image';
import { GoChevronRight } from 'react-icons/go';
import Link from 'next/link';

const TrendingWeekProducts = ({products}) => {
    const filteredProducts = products.filter(product => product.category === 'Speaker');
    const myStyles = {
        itemShapes : [
            <svg key="star1"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1A1A7E" width="24" height="24">
                <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
            </svg> , 
            <svg key="star2"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1A1A7E" width="24" height="24">
                <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
            </svg>  ,
            <svg key="star3"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1A1A7E" width="24" height="24">
                <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
            </svg>  ,
            <svg key="star4"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1A1A7E" width="24" height="24">
                <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
            </svg>  ,
            <svg key="star5"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1A1A7E" width="24" height="24">
                <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
            </svg>  
        ]
    }
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
                        <div
                          key={idx}
                          className="max-w-sm bg-white  border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
                        >
                          <Image
                          src={product?.image}
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
                            
                            <Rating 
                            style={{ maxWidth: 100 }}
                             value={product.ratings}
                             readOnly
                             itemStyles={myStyles}
                            />  
                            <p className="ml-2 mt-1 block text-gray-600 ">({product.ratings})</p>
                          </div>
  
                          <button className="bg-[#1A1A7E] text-white w-full py-2 rounded-lg font-semibold  transition-colors">
                            Order Now
                          </button>
                        </div>
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