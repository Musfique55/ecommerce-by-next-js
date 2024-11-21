
import collections from '/collection.json';
import Heading from '../CustomHooks/heading';
import Image from 'next/image';
import Link from 'next/link';
import SubHeading from '../CustomHooks/subHeading';


const getCategories = async() => {
    const res = await fetch('https://www.outletexpense.xyz/api/public/categories/3');
    const data = await res.json();
    return data.data
}

const FeaturedCategories = async() => {
   
    const categories = await getCategories();
    
    return (
        <div>
           <div className='mt-12 mb-8'>
           <Heading title={'FEATURED CATEGORIES'} />
           <SubHeading subheading={'Get your desired product from featured category'}/>
           </div>
           <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-x-5 gap-y-10'>
            {
                categories.length > 0 &&
                categories?.map((item,idx) => (
                    item.image_path &&
                     (<Link href={`category/${item?.category_id}?category=${item.name}`} key={idx}>
                    <div  className='flex flex-col items-center justify-between space-y-3'>
                        <div className='p-5 rounded-full relative h-20 w-20 bg-white'>
                        <Image 
                        src={item.image_path ? item.image_path : ''}
                        alt={item.name}
                        height={100}
                        width={100}
                        style={{objectFit : 'cover'}}
                        className='rounded-full'
                        />
                        </div>
                        <h3 className='text-base text-center font-semibol text-black'>{item?.name}</h3>
                        <p className='text-gray-500 font-semibold text-sm'>{item.product_count} Items</p>
                    </div>
                    </Link>)
                ))
            }
           </div>
        </div>
    );
};

export default FeaturedCategories;