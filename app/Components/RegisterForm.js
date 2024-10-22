"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const RegisterForm = ({setIsRegistered,isRegistered,isShowModal}) => {
  const [formData, setFormData] = useState({
    outletName: "",
    ownerName: "",
    phone : "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    axios
      .post("https://www.outletexpense.xyz/api/user-registration", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div className="">
      <form className="w-full space-y-4 bg-transparent relative" onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="First Name"
             className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Outlet Name</label>
          <input
            type="text"
            name="outletName"
            value={formData.outletName}
            onChange={handleChange}
            placeholder="Last Name"
             className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white"
          />
        </div>
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Last Name"
            className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#407bff] text-white rounded-lg "
        >
          Register
        </button>
        {
             !isShowModal ?
                <p className='text-black text-center'>Do Not Have an Account? <Link onClick={() => setIsRegistered(!isRegistered)} href={'/register'} className='hover:text-blue-500'>Register</Link></p>
              : <p className='text-black text-center'>Already Have an Account? <span onClick={() => setIsRegistered(!isRegistered)}  className='hover:text-blue-500 cursor-pointer'>Login</span></p>
              
        }
      </form>
    </div>
  );
};

export default RegisterForm;
