"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiMail, CiLock } from "react-icons/ci";
import { toast } from 'react-toastify';

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('tokenKey');

    if (token) {
      router.push('/');
    }
  }, []);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = async () => {

    try {
      const response = await axios.post("https://educal-api.onrender.com/users/login", {
        email: email,
        password: password,
      });

      if(response){
        localStorage.setItem('tokenKey', response.data.token)
        localStorage.setItem('role', response.data.role)
        localStorage.setItem('userData', JSON.stringify(response.data.user))
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
          router.push('dashboard')
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }
  };

  return (
    <div className="w-full">
      <title>Educal - Instructor</title>
      <div className="w-full login-title flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-6xl font-bold mt-2">Login Account</h1>
          <p className="text-white mt-2">Home . Signin</p>
        </div>
      </div>
      <p className="text-center font-bold text-4xl mt-16">Sign In To</p>
      <p className="text-center font-bold text-4xl">Recharge Direct.</p>
      <p className="text-center text-sm text-gray-400 mt-2">
        it you don't have an account you can Register here!
      </p>
      <div className="w-full relative">
        <img className="absolute top-60 left-96" src="man-3.png" />
        <img className="absolute top-60 right-96" src="man-2.png" />
        <img className="absolute -z-10 left-1/3 -top-10" src="sign-up.png" />
      </div>
      <div className="w-[30%] mt-12 mb-20 rounded-md shadow-md mx-auto py-16 bg-white relative">
        <img className="absolute bottom-40 -right-32" src="flower.png" />
        <img className="absolute -right-24 animate-spin" src="circle.png" />
        <img className="absolute top-10 -right-10 element" src="dot.png" />
        <img
          className="absolute top-20 -left-32 animate-bounce"
          src="zigzag.png"
        />
        <div className="w-2/3 mx-auto mt-8">
          <p className="font-semibold">Email</p>
          <div className="relative">
            <div className="absolute top-7 left-2">
              <CiMail size={21} color="gray" />
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-6 pl-10 bg-gray-100 rounded-md text-xs mt-2"
              type="email"
              placeholder="e-mail address"
            />
          </div>
        </div>
        <div className="w-2/3 mx-auto mt-8">
          <p className="font-semibold">Password</p>
          <div className="relative">
            <div className="absolute top-7 left-2">
              <CiLock size={21} color="gray" />
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-6 pl-10 bg-gray-100 rounded-md text-xs mt-2"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="w-2/3 mx-auto mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input type="checkbox" />
            <p className="text-xs text-gray-400">Keep me signed in </p>
          </div>
          <p className="text-gray-400 text-sm hover:text-blue-500 duration-300 cursor-pointer">
            Forgot your password?
          </p>
        </div>
        <div className="w-2/3 mx-auto mt-7">
          <button
            onClick={() => login()}
            className="w-full text-white font-bold text-sm bg-blue-600 py-4 rounded-[3px] hover:shadow-lg duration-300"
          >
            Sign in
          </button>
        </div>
        <p className="text-center text-sm mt-5 text-gray-400">
          New to Markit?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default page;
