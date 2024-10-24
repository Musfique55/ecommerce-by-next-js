"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = ({ isRegistered, setIsRegistered, isShowModal,onClose,setReload }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

   const router = useRouter(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://www.outletexpense.xyz/api/user-login", formData, {
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
          setReload(true)
          onClose();
          router.push('/');
          localStorage.setItem("token", res.data.authorisation.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
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
        {!isShowModal ? (
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
