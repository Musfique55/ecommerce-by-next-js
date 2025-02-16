"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { fetcher, userId } from "../(home)/page";
import Image from "next/image";
import Modal from "./Modal";
import PaymentMethodForm from "./PaymentMethodForm";

const DeliveryForm = ({cartItems,cartTotal}) => {
  const { data : paymentMethods, error } = useSWR(`${process.env.NEXT_PUBLIC_API}/payment-type-list/${userId}`, fetcher);
  const date = new Date().toISOString();
  const [showPaymentModal,setShowPaymentModal] = useState(false);
  const [payment, setPayment] = useState("Cash");
  const [isCod,setIsCod] = useState(true);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [user,setUser] = useState(null); 
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
    billPhone : '',
  });
  // const [dueAmount,setDueAmount] = useState(0);
  const [selectedMethodId,setSelectedMethodId] = useState(null);

  

  const handleClose = () => setShowPaymentModal(false);


  const [orderSchema, setOrderSchema] = useState({
    pay_mode: payment,
    paid_amount: 0,
    sub_total: Number(cartTotal) + 200,
    vat: 0,
    tax: 0,
    discount: 0,
    product: cartItems.map((item) => ({
      product_id: item.id,
      qty: item.quantity,
      price: item.retails_price,
      mode: 1,
      size: 1,
      sales_id: 3,
      imei_id: item?.imeis ? item?.imeis[0]?.id : null,
    })),
    delivery_method_id: 1,
    delivery_info_id: 1,
    delivery_customer_name: formData.firstName + formData.lastName,
    delivery_customer_address: formData.address || formData.billAddress,
    delivery_customer_phone: formData.phone || formData.billPhone,
    delivery_fee: 200,
    payment_method: [
      {
        payment_type_category_id: "",
        payment_type_id: "",
        payment_amount: 0,
      },
    ],
    variants: [],
    imeis: cartItems.map((item) => {
      if (item?.imeis && item?.imeis.length > 0) {
        return parseInt(item?.imeis[0].imei);
      } else {
        return null;
      }
    }),
    created_at: date,
    customer_id: user?.id || null,
    customer_name: `${formData.firstName} + ${formData.lastName}`,
    customer_phone: formData.phone,
    sales_id: userId,
    user_id: userId,
    wholeseller_id: 1,
    status: 3,
  });
  


  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({ ...formData, [name]: value });
    setOrderSchema((prev) => ({
      ...prev,
      ['customer_name'] : `${formData.firstName}  ${formData.lastName}`,
      ['delivery_customer_name'] : `${formData.firstName}  ${formData.lastName}`,
      ['delivery_customer_address'] : formData.address || formData.billAddress,
      ['delivery_customer_address'] : formData.address || formData.billAddress,
      ['customer_phone'] :  formData.phone,
      ['delivery_customer_phone'] : formData.billPhone  || formData.phone,
      ['customer_id'] : user?.id,
    }))
  };


  const  handlePayment = (e) => {
    setPayment(e.target.value)
  }

  const handleBillingChange = (e) => {
    setBillingSameAsShipping(e.target.value === 'same');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserEmail(user?.email || null);
    }
  }, []); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleOrderComplete = (e) => {
    e.preventDefault();
   if(cartItems.length > 0){
     axios.post(`${process.env.NEXT_PUBLIC_API}/public/ecommerce-save-sales`,orderSchema)
     .then((res) => {
       if(res.status === 200){
        toast.success('order placed successfully');
        localStorage.removeItem('cart');
        setTimeout(() => {
          router.push('/');
        },2000)
      }
     })
     .catch(err => {
      toast.error('error occured try again');
      console.log(err);
     })
   }else{
     alert('Add Some Products First to the cart')
     router.push('/')
   }
  }

  const handlePaymentMethod = (item) => {
    setShowPaymentModal(true);
    if(item.payment_type_category && item.payment_type_category.length > 0){
      setPayment(item.payment_type_category[0].payment_category_name);
      setSelectedMethodId(item.payment_type_category[0].id)
    }else{
      setPayment(item.value);
      setSelectedMethodId(item.category_id);
    }
    setOrderSchema((prevSchema) => {
      return {
        ...prevSchema,
        payment_method: [
          {
            payment_type_category_id: item.payment_type_category?.[0]?.id || item.category_id,
            payment_type_id: item.payment_type_category?.[0]?.payment_type_id || item.id,
            account_number : item.payment_type_category?.[0]?.account_number || item.account_number,
          },
        ],
      };
    });
  };

  const handleAmount = (e) => {
    const amount = e.target.value;
    const updatedMethod = [...orderSchema.payment_method];
    const existingMethodIndex = updatedMethod.findIndex(item => item.payment_type_category_id === selectedMethodId);
    updatedMethod[existingMethodIndex].payment_amount = parseInt(amount);
  }
  const handleRefId = (e) => {
    const refId = e.target.value;
    const updatedMethod = [...orderSchema.payment_method];
    const existingMethodIndex = updatedMethod.findIndex(item => item.payment_type_category_id === selectedMethodId);
    updatedMethod[existingMethodIndex].ref_id = refId;
  }




  return (
    <div className=" bg-white p-10 rounded-tl-lg rounded-bl-lg ">
      {
        userEmail ? <div className="border-b">
        <div className="flex items-center  cursor-pointer">
           <p className="hover:text-blue-500 ">Account</p>
        </div>
        <p>{userEmail}</p>
        </div> : <p>No user</p>
        
      }
       
      <h2 className="text-2xl font-semibold my-4">Delivery</h2>
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
            <span>BDT 200 depending on location</span>
            <span className="float-right font-bold">200.00</span>
          </div>
        </div>

        {/* Payment Section */}
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <p className="text-sm text-gray-500 mb-6">
          All transactions are secure and encrypted.
        </p>
        <div className="mb-6 border border-gray-300 rounded-lg">
          <div className="space-y-3">
            <label className={`flex px-3 py-2 items-center ${payment === 'Cash' ? 'bg-[#F0F7FF] border border-blue-400' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="Cash"
                checked={payment === "Cash"}
                onChange={(e) => {handlePayment(e);setIsCod(true)}}
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
                onChange={(e) => {handlePayment(e);setIsCod(false)}}
              />
              Pay By Credit Card / Mobile Banking / Net Banking
            </label>
          </div>
          {!isCod && <div className="p-3 text-black bg-[#F4F4F4] flex flex-wrap gap-5">
           { paymentMethods?.data?.data && paymentMethods.data.data.length > 0 ? 
           paymentMethods.data.data.filter(item => item.type_name !== 'Cash').map((item) => {
            return <div onClick={() => handlePaymentMethod(item)} key={item.id} className={`flex flex-col items-center justify-center gap-2 cursor-pointer ${item.payment_type_category[0].payment_category_name === payment ? 'bg-blue-200 p-2 rounded-lg' : ''}`}>
                <Image 
                src={item.icon_image}
                alt={item.payment_type_category[0].payment_category_name}
                height={40}
                width={40}
                className="rounded-md h-auto w-auto"
                />
                <h3 className="text-black">{item.payment_type_category[0].payment_category_name}</h3>
            </div>
           })
           : <p className="text-black">You wont be redirected to Payment Link immediately due to stock limitation at real time after your order is placed. Our team will call you with stock confirmation at real time and will be given a SSL Wireless Custom Mac BD Secure Payment Link. You can proceed with the payment then.</p>
           }
            </div>}
        </div>

       

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
        <div className="border rounded-b-lg">
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
        <div className={`px-4 py-3  ${!billingSameAsShipping ? 'bg-[#F0F7FF] border border-blue-400' :''}`}>
            <label className="flex items-center ">
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
              {/* {
                data.length > 0 ? 
                data.map((country,idx) => {
                    return <option key={idx} value={country.name.common}>{country.name.common}</option>
                })
                :null
              } */}
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
        
       
        <button className="w-full bg-[#FF8800] py-3 rounded-lg text-white mt-6">
          Complete Order
        </button>
      </form>


      {
        showPaymentModal && <Modal 
          title={'Payment Info'}
          content={
          <PaymentMethodForm 
          totalAmount={cartTotal}
          methodName={payment}
          selectedMethodId={selectedMethodId}
          methods={paymentMethods.data.data}
          firstValueFunction={handlePaymentMethod}
          paymentMethodSelection={orderSchema.payment_method}
          setOrderSchema={setOrderSchema}
          // orderSchema={orderSchema}
          onAmountUpdate={handleAmount}
          onRefIdUpdate={handleRefId}
          setSelectedMethodId={setSelectedMethodId}
          onClose={handleClose}
          />
        }
        onClose={handleClose}
        />
      }
    </div>
  );
};

export default DeliveryForm;
