import React from 'react';
import collections from '/collection.json';
import Heading from '../CustomHooks/heading';
import Image from 'next/image';
import Link from 'next/link';
const Collection = ({products}) => {
   
    return (
        <div>
           <Heading title={'Collection List'}/>
           <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5'>
            {
                collections.map((item,idx) => {
                    return <Link href={'/'} key={idx}>
                    <div  className='flex flex-col items-center space-y-3'>
                        <div className='p-5 rounded-full bg-white'>
                        <Image 
                        src={item.image}
                        alt='..'
                        height={'200'}
                        width={'200'}
                        className='rounded-full'
                        />
                        </div>
                        <h3 className='text-xl font-semibol text-black'>{item.category}</h3>
                        <p className='text-gray-500 font-semibold text-sm'>{products.filter(items => items.category === item.category).length} Items</p>
                    </div>
                    </Link>
                })
            }
           </div>
        </div>
    );
};

export default Collection;