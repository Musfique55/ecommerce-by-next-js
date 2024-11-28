"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import products from '/products.json'
import useStore from "@/app/CustomHooks/useStore";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Link from "next/link";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import axios from "axios";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

// export async function getServerSideProps (context) {
//   const {id} = context.params;
//   const res = await fetch(`https://outletexpense.xyz/api/public/categorywise-products/${id}`);
//   const data = await res.json();

//   return {
//     props: {
//        data,
//     },
//   };
// }

const fetcher = (url) => fetch(url).then(res => res.json());

const Page = ({ params }) => {
  // console.log(data);
  const searchParams = useSearchParams();
  const searchedCategory = searchParams.get('category');
  const {slug: id} = params;
  const {data : products} = useSWR(`https://outletexpense.xyz/api/public/categorywise-products/${id}`,fetcher);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [range, setRange] = useState([0, 0]);
  const [max, setMax] = useState(100);
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState(0);
  const [rom, setRom] = useState(0);
  const { handleCart,handleBuy } = useStore();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [selectedBrand,setSelectedBrand] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isStorageExpanded, setIsStorageExpanded] = useState(true);
  const [isTypeExpanded, setIsTypeExpanded] = useState(true);
  const [isSizeExpanded, setIsSizeExpanded] = useState(true);
  const [isRepairExpanded, setIsRepairExpanded] = useState(true);
  const [isWarrantyExpanded, setIsWarrantyExpanded] = useState(true);
  const [isRegionExpanded, setIsRegionExpanded] = useState(true);
  const [isBatteryHealthExpanded, setIsBatteryHealthExpanded] = useState(true);
  const [isNetworkExpanded, setIsNetworkExpanded] = useState(true);
  // const colors = [...new Set(items.map((item) => item.color))];
  // const brands = [...new Set(items.map(item  => item.brand_name))];
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [])

  useEffect(() => {
    if(products?.data){
      setFilteredItems(products.data)
    }
  },[products])
 
    // useEffect(() => {
    //   if(selectedBrand){
    //   const filteredProducts = items.filter((item) => item.brand_name === selectedBrand);
    //   setItems(filteredProducts);
    //   if (filteredProducts.length > 0) {
    //     const maxPrice = Math.ceil(
    //       filteredProducts.reduce((max, item) => Math.max(max, item.price), 0)
    //     );
    //     setRange([0, maxPrice]);
    //     setMax(maxPrice);
    //     setFilteredItems(filteredProducts);
    //   }
    //   }else{
    //     const filteredProducts = products?.data.filter((item) => item.id === slug);
    //     setItems(filteredProducts);
    //     if (filteredProducts?.length > 0) {
    //       const maxPrice = Math.ceil(
    //         filteredProducts.reduce((max, item) => Math.max(max, item.price), 0)
    //       );
    //       setRange([0, maxPrice]);
    //       setMax(maxPrice);
    //       setFilteredItems(filteredProducts);
    //     }
    //     setFilteredItems(filteredProducts)
    //   }
      
    // }, [selectedBrand,title]);

    // useEffect(() => {
    //   const rangedProducts = items.filter(
    //     (item) => item.price >= range[0] && item.price <= range[1]
    //   );
    //   setFilteredItems(rangedProducts);
    // }, [range,items]);

    useEffect(() => {
      if (cpu) {
        const cpuBasedProducts = items.filter((item) => item.cpu === cpu);
        setFilteredItems(cpuBasedProducts);
      } else {
        setFilteredItems(items);
      }
    }, [cpu,items]);

    useEffect(() => {
      if (ram) {
        const ramBasedProducts = items.filter((item) => item.ram == ram);
        setFilteredItems(ramBasedProducts);
      } else {
        setFilteredItems(items);
      }
    }, [ram,items]);

    useEffect(() => {
      if (rom) {
        const romBasedProducts = items.filter((item) => item.rom == rom);
        setFilteredItems(romBasedProducts);
      } else {
        setFilteredItems(items);
      }
    }, [rom,items]);

    useEffect(() => {
      if (selectedColor && isChecked) {
        const colorBasedProducts = items.filter((item) => item.color === selectedColor);
        setFilteredItems(colorBasedProducts);
      } else {
        setFilteredItems(items);
      }
    }, [selectedColor,isChecked,items]);

    const colorChecked = (e) => {
      const checked = e.target.checked;
          setIsChecked(checked)
    }

  //   sorting
  // console.log(selectedBrand);
  console.log(filteredItems);

    useEffect(() => {
      if(sortBy === "low-to-high" && sortBy){
          const lowToHigh = [...filteredItems].sort((a,b) => a.retails_price - b.retails_price);
          setFilteredItems(lowToHigh)
      } else if(sortBy === "high-to-low" && sortBy){
          const highToLow = [...filteredItems].sort((a,b) => b.retails_price - a.retails_price);
          setFilteredItems(highToLow)
      }else if(sortBy === "a-z"){
          const letterSort = [...filteredItems.sort((a,b) => a.name.localeCompare(b.name) )];
          setFilteredItems(letterSort)
      }
      else if(sortBy === "z-a"){
          const letterSort = [...filteredItems.sort((a,b) => b.name.localeCompare(a.name) )];
          setFilteredItems(letterSort)
      }
      // else if(sortBy === "old-to-new"){
      //     const oldToNew = [...filteredItems.sort((a,b) => new Date(a.date) - new Date(b.date) )];
      //     setFilteredItems(oldToNew)
      // }
      // else if(sortBy === "new-to-old"){
      //     const oldToNew = [...filteredItems.sort((a,b) => new Date(b.date) - new Date(a.date) )];
      //     setFilteredItems(oldToNew)
      // }
      else{
          setFilteredItems(products?.data)
      }
    },[sortBy,products?.data])

  return (
    <>
      {/* <div className="flex gap-3 flex-wrap">
        {!selectedBrand ? 
        brands?.map((brand, idx) => {
          return (
            <button
              onClick={() => setSelectedBrand(brand)}
              key={idx}
              className={`${
                brand !== undefined
                  ? "border border-[#1A1A7E] text-black text-sm rounded-full px-2 py-1 hover:bg-[#1A1A7E] hover:text-white"
                  : ""
              } `}
            >
              {brand}
            </button>
          );
        }) : <button onClick={() => setSelectedBrand('')} className="bg-[#1A1A7E] text-white rounded-full text-sm px-2 py-1 flex items-center gap-1">{selectedBrand} <X size={16}/></button>}
      </div> */}
      {/* <div className="flex  items-center text-black my-5">
        <div className="flex gap-2 items-center">
          <TbFilters />
          <h3>Filter</h3>
        </div>
       
      </div> */}
      <div className="grid md:grid-cols-4 lg:grid-cols-5 mt-12 gap-5">
        <div className="col-span-1 text-black space-y-5">
          <div className="bg-white p-3 rounded-xl">
            <h4 className=" mb-3">Price Range</h4>
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
                className="w-1/2 outline-none bg-[#F2F3F7]"
              
              />
              <input
                type="text"
                value={range[1]}
                className="w-1/2 outline-none bg-[#F2F3F7]"
              />
          </div>
          </div>
          {/* availability checkbox */}
          <div className="p-3 bg-white rounded-lg">
            <div className="w-full max-w-xs rounded-lg ">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isExpanded}
              >
                <span className="text-base font-medium text-gray-900">Availability</span>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>
              <div
                ref={contentRef}
                className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: isExpanded ? contentHeight : 0 }}
              >
                <div>
                    <input type="checkbox" name="in-stock" id="in-stock" />
                    <label htmlFor="in-stock" className="ml-2 text-base">In Stock</label>
                    </div>
                    <div>
                    <input type="checkbox" name="online-order" id="online-order" />
                    <label htmlFor="online-order" className="ml-2 text-base">Online Order</label>
                    </div>
                    <div>
                    <input type="checkbox" name="pre-order" id="pre-order" />
                    <label htmlFor="pre-order" className="ml-2 text-base">Pre Order</label>
                    </div>
              </div>
            </div>
          </div>

          {/* storage checkbbox */}
          <div className="p-3 bg-white rounded-lg">
              <button
                onClick={() => setIsStorageExpanded(!isStorageExpanded)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isStorageExpanded}
              >
                <span className="text-base font-medium text-gray-900">Storage</span>
                {isStorageExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>
              <div
                ref={contentRef}
                className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isStorageExpanded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: isStorageExpanded ? contentHeight : 0 }}
              >
                <div>
                    <input type="checkbox" name="in-stock" id="12/128" />
                    <label htmlFor="12/128" className="ml-2 text-base">12/128</label>
                    </div>
                    <div>
                    <input type="checkbox" name="online-order" id="12/256" />
                    <label htmlFor="12/256" className="ml-2 text-base">12/256</label>
                    </div>
                    <div>
                    <input type="checkbox" name="pre-order" id="16/512" />
                    <label htmlFor="16/512" className="ml-2 text-base">16/512</label>
                    </div>
              </div>
          </div>

          {/* type checkbbox */}
          <div className="p-3 bg-white rounded-lg">
              <button
                onClick={() => setIsTypeExpanded(!isTypeExpanded)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isTypeExpanded}
              >
                <span className="text-base font-medium text-gray-900">Type</span>
                {isTypeExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>
              <div
                ref={contentRef}
                className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isTypeExpanded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: isTypeExpanded ? contentHeight : 0 }}
              >
                <div>
                    <input type="checkbox" name="in-stock" id="12/128" />
                    <label htmlFor="12/128" className="ml-2 text-base">12/128</label>
                    </div>
                    <div>
                    <input type="checkbox" name="online-order" id="12/256" />
                    <label htmlFor="12/256" className="ml-2 text-base">12/256</label>
                    </div>
                    <div>
                    <input type="checkbox" name="pre-order" id="16/512" />
                    <label htmlFor="16/512" className="ml-2 text-base">16/512</label>
                    </div>
              </div>
          </div>

          {/* size checkbox */}
          <div className="p-3 bg-white rounded-lg">
              <button
                onClick={() => setIsSizeExpanded(!isSizeExpanded)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isTypeExpanded}
              >
                <span className="text-base font-medium text-gray-900">Size</span>
                {isSizeExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>
              <div
                ref={contentRef}
                className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isSizeExpanded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: isSizeExpanded ? contentHeight : 0 }}
              >
                <div>
                    <input type="checkbox" name="in-stock" id="12/128" />
                    <label htmlFor="12/128" className="ml-2 text-base">12/128</label>
                    </div>
                    <div>
                    <input type="checkbox" name="online-order" id="12/256" />
                    <label htmlFor="12/256" className="ml-2 text-base">12/256</label>
                    </div>
                    <div>
                    <input type="checkbox" name="pre-order" id="16/512" />
                    <label htmlFor="16/512" className="ml-2 text-base">16/512</label>
                    </div>
              </div>
          </div>

          {/* repair checkbox */}
          <div className="p-3 bg-white rounded-lg">
              <button
                onClick={() => setIsRepairExpanded(!isRepairExpanded)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isRepairExpanded}
              >
                <span className="text-base font-medium text-gray-900">Repair</span>
                {isRepairExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>
              <div
                ref={contentRef}
                className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isRepairExpanded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: isRepairExpanded ? contentHeight : 0 }}
              >
                <div>
                    <input type="checkbox" name="in-stock" id="12/128" />
                    <label htmlFor="12/128" className="ml-2 text-base">12/128</label>
                    </div>
                    <div>
                    <input type="checkbox" name="online-order" id="12/256" />
                    <label htmlFor="12/256" className="ml-2 text-base">12/256</label>
                    </div>
                    <div>
                    <input type="checkbox" name="pre-order" id="16/512" />
                    <label htmlFor="16/512" className="ml-2 text-base">16/512</label>
                    </div>
              </div>
          </div>

          {/* Official Checkbox */}
          <div className="p-3 bg-white rounded-lg">
              <button
                onClick={() => setIsWarrantyExpanded(!isWarrantyExpanded)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isWarrantyExpanded}
              >
                <span className="text-base font-medium text-gray-900">Warranty</span>
                {isWarrantyExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>
              <div
                ref={contentRef}
                className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isWarrantyExpanded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: isWarrantyExpanded ? contentHeight : 0 }}
              >
                  <div>
                    <input type="checkbox" name="in-stock" id="official" />
                    <label htmlFor="official" className="ml-2 text-base">Official</label>
                  </div>
                    
              </div>
          </div>

          {/* sim checkbox */}
          <div className="p-3 bg-white rounded-lg">
              <button
                onClick={() => setIsNetworkExpanded(!isNetworkExpanded)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isNetworkExpanded}
              >
                <span className="text-base font-medium text-gray-900">Network</span>
                {isNetworkExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>
              <div
                ref={contentRef}
                className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isNetworkExpanded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: isNetworkExpanded ? contentHeight : 0 }}
              >
                  <div>
                    <input type="checkbox" name="wifi" id="wifi" />
                    <label htmlFor="wifi" className="ml-2 text-base">Wifi</label>
                  </div>
                  <div>
                    <input type="checkbox" name="LTE" id="lte" />
                    <label htmlFor="lte" className="ml-2 text-base">LTE</label>
                  </div>
                    
              </div>
          </div>


          <div className="color-filter bg-white p-3 rounded-lg">
            <h3 className="font-semibold text-sm mb-4">BY COLOR</h3>
            <div className="flex gap-2">
              {/* {colors.map((color, idx) => (
                <input
                  type="checkbox"
                  checked={color === selectedColor && isChecked}
                  key={idx}
                  value={color}
                  onClick={(e) => {
                    setSelectedColor(color), colorChecked(e);
                  }}
                  className={`cursor-pointer rounded-full border-2 border-gray-300 appearance-none ${
                    selectedColor === color ? "border-gray-800" : ""
                  }`}
                  style={{
                    backgroundColor: color,
                    width: "30px",
                    height: "30px",
                  }}
                />
              ))} */}
            </div>
          </div>
        </div>

        {/* products */}
        <div className="md:col-span-3 lg:col-span-4">
          <div className="flex flex-1 justify-between bg-white p-2 rounded-xl items-center mb-5">
            <h1 className="font-semibold text-black text-xl ">{searchedCategory}</h1>
            <div className="flex gap-2 items-center">
              <p className="font-semibold">Sort By : </p>
              <select
              onChange={(e) => setSortBy(e.target.value)}
              className="outline-none p-1 bg-[#F2F3F7]"
            >
              <option value="">Default</option>
              <option value="low-to-high">Price low to high</option>
              <option value="high-to-low">Price high to low</option>
              <option value="a-z">Alphabetically A-Z</option>
              <option value="z-a">Alphabetically Z-A</option>
              {/* <option value="old-to-new">Oldest First</option>
              <option value="new-to-old">Newest First</option> */}
            </select>
            </div> 
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {
          filteredItems && filteredItems.length > 0 ?  
          filteredItems.map((product, idx) => {
            return (
              <li
                key={idx}
                className="max-w-sm bg-white  border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
              >
                <Link href={`/products/${product?.id}`}>
                {product.image_path ? <Image
                          src={product?.image_path}
                          height={256}
                          width={256}
                          alt={product?.name}
                          quality={75}
                        /> : 'No Image'}
                </Link>
                <h3 className="text-sm font-medium mb-2 text-black">
                  {product?.name}
                </h3>

                <p className="text-sm text-gray-800 font-bold mb-4">
                  {product?.retails_price} ৳
                </p>

                <div className="flex gap-2 flex-col md:flex-col lg:flex-row items-center">
                  <button onClick={(e) => {e.preventDefault(),handleBuy(product,1)}} className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold  transition-colors">
                    Buy Now
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault(), handleCart(product, 1);
                    }}
                    className="bg-[#1A1A7E] border border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold  transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            );
          }) : <p>No products found</p>
          }
          </ul>
        </div>
        
      </div>
    </>
  );
};

export default Page;
