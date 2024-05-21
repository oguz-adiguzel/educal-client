"use client";
import React, { useEffect, useState } from "react";
import { FaBloggerB, FaImage } from "react-icons/fa";
import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import Dashboard from "../components/Admin/Dashboard";
import BlogMng from "../components/Admin/BlogMng";
import CategoryMng from "../components/Admin/CategoryMng";
import MainMng from "../components/Admin/MainMng";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const page = () => {
  const [component, setComponent] = useState("dashboard");
  const router = useRouter();

  useEffect(() => {
    // const token = localStorage.getItem('tokenKey');
    const user = Cookies.get("role")

    if (user !== 'admin') {
      router.push('/');
    }
  }, []);

  return (
    <div className="w-full h-screen">
      {/* <div className="w-full py-5 bg-[#2A3042] pl-10">
        <img src="logo-2.png" />
      </div> */}
      <div className="w-full h-full grid grid-cols-12">
        <div className="col-span-2 bg-[#2A3042] flex flex-col items-center pt-12">
          <img className="mx-auto " src="admin-logo.png" />
          <div
            onClick={() => setComponent("dashboard")}
            className="flex items-center text-gray-300 space-x-2 hover:bg-[#373b47] py-3 w-full pl-5 cursor-pointer mt-12"
          >
            <MdDashboard size={22} />
            <p>Dashboard</p>
          </div>
          <div
            onClick={() => setComponent("category")}
            className="flex items-center text-gray-300 space-x-2 hover:bg-[#373b47] py-3 w-full pl-5 mt-5 cursor-pointer"
          >
            <MdOutlineCategory size={22} />
            <p>Category Management</p>
          </div>
          <div
            onClick={() => setComponent("blog")}
            className="flex items-center text-gray-300 space-x-2 hover:bg-[#373b47] py-3 w-full pl-5 mt-5 cursor-pointer"
          >
            <FaBloggerB size={22} />
            <p>Blog Management</p>
          </div>
          <div
            onClick={() => setComponent("main")}
            className="flex items-center text-gray-300 space-x-2 hover:bg-[#373b47] py-3 w-full pl-5 mt-5 cursor-pointer"
          >
            <FaImage size={22} />
            <p>Main Section Management</p>
          </div>
        </div>
        <div className="col-span-10 bg-[#222736] p-7 overflow-scroll">
          {component === "dashboard" && <Dashboard />}
          {component === "blog" && <BlogMng />}
          {component === "category" && <CategoryMng />}
          {component === "main" && <MainMng />}
        </div>
      </div>
    </div>
  );
};

export default page;
