'use client';

import axios from "axios";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

      const router = useRouter(); 
      const searchParams = useSearchParams();
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post(`${process.env.NEXT_APP_API}/user-login`, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.data.status === "success") {
              setFormData({
                email: "",
                password: "",
              })

              const redirectUrl =  searchParams.get('redirect') || '/';
              router.push(redirectUrl)
              localStorage.setItem("token", res.data.authorisation.token);
              localStorage.setItem("user", JSON.stringify(res.data.user));
            }
          })
          .catch((error) => console.log(error));
      };
  return (
    <div className="py-10 flex flex-col items-center bg-white justify-center rounded-2xl">
      <h2 className="text-black text-2xl font-medium mb-10">Login</h2>
      <div className="max-w-96">
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
              className="input text-black p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white"
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
              className="input p-2 text-black input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl  bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#407bff] text-white rounded-lg "
          >
            Login
          </button>
         
            <p className="text-black text-center">
              Do Not Have an Account?{" "}
              <Link
                
                href={"/register"}
                className="hover:text-blue-500"
              >
                Register
              </Link>
            </p>
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
