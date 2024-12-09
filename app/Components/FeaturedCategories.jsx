import Heading from '../CustomHooks/heading';
import Image from 'next/image';
import Link from 'next/link';
import SubHeading from '../CustomHooks/subHeading';


const getCategories = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/3`);
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
           <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-5 gap-y-10'>
            {
                categories.length > 0 &&
                categories.slice(0,22).map((item,idx) => (
                    item.image_path &&
                     (<Link href={`category/${item?.category_id}?category=${item.name}`} key={idx}>
                    <div  className='flex flex-col items-center justify-between rounded-xl flex-grow bg-white text-black h-30 py-5 hover:text-[#1A1A7E]'>
                        <div className='p-2  relative h-30 max-w-20 '>
                        <Image 
                        src={item.image_path ? item.image_path : ''}
                        alt={item.name}
                        height={100}
                        width={100}
                        style={{objectFit : 'contain'}}
                        className='h-12 w-12'
                        />
                        </div>
                        <h3 className='text-base text-center font-semibol'>{item?.name}</h3>
                        <p className='text-gray-500 font-semibold text-sm hover:text-inherit'>{item.product_count} Items</p>
                    </div>
                    </Link>)
                ))
            }
           </div>
        </div>
    );
};

export default FeaturedCategories;