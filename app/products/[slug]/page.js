"use client";
import React, { useState } from "react";
import products from "/products.json";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import useStore from "@/app/CustomHooks/useStore";
import { MdOutlineChevronRight,MdOutlineChevronLeft } from "react-icons/md";
const page = ({ params }) => {
  const title = params.slug.split("%20").join(" ");
  const [imageIndex, setImageIndex] = useState(0);
  const product = products.find((item) => item.title === title);
  console.log(product);
  const { handleCart } = useStore();

  const handleNext = () => {
    if(product?.image.length - 1 > imageIndex){
        setImageIndex(imageIndex + 1);
    }else{
        setImageIndex(0);
    }
  }
  const handlePrev = () => {
    if( imageIndex > 0){
        setImageIndex(imageIndex - 1);
    }else {
        setImageIndex(product?.image.length - 1);
    }
  }

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 mx-auto text-black max-w-7xl">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Image Section */}
    <div className="flex relative flex-1 items-center">
      {/* Right Arrow */}
      <div className="text-white absolute text-4xl transform bg-[#4eb0be] -translate-y-1/2 right-4 sm:right-8 cursor-pointer z-50">
        <MdOutlineChevronRight onClick={handleNext} className="text-3xl sm:text-4xl cursor-pointer z-50"/>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {/* Thumbnail Images */}
        {product?.image.length > 0 &&
          product?.image.map((image, idx) => {
            return (
              <Image
                key={idx}
                onClick={() => setImageIndex(idx)}
                src={image}
                alt="product-details"
                height={80}
                width={80}
                className="rounded cursor-pointer hover:opacity-75 transition-opacity"
              />
            );
          })
        }
      </div>

      {/* Main Product Image */}
      <Image
        src={product?.image[imageIndex]}
        alt="product-details"
        height={280}
        width={280}
        className="rounded mx-auto"
      />

      {/* Left Arrow */}
      <div className="text-white absolute text-4xl bg-[#4eb0be] transform -translate-y-1/2 left-16 md:left-14 lg:left-[8rem] cursor-pointer z-50">
        <MdOutlineChevronLeft onClick={handlePrev} className="text-3xl sm:text-4xl cursor-pointer z-50"/>
      </div>
    </div>

    {/* Details Section */}
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg sm:text-xl font-bold">{product?.title}</h1>

        <div className="gap-3 flex items-center">
          <ReactStars
            count={5}
            edit={false}
            size={20}
            value={product?.ratings}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#1A1A7E"
          />
          <p className="ml-2 mt-1 block text-gray-600">
            ({product.ratings})
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <p className="text-black">Price {product?.price} $</p>
        <p className="text-[#1A1A7E]">In Stock {product?.stocks}</p>
      </div>

      {/* RAM Options */}
      <div>
        <h2 className="font-semibold">RAM</h2>
        <div className="flex space-x-4">
          <button className="border rounded px-4 py-2">18GB</button>
          <button className="border rounded px-4 py-2">36GB</button>
        </div>
      </div>

      {/* Storage Options */}
      <div>
        <h2 className="font-semibold">Storage</h2>
        <button className="border rounded px-4 py-2">512GB</button>
      </div>

      {/* Action Buttons */}
      <div className="mt-6">
        <button className="w-full bg-red-600 text-white rounded px-4 py-2">
          Buy it now
        </button>
        <button
          onClick={() => handleCart(product)}
          className="w-full bg-gray-800 text-white rounded px-4 py-2 mt-2"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default page;
