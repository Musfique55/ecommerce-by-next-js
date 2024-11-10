"use client";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import "@smastrom/react-rating/style.css";
import Heading from "../CustomHooks/heading";
import useStore from "../CustomHooks/useStore";
import Link from "next/link";
const TrendingProducts = ({
  products,
  filteredProducts,
  setCurrentCategory,
  categories,
}) => {
  const [index, setIndex] = useState(-1);
  const { handleCart } = useStore();
  const [brand,setBrand] = useState(''); 
  const myStyles = {
    itemShapes: [
      <svg
        key="star1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#1A1A7E"
        width="24"
        height="24"
      >
        <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
      </svg>,
      <svg
        key="star2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#1A1A7E"
        width="24"
        height="24"
      >
        <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
      </svg>,
      <svg
        key="star3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#1A1A7E"
        width="24"
        height="24"
      >
        <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
      </svg>,
      <svg
        key="star4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#1A1A7E"
        width="24"
        height="24"
      >
        <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
      </svg>,
      <svg
        key="star5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#1A1A7E"
        width="24"
        height="24"
      >
        <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
      </svg>,
    ],
  };

  const brands = [...new Set(products.map(brand => brand.brand_name)) ];
  console.log(brands);
  const filterByBrands = products.filter(product => product.brand_name === brand);

  return (
    <div className="mt-12">
      <Heading title={"Trending Products"} />

      <Tabs className="mt-5">
        <TabList className="flex flex-wrap justify-center gap-5 mb-5 md:flex-wrap lg:flex-nowrap">
          <Tab onClick={() => setIndex(-1)} className={`text-lg  cursor-pointer outline-none ${
                  index === -1
                    ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]"
                    : "text-black"
                }`}>All</Tab>
          {brands.slice(0,6).map((brand, idx) => {
            return (
              <Tab
                key={idx}
                onClick={() => {
                  setBrand(brand);
                  setIndex(idx);
                }}
                className={`text-lg  cursor-pointer outline-none ${
                  index === idx
                    ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]"
                    : "text-black"
                }`}
              >
                {brand}
              </Tab>
            );
          })}
        </TabList>

        {brands.map((_, idx) => {
          return (
            <TabPanel key={idx}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                { index !== -1 ?
                filterByBrands.length > 0 ? (
                  filteredProducts.map((product, idx) => {
                    return (
                      <Link
                        key={idx}
                        href={`products/${product.title}`}
                        className="max-w-sm bg-white  border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
                      >
                        <Image
                          src={product?.image[0]}
                          height="256"
                          width="256"
                          alt="mobile-phone"
                          quality={75}
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

                        <button
                          onClick={(e) => {e.preventDefault(),handleCart(product,1)}}
                          className="bg-[#1A1A7E] text-white w-full py-2 rounded-lg font-semibold  transition-colors"
                        >
                          Add to Cart
                        </button>
                      </Link>
                    );
                  })
                ) : (
                  <p>No products found</p>
                ) : 
                products.slice(0,20).map((product,idx) => {
                  return (
                    <Link
                      key={idx}
                      href={`products/${product.title}`}
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
                        {product.title}
                      </h3>

                      <p className="text-sm text-gray-800 font-bold mb-4">
                        {product.price} ৳
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
                }
              </div>
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
};

export default TrendingProducts;
