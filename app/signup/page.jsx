"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiUser, CiMail, CiLock, CiImageOn } from "react-icons/ci";
import { toast } from "react-toastify";
import { MdOutlinePhotoCameraFront } from "react-icons/md";

const page = () => {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [photo, setPhoto] = useState();
  const [role, setRole] = useState('student')

  const signup = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", photo);
    formData.append("role", role);

    try {
      const response = await axios.post(
        "http://localhost:3001/users/signup",
        formData
      );

      if (response) {
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
        router.push('/signin')
      }
    } catch (error) {
      console.log("error", error);
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
      <div className="w-full signup-title flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-6xl font-bold mt-2">Create Account</h1>
          <p className="text-white mt-2">Home . Signup</p>
        </div>
      </div>
      <p className="text-center font-bold text-4xl mt-16">Create A Free</p>
      <p className="text-center font-bold text-4xl">Account</p>
      <p className="text-center text-sm text-gray-400 mt-2">
        I'm a subhead that goes with a story
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
        <div className="w-2/3 mx-auto">
          <p className="font-semibold">Full Name</p>
          <div className="relative">
            <div className="absolute top-7 left-2">
              <CiUser size={21} color="gray" />
            </div>
            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full py-6 pl-10 bg-gray-100 rounded-md text-xs mt-2"
              type="text"
              placeholder="Full Name"
            />
          </div>
        </div>
        <div className="w-2/3 mx-auto mt-8">
          <p className="font-semibold">Work Email</p>
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
        <div className="w-2/3 mx-auto mt-8">
          <p className="font-semibold">Role</p>
          <div className="relative">
            <select onChange={(e)=>setRole(e.target.value)} className="w-full py-6 bg-gray-100 rounded-md text-sm mt-2 pl-5">
              <option value='student'>Student</option>
              <option value='teacher'>Teacher</option>
            </select>
          </div>
        </div>
        <div className="w-2/3 mx-auto mt-8">
          <p className="font-semibold">Photo</p>
          <div className="relative">
            <div className="absolute top-8 left-2">
              <CiImageOn size={21} color="gray" />
            </div>
            <input
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full py-6 pl-10 bg-gray-100 rounded-md text-xs mt-2"
              type="file"
              placeholder="Re-Password"
            />
          </div>
        </div>
        <div className="w-2/3 mx-auto mt-3 flex items-center space-x-3">
          <input type="checkbox" />
          <p className="text-sm text-gray-400">
            I agree to the{" "}
            <span className="font-bold text-black">Terms & Conditions</span>
          </p>
        </div>
        <div className="w-2/3 mx-auto mt-7">
          <button
            onClick={() => signup()}
            className="w-full text-white font-bold text-sm bg-blue-600 py-4 rounded-[3px] hover:shadow-lg duration-300"
          >
            Sign up
          </button>
        </div>
        <p className="text-center text-sm mt-5 text-gray-400">
          Already in Markit ?{" "}
          <span
            onClick={() => router.push("/signin")}
            className="text-blue-500 cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default page;
