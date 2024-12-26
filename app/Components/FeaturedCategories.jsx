import Heading from '../CustomHooks/heading';
import Image from 'next/image';
import Link from 'next/link';
import SubHeading from '../CustomHooks/subHeading';

const FeaturedCategories = ({categories}) => {

    return (
        <div>
           <div className='mt-12 mb-8'>
           <Heading title={'FEATURED CATEGORIES'} />
           <SubHeading subheading={'Get your desired product from featured category'}/>
           </div>
           <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-2 gap-y-5'>
            {
                categories.data && categories.data.length > 0 &&
                categories.data.map((item,idx) => (
                     (<Link href={`category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(item?.name)}&total=${encodeURIComponent(item?.product_count)}`} key={idx}>
                    <div  className='flex flex-col items-center justify-between rounded-xl flex-grow bg-white text-black h-30 py-5 hover:text-[#1A1A7E]'>
                        <div className='p-2  relative h-30 max-w-20 '>
                        {
                            item?.image_url ? 
                            <Image 
                            src={item.image_url}
                            alt={item?.name}
                            height={70}
                            width={70}
                            style={{objectFit : 'contain'}}
                            loading='lazy'
                            className='h-[70] w-[70]'
                            />
                            : 
                            <Image
                            src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                            height={70}
                            width={70}
                            alt="mobile-phone"
                            style={{objectFit : 'contain'}}
                            loading='lazy'
                          />
                        }    
                        
                        </div>
                        <h3 className='text-[9.3px] md:text-[15px] lg:text-base text-center font-semibol'>{item?.name}</h3>
                        <p className='text-gray-500 font-semibold text-sm hover:text-inherit'>{item?.product_count} Items</p>
                    </div>
                    </Link>)
                ))
            }
           </div>
        </div>
    );
};

export default FeaturedCategories;