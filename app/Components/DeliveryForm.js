"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const DeliveryForm = ({cartItems}) => {
  const { data, error } = useSWR("https://restcountries.com/v3.1/all", fetcher);
  const [payment, setPayment] = useState("cod");
  const [isCod,setIsCod] = useState(false);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  // const userEmail = JSON.parse(localStorage.getItem('user'))?.email || null;
  const router = useRouter(); 
  const [userEmail, setUserEmail] = useState(null);

  
  const [formData, setFormData] = useState({
    country: "Bangladesh",
    email : userEmail || '',
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    billCountry : '',
    billFirstName : '',
    billLastName : '',
    billAddress : '',
    billApartment : '',
    billCity : '',
    billPostalCode : '',
    billPhone : ''
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const  handlePayment = (e) => {
    setPayment(e.target.value)
  }

  const handleBillingChange = (e) => {
    setBillingSameAsShipping(e.target.value === 'same');
  };

  useEffect(() => {
    // This will only run on the client side after the component has mounted
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserEmail(user?.email || null);
    }
  }, []); 

  const handleOrderComplete = (e) => {
    e.preventDefault();
   if(cartItems.length > 0){
     console.log("handleOrderComplete");
   }else{
     alert('Add Some Products First to the cart')
     router.push('/')
   }
  }


  return (
    <div className="smx-auto bg-white  rounded-lg ">
      {
        userEmail ? <div className="border-b">
        <div className="flex items-center  cursor-pointer">
           <p className="hover:text-blue-500 ">Account</p>
        </div>
        <p>{userEmail}</p>
        </div> : <p>no user</p>
        
      }
       
      <h2 className="text-2xl font-bold mb-4">Delivery</h2>
      <form onSubmit={handleOrderComplete}>
        {/* Country/Region */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Country/Region</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="block w-full bg-white p-2 border border-gray-300 rounded-lg outline-none focus:border-blue-300 focus:border-2"
          >
            <option value="Bangladesh">Bangladesh</option>
            {/* Add other country options as needed */}
          </select>
        </div>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div >
           
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
              className="block w-full bg-white outline-none focus:border-blue-400 focus:border-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div >
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
              className={`block w-full bg-white outline-none focus:border-blue-400 focus:border-2 p-2 border border-gray-300 rounded-lg `}
            />
          </div>
        </div>

        {/* Address and Apartment */}
        <div className="mb-4">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="block w-full bg-white outline-none focus:border-blue-400 focus:border-2 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            placeholder="Apartment, suite, etc."
            className="block w-full bg-white outline-none focus:border-blue-400 focus:border-2 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* City and Postal Code */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div >
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="block w-full bg-white outline-none focus:border-blue-400 focus:border-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div >
        
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal code"
              className="block w-full bg-white outline-none focus:border-blue-400 focus:border-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4 ">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="block w-full bg-white outline-none focus:border-blue-400 focus:border-2 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Shipping Method */}
        <div className="my-6 ">
          <h3 className="text-xl font-bold mb-2">Shipping method</h3>
          <div className="bg-[#F0F7FF] border border-blue-400 p-3 rounded-lg">
            <span>BDT 400 depending on location</span>
            <span className="float-right font-bold">৳400.00</span>
          </div>
        </div>

        {/* Payment Section */}
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <p className="text-sm text-gray-500 mb-6">
          All transactions are secure and encrypted.
        </p>
        <div className="mb-6 border border-gray-300 rounded-lg">
          <div className="space-y-3">
            <label className={`flex px-3 py-2 items-center ${payment === 'cod' ? 'bg-[#F0F7FF] border border-blue-400' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => {handlePayment(e);setIsCod(false)}}
                className="mr-2 bg-white"
              />
              Payment Cash On Delivery
            </label>
            <label className={`flex px-3 py-2 items-center ${payment === 'online' ? 'bg-[#F0F7FF] border border-blue-400' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="online"
                className="mr-2 bg-white"
                onChange={(e) => {handlePayment(e);setIsCod(true)}}
              />
              Pay By Credit Card / Mobile Banking / Net Banking
            </label>
          </div>
          {isCod && <div className="p-3 text-black bg-[#F4F4F4]">
            You wont be redirected to Payment Link immediately due to stock limitation at real time after your order is placed. Our team will call you with stock confirmation at real time and will be given a SSL Wireless Custom Mac BD Secure Payment Link. You can proceed with the payment then.
            </div>}
        </div>

       

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
        <div className="border">
        <div className={`px-4 py-3 ${billingSameAsShipping ? 'bg-[#F0F7FF] border border-blue-400' : ''} `}>
            <label className="flex items-center">
            <input
                type="radio"
                name="billingAddress"
                value="same"
                checked={billingSameAsShipping}
                onChange={handleBillingChange}
                className="mr-2 bg-white"
            />
            Same as shipping address
            </label>
        </div>
        <div className={`px-4 py-3 ${!billingSameAsShipping ? 'bg-[#F0F7FF] border border-blue-400' :''}`}>
            <label className="flex items-center">
            <input
                type="radio"
                name="billingAddress"
                value="different"
                checked={!billingSameAsShipping}
                onChange={handleBillingChange}
                
                className="mr-2 bg-white"
            />
            Use a different billing address
            </label>
        </div>
        {
            !billingSameAsShipping &&  <div className="space-y-4 p-4 bg-[#F4F4F4]  ">
            <div>
              <label className="block text-sm font-medium mb-1">
                Country/Region
              </label>
              <select
              onChange={handleChange}
              value={formData.billCountry}
                className="w-full bg-white border-gray-300 rounded-md p-2 outline-none"
                name="billCountry"
                required
              >
                <option value="Bangladesh">Bangladesh</option>
                <option value="">----</option>
              {
                data.length > 0 ? 
                data.map((country,idx) => {
                    return <option key={idx} value={country.name.common}>{country.name.common}</option>
                })
                :null
              }
                {/* Additional country options */}
              </select>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  className="w-full bg-white outline-none p-2 border border-gray-300 rounded-md "
                  type="text"
                  name="billFirstName"
                  onChange={handleChange}
                  value={formData.billFirstName}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  className="w-full bg-white outline-none p-2 border border-gray-300 rounded-md "
                  type="text"
                  name="billLastName"
                  onChange={handleChange}
                  value={formData.billLastName}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                className="w-full bg-white outline-none p-2 border border-gray-300 rounded-md "
                type="text"
                name="billAddress"
                onChange={handleChange}
                value={formData.billAddress}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Apartment, suite, etc. (optional)
              </label>
              <input
                className="w-full bg-white outline-none p-2 border border-gray-300 rounded-md "
                type="text"
                name="billApartment"
                onChange={handleChange}
                value={formData.billApartment}
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  className="w-full bg-white outline-none p-2 border border-gray-300 rounded-md "
                  type="text"
                  name="billCity"
                  onChange={handleChange}
                  value={formData.billCity}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Postal Code (optional)
                </label>
                <input
                  className="w-full bg-white outline-none p-2 border border-gray-300 rounded-md "
                  type="text"
                  name="billPostalCode"
                  onChange={handleChange}
                  value={formData.billPostalCode}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone (optional)
              </label>
              <input
                className="w-full bg-white outline-none p-2 border border-gray-300 rounded-md "
                type="text"
                name="billPhone"
                onChange={handleChange}
                value={formData.billPhone}
              />
            </div>
          </div>
  
        }
      </div>


        {/* Conditional Billing Address */}
        
       
        <button className="w-full bg-[#592ff4] py-3 rounded-lg text-white mt-6">
          Complete Order
        </button>
      </form>
    </div>
  );
};

export default DeliveryForm;