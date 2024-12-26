import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import RangeSlider from "react-range-slider-input";
const FilterProduct = ({products,setFilteredItems}) => {
    const [range, setRange] = useState([0, 0]);
    const [max, setMax] = useState(100);
    const [cpu, setCpu] = useState("");
    const [ram, setRam] = useState(0);
    const [rom, setRom] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    // const [selectedBrand,setSelectedBrand] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);
    const [isStorageExpanded, setIsStorageExpanded] = useState(true);
    const [isTypeExpanded, setIsTypeExpanded] = useState(true);
    const [isSizeExpanded, setIsSizeExpanded] = useState
    (true);
    const [contentHeight, setContentHeight] = useState(undefined);
    const [isRepairExpanded, setIsRepairExpanded] = useState(true);
    const [isWarrantyExpanded, setIsWarrantyExpanded] = useState(true);
    const [isRegionExpanded, setIsRegionExpanded] = useState(true);
    const [isBatteryHealthExpanded, setIsBatteryHealthExpanded] = useState(true);
    const [isNetworkExpanded, setIsNetworkExpanded] = useState(true);
    const contentRef = useRef(null);

     useEffect(() => {
         let maximum = 0;
         if(products?.data){
            let minPrice = products?.data ? products?.data[0]?.retails_price : 0;
              for(let i = 0; i < products?.data.length;i++){
                if(products.data[i].retails_price > minPrice){
                  maximum = products.data[i].retails_price;
                }
                minPrice = products.data[i].retails_price;
              }
            }
            setRange([0, maximum]);
            setMax(maximum)
    },[products?.data])
    
        useEffect(() => {
            const rangedProducts =  products?.data.filter(item => {
             return item.retails_price >= range[0] && item.retails_price <= range[1];
            })
            setFilteredItems(rangedProducts)
        },[range,products?.data])

        useEffect(() => {
            if (contentRef.current) {
              setContentHeight(contentRef.current.scrollHeight)
            }
          }, [])


        // useEffect(() => {
        //   if (cpu) {
        //     const cpuBasedProducts = items.filter((item) => item.cpu === cpu);
        //     setFilteredItems(cpuBasedProducts);
        //   } else {
        //     setFilteredItems(items);
        //   }
        // }, [cpu,items]);
    
        // useEffect(() => {
        //   if (ram) {
        //     const ramBasedProducts = items.filter((item) => item.ram == ram);
        //     setFilteredItems(ramBasedProducts);
        //   } else {
        //     setFilteredItems(items);
        //   }
        // }, [ram,items]);
    
        // useEffect(() => {
        //   if (rom) {
        //     const romBasedProducts = items.filter((item) => item.rom == rom);
        //     setFilteredItems(romBasedProducts);
        //   } else {
        //     setFilteredItems(items);
        //   }
        // }, [rom,items]);
    
        // useEffect(() => {
        //   if (selectedColor && isChecked) {
        //     const colorBasedProducts = items.filter((item) => item.color === selectedColor);
        //     setFilteredItems(colorBasedProducts);
        //   } else {
        //     setFilteredItems(items);
        //   }
        // }, [selectedColor,isChecked,items]);


    return (
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
    );
};

export default FilterProduct;