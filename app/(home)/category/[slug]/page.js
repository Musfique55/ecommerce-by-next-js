"use client";
import React, { useEffect, useRef, useState } from "react";
import useStore from "@/app/CustomHooks/useStore";
import "react-range-slider-input/dist/style.css";
import Link from "next/link";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Loader from "@/app/Components/Loader";
import FilterProduct from "@/app/Components/FIlterProduct";


const fetcher = (url) => fetch(url).then(res => res.json());

const Page = ({ params }) => {
  const searchParams = useSearchParams();
  const searchedCategory = searchParams.get('category');
  const searchedTotal = searchParams.get('total');
  const [currentPage,setCurrentPage] = useState(1);
  const limit = 20;
  const totalPage = Math.ceil(parseInt(searchedTotal) / limit);
  const {slug: id} = params;
  const {data : products,isLoading} = useSWR(`https://outletexpense.xyz/api/public/categorywise-products/${id}?page=${currentPage}&limit=${limit}`,fetcher);
  const [filteredItems, setFilteredItems] = useState([]);
  const { handleCart,handleBuy } = useStore();
  const [isChecked, setIsChecked] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const contentRef = useRef(null);


  const pages = [];

  for(let i = 0; i < totalPage;i++){
    pages.push(i + 1);
  }


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

  // console.log(products.data);
 
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

   

    const colorChecked = (e) => {
      const checked = e.target.checked;
          setIsChecked(checked)
    }

  //   sorting
  // console.log(selectedBrand);

  const handlePageInc = () => {
    if(currentPage < totalPage){
      setCurrentPage(currentPage + 1);
    }
  }

  const handlePageDcrmnt = () => {
    if(currentPage >= 2){
      setCurrentPage(currentPage - 1)
    }
  }

  
 

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
      <div className="grid md:grid-cols-4 lg:grid-cols-5 mt-32 gap-5">
        <FilterProduct products={products} setFilteredItems={setFilteredItems}/>

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
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {
           isLoading ? 
           <Loader />
           : 
          filteredItems && filteredItems.length > 0 ?  
          filteredItems.map((product, idx) => {
            return (
              <li
                key={idx}
                className="max-w-sm bg-white  border-gray-200 flex flex-col justify-between items-center p-4 border rounded-2xl"
              >
                <Link href={`/products/${product?.id}`}>
                {product.image_path ? <Image
                          src={product?.image_path}
                          height={145}
                          width={145}
                          alt={product?.name}
                        /> : <Image
                        src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                        height={145}
                        width={145}
                        loading='lazy'
                        alt="mobile-phone"
                      />}
                </Link>
                <h3 className="text-sm font-medium mb-2 text-center text-black">
                  {product?.name}
                </h3>

                <p className="text-sm text-gray-800 text-center font-bold mb-4">
                  {product?.retails_price} ৳
                </p>

                <div className="flex w-full gap-2 flex-col md:flex-col lg:flex-row items-center">
                  <button onClick={(e) => {e.preventDefault(),handleBuy(product,1)}} className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full lg:px-[2px] py-1 rounded-md font-semibold  transition-colors">
                    Buy Now
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault(), handleCart(product, 1);
                    }}
                    className="bg-[#1A1A7E] text-nowrap border border-transparent text-xs text-white w-full lg:px-[2px] py-1 rounded-md font-semibold  transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            );
          }) : <p>No products found</p>
          }
          </ul>
          
          {
            pages.length > 0 && 
            <div className="flex justify-between items-center mt-10 pagination gap-3 bg-white rounded-md p-2 text-black">
              <div className="flex gap-3 items-center">
                  <button onClick={handlePageDcrmnt} className="text-lg  py-1 px-[8px] outline-none rounded-md hover:text-white hover:bg-[#0977AB]">Prev</button>
                {
                  pages.map((item,idx) => {
                    return <button key={idx} onClick={() => setCurrentPage(item)} className={`text-lg  py-1 px-[8px] outline-none rounded-md hover:text-white hover:bg-[#0977AB] ${idx + 1 === currentPage ? 'text-white bg-[#0977AB]' : 'text-black' } `}>{item}</button>
                  })
                }
                <button onClick={handlePageInc} className="text-lg  py-1 px-[8px] outline-none rounded-md hover:text-white hover:bg-[#0977AB]">Next</button>
              </div>
              <div>
                <p>Showing {currentPage} page of ({totalPage} page)</p>
              </div>
          </div>
          }
          
        </div>
        
      </div>

    </>
  );
};

export default Page;
