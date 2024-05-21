"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiMail, CiLock } from "react-icons/ci";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { isMobile } from "react-device-detect";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    // const token = localStorage.getItem('tokenKey');
    const token = Cookies.get("tokenKey");

    if (token) {
      router.push("/");
    }
  }, []);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = async () => {
    try {
      const response = await axios.post(
        "https://educal-api.onrender.com/users/login",
        {
          email: email,
          password: password,
        }
      );

      if (response) {
        if (response.data.role === "admin") {
          if (isMobile) {
            toast.warn("Mobil cihaz ile admin girişi yapılamaz", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            Cookies.set("tokenKey", response.data.token);
            Cookies.set("role", response.data.role);
            Cookies.set("userData", JSON.stringify(response.data.user));
            toast.success(response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            router.push("adminPanel");
          }
        } else {
          Cookies.set("tokenKey", response.data.token);
          Cookies.set("role", response.data.role);
          Cookies.set("userData", JSON.stringify(response.data.user));

          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          const role = Cookies.get("role");
          if (role === "admin") {
            router.push("adminPanel");
          } else {
            router.push("dashboard");
          }
        }
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
      });
    }
  };

  return (
    <div className="w-full">
      <title>Educal - Instructor</title>
      <div className="w-full login-title flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white pl-5 lg:pl-0 text-6xl font-bold mt-2">
            Login Account
          </h1>
          <p className="text-white mt-2 pl-5 lg:pl-0 ">Home . Signin</p>
        </div>
      </div>
      <p className="text-center font-bold text-4xl mt-16">Sign In To</p>
      <p className="text-center font-bold text-4xl">Recharge Direct.</p>
      <p className="text-center text-sm text-gray-400 mt-2">
        it you don't have an account you can Register here!
      </p>
      <div className="w-full relative">
        <img
          className="absolute hidden lg:block top-60 left-96 "
          src="man-3.png"
        />
        <img
          className="absolute top-60 right-96 hidden lg:block"
          src="man-2.png"
        />
        <img
          className="absolute lg:-z-10 lg:left-1/3 lg:-top-10 "
          src="sign-up.png"
        />
      </div>
      <div className="w-[90%] lg:w-[30%] mt-12 mb-20 rounded-md shadow-md mx-auto py-16 bg-white relative">
        <img
          className="absolute bottom-40 -right-32 hidden lg:block"
          src="flower.png"
        />
        <img
          className="absolute -right-24 animate-spin  hidden lg:block"
          src="circle.png"
        />
        <img
          className="absolute top-10 -right-10 element  hidden lg:block"
          src="dot.png"
        />
        <img
          className="absolute hidden lg:block top-20 -left-32 animate-bounce "
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
