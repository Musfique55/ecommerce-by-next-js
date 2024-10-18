"use client";
import React, { useEffect, useRef, useState } from "react";
import products from "/products.json";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import useStore from "@/app/CustomHooks/useStore";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { TbFilters } from "react-icons/tb";
import Link from "next/link";
const Page = ({ params }) => {
  const title = params.slug.split("%20").join(" ");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [range, setRange] = useState([0, 0]);
  const [max, setMax] = useState(100);
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState(0);
  const [rom, setRom] = useState(0);
  const { handleCart } = useStore();
  const [isChecked,setIsChecked] = useState(false); 
  const [selectedColor, setSelectedColor] = useState(null);
  const [sortBy,setSortBy] = useState(''); 

  const colors = [...new Set(items.map((item) => item.color))];

  useEffect(() => {
    const filteredProducts = products.filter((item) => item.category === title);
    setItems(filteredProducts);
    if (filteredProducts.length > 0) {
      const maxPrice = Math.ceil(
        filteredProducts.reduce((max, item) => Math.max(max, item.price), 0)
      );
      setRange([0, maxPrice]);
      setMax(maxPrice);
      setFilteredItems(filteredProducts);
    }
  }, [title]);

  useEffect(() => {
    const rangedProducts = items.filter(
      (item) => item.price >= range[0] && item.price <= range[1]
    );
    setFilteredItems(rangedProducts);
  }, [range, items]);

  useEffect(() => {
    if (cpu) {
      const cpuBasedProducts = items.filter((item) => item.cpu === cpu);
      setFilteredItems(cpuBasedProducts);
    } else {
      setFilteredItems(items);
    }
  }, [cpu]);

  useEffect(() => {
    if (ram) {
      const ramBasedProducts = items.filter((item) => item.ram == ram);
      setFilteredItems(ramBasedProducts);
    } else {
      setFilteredItems(items);
    }
  }, [ram]);

  useEffect(() => {
    if (rom) {
      const romBasedProducts = items.filter((item) => item.rom == rom);
      setFilteredItems(romBasedProducts);
    } else {
      setFilteredItems(items);
    }
  }, [rom]);

  useEffect(() => {
    if (selectedColor && isChecked) {
      const colorBasedProducts = items.filter((item) => item.color === selectedColor);
      setFilteredItems(colorBasedProducts);
    } else {
      setFilteredItems(items);
    }
  }, [selectedColor,isChecked]);

  const colorChecked = (e) => {
    const checked = e.target.checked;
        setIsChecked(checked)
  }

//   sorting

  useEffect(() => {
    if(sortBy === "low-to-high" && sortBy){
        const lowToHigh = [...filteredItems].sort((a,b) => a.price - b.price);
        setFilteredItems(lowToHigh)
    } else if(sortBy === "high-to-low" && sortBy){
        const highToLow = [...filteredItems].sort((a,b) => b.price - a.price);
        setFilteredItems(highToLow)
    }else if(sortBy === "a-z"){
        const letterSort = [...filteredItems.sort((a,b) => a.title.localeCompare(b.title) )];
        setFilteredItems(letterSort)
    }
    else if(sortBy === "z-a"){
        const letterSort = [...filteredItems.sort((a,b) => b.title.localeCompare(a.title) )];
        setFilteredItems(letterSort)
    }
    else if(sortBy === "old-to-new"){
        const oldToNew = [...filteredItems.sort((a,b) => new Date(a.date) - new Date(b.date) )];
        setFilteredItems(oldToNew)
    }
    else if(sortBy === "new-to-old"){
        const oldToNew = [...filteredItems.sort((a,b) => new Date(b.date) - new Date(a.date) )];
        setFilteredItems(oldToNew)
    }
    else{
        setFilteredItems(items)
    }
  },[sortBy])


  return (
    <>
      <h2 className="font-semibold text-[#374151] text-2xl mb-10">{title}</h2>
      <div className="flex justify-between items-center text-black mb-5">
        <div className="flex gap-2 items-center">
            <TbFilters />
            <h3>Filter</h3>
       </div>
        <select onChange={(e) => setSortBy(e.target.value)} className="outline-none p-1">
            <option value="">Default</option>
            <option value="low-to-high">Price low to high</option>
            <option value="high-to-low">Price high to low</option>
            <option value="a-z">Alphabetically A-Z</option>
            <option value="z-a">Alphabetically Z-A</option>
            <option value="old-to-new">Oldest First</option>
            <option value="new-to-old">Newest First</option>
        </select>
       </div>
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-1 text-black space-y-5">
          
          <h4 className="text-xl mb-3">By Price</h4>
          <RangeSlider
            min={0}
            max={max}
            value={range}
            onInput={(value) => setRange(value)}
          />
          <div className="flex justify-between gap-2 mt-5">
            <input
              type="text"
              value={range[0]}
              className="w-1/2 outline-none"
            />
            <input
              type="text"
              value={range[1]}
              className="w-1/2 outline-none"
            />
          </div>

          <div>
            <h4 className="text-xl mb-3">Shop by CPU</h4>
            <select
              name=""
              id=""
              onChange={(e) => setCpu(e.target.value)}
              className="w-full p-1"
            >
              <option value="">Default</option>
              <option value="core i5">Core i5</option>
              <option value="core i7">Core i7</option>
            </select>
          </div>

          <div>
            <h4 className="text-xl mb-3">Shop by Memory</h4>
            <select
              name=""
              id=""
              onChange={(e) => setRam(e.target.value)}
              className="w-full p-1"
            >
              <option value="">Default</option>
              <option value="8">8GB</option>
              <option value="12">12GB</option>
            </select>
          </div>
          <div>
            <h4 className="text-xl mb-3">Shop by Storage</h4>
            <select
              name=""
              id=""
              onChange={(e) => setRom(e.target.value)}
              className="w-full p-1"
            >
              <option value="">Default</option>
              <option value="256">256GB</option>
              <option value="512">512GB</option>
            </select>
          </div>

          <div className="color-filter">
            <h3 className="font-semibold mb-4">BY COLOR</h3>
            <div className="flex gap-2">
              {colors.map((color,idx) => (
                <input type="checkbox"
                 checked={color === selectedColor && isChecked}
                  key={idx}
                  value={color}
                  onClick={(e) => {setSelectedColor(color),colorChecked(e)}}
                  className={`cursor-pointer rounded-full border-2 border-gray-300 appearance-none ${
                    selectedColor === color ? "border-gray-800" : ""
                  }`}
                  style={{
                    backgroundColor: color,
                    width: "30px",
                    height: "30px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* products */}
        <div className="col-span-4 grid grid-cols-4 gap-3">
          {filteredItems.map((product, idx) => {
            return (
              <Link
                key={idx}
                href={`/products/${product.title}`}
                className="max-w-sm bg-white  border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
              >
                <Image
                  src={product?.image[0]}
                  height="256"
                  width="256"
                  alt="mobile-phone"
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
                  onClick={() => handleCart(product)}
                  className="bg-[#1A1A7E] text-white w-full py-2 rounded-lg font-semibold  transition-colors"
                >
                  Order Now
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Page;
