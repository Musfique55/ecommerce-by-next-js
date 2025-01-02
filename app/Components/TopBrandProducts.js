"use client";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Image from "next/image";
import "@smastrom/react-rating/style.css";
import Heading from "../CustomHooks/heading";
import useStore from "../CustomHooks/useStore";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, userId } from "../(home)/page";

const TopBrandProducts = ({brands}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { handleCart } = useStore();
  // const {data : brands} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/brands/${userId}`,fetcher)
  const {data : pdcByBrands,isLoading} =  useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/brandwise-products/${tabIndex === 0 ? 0 : brands?.data[tabIndex - 1]?.id}/${userId}`,fetcher
  );

  return (
    <div className="mt-12">
      <Heading title={"Top Brand Products"} />

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="mt-5">
        <TabList className="flex flex-wrap justify-center gap-5 mb-5 md:flex-wrap lg:flex-nowrap">
          <Tab
            className={`text-sm cursor-pointer outline-none ${
              tabIndex === 0
                ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]"
                : "text-black"
            }`}
          >
            All
          </Tab>
          {brands?.data.slice(0, 6).map((brand, index) => (
            <Tab
              key={brand.id}
              className={`text-sm cursor-pointer outline-none ${
                tabIndex === index + 1
                  ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]"
                  : "text-black"
              }`}
            >
              {brand?.name}
            </Tab>
          ))}
        </TabList>

        {[null, ...brands?.data.slice(0, 6)].map((_, index) => (
          <TabPanel key={index}>
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {pdcByBrands?.data.length > 0 ? (
                  pdcByBrands?.data.slice(0,12).map((product) => (
                    <Link
                      key={product.id}
                      href={`products/${product.id}`}
                      className="max-w-sm bg-white text-center border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
                    >
                      <div className="flex justify-center relative">
                        
                        {product.image_path ? (
                          <Image
                            src={product?.image_path}
                            height={145}
                            width={145}
                            alt={product.name}
                            quality={75}
                          />
                        ) : (
                          <Image
                            src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                            height={145}
                            width={145}
                            alt="mobile-phone"
                            quality={75}
                            loading='lazy'
                          />
                        )}
                        {
                              product.discount ?
                              <p className="text-gray-300 bg-[#1A1A7E] rounded-md  absolute py-1 
                              px-[6px] text-sm top-0 left-0">SAVE {product.discount}%</p> : ''
                          }
                      </div>
                      
                      <h3 className="text-sm font-medium my-2 text-black">
                        {product.name}
                      </h3>
                      <div className="mb-2">
                        {
                           product?.discount ? <div className="text-nowrap flex gap-2 justify-center items-center">
                           <span className="text-xs font-bold text-[#1A1A7E] line-through">{product?.retails_price} ৳</span>
                           <span className="text-sm font-bold text-[#1A1A7E]">{product?.retails_price - ((product?.retails_price * product.discount) / 100).toFixed(0)} ৳</span>
                         </div> :
                         <span className="text-sm font-bold text-[#1A1A7E]">{product?.retails_price} ৳</span>
                        }  
                        </div>  
                      <div className="flex flex-col gap-2 items-center md:flex-row">
                        <button className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold transition-colors">
                          Buy Now
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCart(product, 1);
                          }}
                          className="bg-[#1A1A7E] border border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-black col-span-full text-center">No products found for this brand.</p>
                )}
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TopBrandProducts;


