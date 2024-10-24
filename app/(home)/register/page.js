"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    outletName: "",
    ownerName: "",
    phone: "",
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
      .then((res) => {
        setFormData({
          outletName: "",
          ownerName: "",
          phone: "",
          email: "",
          password: "",
        })
        console.log(res)
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="py-10 flex flex-col items-center bg-white justify-center rounded-2xl">
      <h2 className="text-black text-2xl font-medium mb-10">Register</h2>
      <div>
        <form
          className="w-full grid grid-cols-3 gap-5 bg-transparent relative"
          onSubmit={handleSubmit}
        >
          {/* First Name */}
          <div className="flex flex-col relative">
            <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="First Name"
              className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white text-black"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col relative">
            <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">
              Outlet Name
            </label>
            <input
              type="text"
              name="outletName"
              value={formData.outletName}
              onChange={handleChange}
              placeholder="Last Name"
              className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white text-black"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Last Name"
              className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white text-black"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col relative">
            <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white text-black"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full mb-[10px] bg-[#407bff] text-white rounded-lg "
          >
            Register
          </button>

          
        </form>
        <p className="text-black text-center">
            Already Have an Account?{" "}
            <Link
              href={"/login"}
              className="hover:text-blue-500"
            >
              Login
            </Link>
          </p>
      </div>
    </div>
  );
};

export default RegisterPage;
