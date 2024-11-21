"use client";
import React, { useEffect, useState } from "react";
import useStore from "../CustomHooks/useStore";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import 'animate.css';
const CartItems = () => {
  const {
    getCartItems,
    setOpenCart,
    openCart,
    refetch,
    handleIncQuantity,
    handleDncQuantity,
    setRefetch,
    handleCartItemDelete,
  } = useStore();
  const [items, setItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setItems(getCartItems());
    if (refetch) {
      setItems(getCartItems());
      setRefetch(false);
    }
  }, [refetch]);

  const handleRedirect = () => {
    isChecked
      ? (router.push("/checkout"), setOpenCart(!openCart))
      : alert("Please Accept Terms & Conditions First");
  };



  return (
    <div >
      {
        items.length > 0 ? <>
        <div
        className={`overlay z-[70] ${openCart ? "active " : ""}`}
        onClick={() => setOpenCart(!openCart)}
      ></div>
      <div className=" fixed bg-white text-black w-full md:w-96 top-0 right-0 flex flex-col h-screen overflow-y-scroll z-[9999]">
        <div className="bg-black text-white flex p-3 items-center">
          <IoClose
            onClick={() => setOpenCart(!openCart)}
            className="text-white  text-xl cursor-pointer"
          />
          <p className="text-center flex-1 font-bold">Mini Cart</p>
        </div>
        <div className="p-5 border-b-2 h-1/3 overflow-y-auto space-y-4">
          {
            items?.map((item, idx) => {
              return (
                <div key={idx} className="flex gap-2 items-center">
                  {
                    item.image_path ? 
                    <Image
                    src={item.image_path}
                    alt="cart-products"
                    height={100}
                    width={100}
                  />
                    :  <p>No Image</p>
                  }
                  
                  <div className="space-y-1 font-semibold">
                    <p>{item?.name}</p>
                    <p>{item?.retails_price} ৳</p>
                    
                    <div className="flex items-center border border-gray-300 rounded w-fit">
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        className="w-12 h-10 text-center border-none focus:outline-none no-arrows"
                      />
                      <div className="flex flex-col justify-between ">
                        <button
                          onClick={() =>
                            handleIncQuantity(item?.id, item.quantity)
                          }
                          className="px-2 border-b border-l border-gray-300"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() =>
                            item.quantity> 0 &&  handleDncQuantity(item?.id, item.quantity)
                          }
                          className="px-2 border-l border-gray-300"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => handleCartItemDelete(item?.id)}
                    className="flex-1 flex justify-end cursor-pointer"
                  >
                    <IoClose className="text-xl" />
                  </div>
                </div>
              );
            })
           }
        </div>
        <div className="p-5">
          <p>Special instructions for seller</p>
          <textarea rows={3} className="border outline-none w-full"></textarea>
          <h5 className="flex justify-between items-center text-black font-bold text-lg">
            Subtotal :{" "}
            <span className="text-[#4EB0BE] font-normal">
              {" "}
              {(items.reduce(
                (prev, curr) => prev + curr?.retails_price * curr.quantity,
                0
              )).toFixed(2)}

              ৳
            </span>
          </h5>
          <Link href={"/cart"}>
            <button
              onClick={() => setOpenCart(!openCart)}
              className="py-2 w-full bg-[#4d5959] text-white mt-3"
            >
              View Cart
            </button>
          </Link>
          <div className="flex gap-2 mt-3">
            <input
              onChange={(e) => setIsChecked(e.target.checked)}
              type="checkbox"
              className="cursor-pointer"
            />
            <label>I agree with the terms and conditions.</label>
          </div>
          <button
            onClick={() => {
              handleRedirect();
            }}
            className="py-2 w-full bg-[#4eb0be] text-white mt-3"
          >
            Check Out
          </button>
          <Image
            src={
              "https://www.custommacbd.com/cdn/shop/files/SSL_Commerz_Pay_With_logo_All_Size-01_320x.png?v=1614930139"
            }
            height={100}
            width={500}
            className="mt-3"
            alt="ssl-commerce"
          />
        </div>
      </div>
      </> 
      : <>
        <div
        className={`overlay z-20 ${openCart ? "active" : ""}`}
        onClick={() => setOpenCart(!openCart)}
      ></div>
      <div className=" fixed bg-white text-black w-96  top-0 right-0 flex flex-col h-screen overflow-y-scroll z-50">
      <div className="bg-black text-white flex p-3 items-center">
          <IoClose
            onClick={() => setOpenCart(!openCart)}
            className="text-white text-xl cursor-pointer"
          />
          <p className="text-center flex-1  font-bold">Mini Cart</p>
        </div>
        <p className="text-xl font-semibold text-center">No item in the cart</p>
      </div>
      </> 
      }
      
    </div>
  );
};

export default CartItems;
