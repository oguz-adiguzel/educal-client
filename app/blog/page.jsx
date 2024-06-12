"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import BlogCard from "../components/Cards/BlogCard";

const page = () => {
  const [blogData, setBlogData] = useState();

  const getData = async () => {
    try {
      const res = await axios.get("https://educal-api.onrender.com/blog");
      setBlogData(res.data.blogs);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <title>Educal - Blog</title>
      <div className="w-full blog-title flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-6xl font-bold mt-2">Blog</h1>
          <p className="text-white mt-2">Home . Blog</p>
        </div>
      </div>
      <div className="w-[65%] mx-auto py-10 grid grid-cols-3 items-start">
        <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-8 px-3 py-4">
          {blogData?.map((item) => (
            <BlogCard item={item} />
          ))}
        </div>
        <div className="col-span-1 py-4 px-14">
          <div className="w-full mx-auto py-5 relative">
            <input
              className="w-full h-14 placeholder:text-xs bg-gray-200 rounded-[4px] pl-5 pr-10 outline-blue-600"
              placeholder="Search for blog..."
              type="text"
            />
            <div className="absolute right-4 top-10">
              <FaSearch size={22} />
            </div>
          </div>
          <p className="text-lg font-semibold border-b border-gray-300">
            Recent posts
          </p>
          <div className="w-full flex justify-between mt-7">
            <div className="w-20 h-20 rounded-md">
              <img
                className="w-full h-full object-cover rounded-md"
                src="blog-5.jpg"
              />
            </div>
            <div className="w-52 pt-1">
              <p className="text-sm  text-gray-500">04.05.2024</p>
              <p className="text-md mt-1 font-bold">
                14 Facebook Ad Examples for Ad Creative Inspiration
              </p>
            </div>
          </div>

          <div className="w-full flex justify-between mt-7">
            <div className="w-20 h-20 rounded-md">
              <img
                className="w-full h-full object-cover rounded-md"
                src="blog-5.jpg"
              />
            </div>
            <div className="w-52 pt-1">
              <p className="text-sm  text-gray-500">04.05.2024</p>
              <p className="text-md mt-1 font-bold">
                14 Facebook Ad Examples for Ad Creative Inspiration
              </p>
            </div>
          </div>

          <p className="text-lg font-semibold border-b border-gray-300 mt-12">
            Category
          </p>

          <div className="flex items-center space-x-2 mt-7">
            <GoDotFill size={12} color="gray" />
            <p className="text-sm text-gray-500 hover:text-blue-600 duration-200 cursor-pointer">
              Category
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <GoDotFill size={12} color="gray" />
            <p className="text-sm text-gray-500 hover:text-blue-600 duration-200 cursor-pointer">
              Video & Tips (4)
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <GoDotFill size={12} color="gray" />
            <p className="text-sm text-gray-500 hover:text-blue-600 duration-200 cursor-pointer">
              Education (8)
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <GoDotFill size={12} color="gray" />
            <p className="text-sm text-gray-500 hover:text-blue-600 duration-200 cursor-pointer">
              Business (5)
            </p>
          </div>

          <p className="text-lg font-semibold border-b border-gray-300 mt-12">
            Tags
          </p>

          <div className="flex mt-5 space-x-3">
            <p className="text-sm px-4 py-2 bg-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white duration-300">
              Art & Design
            </p>
            <p className="text-sm px-4 py-2 bg-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white duration-300">
              Course
            </p>
            <p className="text-sm px-4 py-2 bg-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white duration-300">
              Videos
            </p>
          </div>
          <div className="flex mt-2 space-x-3">
            <p className="text-sm px-4 py-2 bg-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white duration-300">
              App
            </p>
            <p className="text-sm px-4 py-2 bg-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white duration-300">
              Education
            </p>
            <p className="text-sm px-4 py-2 bg-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white duration-300">
              Data Science
            </p>
          </div>

          <img className="mt-10 w-full shadow-md" src="blog-banner.jpg" />
        </div>
      </div>
    </div>
  );
};

export default page;
