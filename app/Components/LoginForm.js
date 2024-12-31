"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const LoginForm = ({ isRegistered,setLoading, setIsRegistered, isLoginModal,onClose,setReload }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

   const router = useRouter(); 
   const searchParams = useSearchParams();
   const intendedUrl = searchParams.get('redirect');
  //  console.log(intendedUrl);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/customer-login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.token) {
          setFormData({
            email: "",
            password: "",
          })
          setReload(true)
          if(intendedUrl){
            router.push(intendedUrl);
          }else{
            router.push('/');
          }
          onClose();
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.customer));
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form
        className="w-full   space-y-4 bg-transparent"
        onSubmit={handleSubmit}
      >
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
            className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white"
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
            className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#407bff] text-white rounded-lg "
        >
          Login
        </button>
        {!isLoginModal ? (
          <p className="text-black text-center">
            Do Not Have an Account?{" "}
            <Link
              onClick={() => setIsRegistered(!isRegistered)}
              href={"/register"}
              className="hover:text-blue-500"
            >
              Register
            </Link>
          </p>
        ) : (
          <p className="text-black text-center">
            Do Not Have an Account?{" "}
            <span
              onClick={() => setIsRegistered(!isRegistered)}
              className="hover:text-blue-500 cursor-pointer"
            >
              Register
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
