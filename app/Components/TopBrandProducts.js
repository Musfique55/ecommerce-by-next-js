"use client";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Image from "next/image";
import "@smastrom/react-rating/style.css";
import Heading from "../CustomHooks/heading";
import useStore from "../CustomHooks/useStore";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then(res => res.json());

const TopBrandProducts = ({
  products,
}) => {
  const [id, setId] = useState(-1);
  const { handleCart,handleBuy } = useStore();


  const {data} = useSWR('https://www.outletexpense.xyz/api/public/brands/3',fetcher);

  const brands = data?.data;

  const {data : pdcByBrands,isLoading,error } = useSWR(`https://www.outletexpense.xyz/api/public/brandwise-products/${id}`,fetcher);

  // console.log(pdByBrands.data);
  if(isLoading) return 'Loading....'
  if(error) return 'error occured'

  // const brands = [...new Set(products.map(brand => brand.brand_name))];
  // const filterByBrands = products.filter(product => product.brand_name === brand);

  return (
    <div className="mt-12">
      <Heading title={"Top Brand Products"} />

      <Tabs className="mt-5">
        <TabList className="flex flex-wrap justify-center gap-5 mb-5 md:flex-wrap lg:flex-nowrap">
          <Tab onClick={() => setId(-1)} className={`text-sm  cursor-pointer outline-none ${
                  id === -1
                    ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]"
                    : "text-black"
                }`}>All</Tab>
          {brands.slice(0,6).map((brand,idx) => {
            return (
              <Tab
                key={brand.id}
                onClick={() => {
                  setId(brand.id);
                }}
                className={`text-sm cursor-pointer outline-none ${
                  id === brand.id
                    ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]"
                    : "text-black"
                }`}
              >
                {brand?.name}
              </Tab>
            );
          })}
        </TabList>

        {brands.map((_, idx) => {
          return (
            <TabPanel key={idx}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                { id !== -1 ?
                pdcByBrands?.data.length > 0 ? (
                  filterByBrands.map((product, idx) => {
                  return (
                      <Link
                        key={idx}
                        href={`products/${product?.title}`}
                        className="max-w-sm bg-white text-center border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
                      >
                        <Image
                          src={product?.image[0]}
                          height="256"
                          width="256"
                          alt="mobile-phone"
                          quality={75}
                        />
                        <h3 className="text-sm font-medium mb-2 text-black">
                          {product?.title}
                        </h3>
  
                        <p className="text-sm text-gray-800 font-bold mb-4">
                          {product?.price} ৳
                        </p>
  
  
                       <div className='flex gap-2 items-center'>
                        <button className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold  transition-colors">Buy Now</button>
                        <button
                            onClick={(e) => {e.preventDefault(),handleCart(product,1)}}
                            className="bg-[#1A1A7E] border border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold  transition-colors"
                            >
                            Add to Cart
                            </button>
                       </div>
                      </Link>
                    );
                  })
                ) : (
                  <p>No products found</p>
                ) : 
                products.slice(0,18).map((product,idx) => {
                  return (
                    <div key={idx} className="max-w-sm bg-white text-center border-gray-200 flex flex-col justify-between p-4 border rounded-lg">
                      <Link
                        href={`products/${product?.title}`}
                      >
                        <Image
                          src={product?.image[0]}
                          height="256"
                          width="256"
                          alt="mobile-phone"
                          quality={75}
                        />
                        <h3 className="text-sm font-medium mb-2 text-black">
                          {product?.title}
                        </h3>

                        <p className="text-sm text-gray-800 font-bold mb-4">
                          {product?.price} ৳
                        </p>
                      </Link>
                       <div className='flex gap-2 items-center'>
                        <button onClick={() => {handleBuy(product,1)}} className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold  transition-colors">Buy Now</button>
                        <button
                            onClick={(e) => {e.preventDefault(),handleCart(product,1)}}
                            className="bg-[#1A1A7E] border border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold  transition-colors"
                            >
                            Add to Cart
                        </button>
                       </div>
                      </div>
                  );
                })
                }
              </div>
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
};

export default TopBrandProducts;
