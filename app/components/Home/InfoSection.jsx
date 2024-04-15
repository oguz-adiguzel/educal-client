"use client";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";

const InfoSection = () => {
  const [categories, setCategies] = useState();

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/getCategories"
      );
      setCategies(response.data.categories);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const icon = ["data-science.png", "data-science-white.png"]
  
  return (
    <div className="w-full bg-white py-32">
      <div className="w-full lg:container mx-auto px-3 lg:px-32">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold">Explore</h1>
            <h1 className="text-3xl lg:text-4xl font-bold">
              Our Popular Courses
            </h1>
          </div>
          <div className="flex items-center space-x-2 mt-3 lg:mt-0">
            <p className="text-base text-gray-500 cursor-pointer hover:text-blue-500 duration-300">
              View all Courses
            </p>
            <FaArrowRightLong color="gray" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
          {categories?.map((item, index) => (
            <div
              key={index}
              className="py-5 pl-12 border rounded-md flex hover:bg-blue-600 duration-300 group"
            >
              <img
                className="w-12 h-12 group-hover:hidden"
                src={icon[0]}
              />
              <img
                className="w-12 h-12 hidden group-hover:block"
                src={icon[1]}
              />
              <div className="ml-10">
                <p className="text-lg font-bold group-hover:text-white duration-500">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500 group-hover:text-white duration-300">
                  Data is Everything
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row justify-around mt-20">
          <div className="w-full lg:w-2/5 h-60 info-1 flex flex-col items-start justify-center pl-7">
            <p className="bg-pink-500 px-4 rounded-full text-sm text-white font-semibold">
              Free
            </p>
            <p className="font-bold text-xl mt-3">Germany Foundation</p>
            <p className="font-bold text-xl">Document</p>
            <button className="text-xs bg-blue-600 rounded-sm px-5 py-2 text-white mt-5">
              View Courses
            </button>
          </div>
          <div className="w-full lg:w-2/5 h-60 mt-5 lg:mt-0 info-2 flex flex-col items-start justify-center pl-7">
            <p className="bg-orange-400 px-4 rounded-full text-sm text-white font-semibold">
              New
            </p>
            <p className="font-bold text-xl mt-3">Online Courses</p>
            <p className="font-bold text-xl">From Eduka University</p>
            <button className="text-xs bg-blue-600 rounded-sm px-5 py-2 text-white mt-5">
              View Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
