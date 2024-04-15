"use client";
import React, { useEffect, useState } from "react";
import { IoGridOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import CourseCard from "../components/Cards/CourseCard";
import coursesData from "@/coursesData";
import axios from "axios"

const page = () => {
 const courses = coursesData

 const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/courses");
      setData(response.data)
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData()
  }, []);

  const categories = [
    {
      id: 1,
      title: "Data Science",
    },
    {
      id: 2,
      title: "Business",
    },
    {
      id: 3,
      title: "Art & Design",
    },
    {
      id: 4,
      title: "Lifestyle",
    },
    {
      id: 5,
      title: "Marketing",
    },
    {
      id: 6,
      title: "Finance",
    },
  ];

  const skillLevel = [
    {
      id: 1,
      title: "All Levels",
    },
    {
      id: 2,
      title: "Beginner",
    },
    {
      id: 3,
      title: "Intermediate",
    },
    {
      id: 4,
      title: "Expert",
    },
  ];

  const priceFilter = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Free Courses",
    },
    {
      id: 3,
      title: "Premium Courses",
    },
  ];

  return (
    <div className="w-full">
      <title>Educal - Courses</title>
      <div className="w-full courses-title flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-6xl font-bold mt-2">Courses</h1>
          <p className="text-white mt-2">Home . Courses</p>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-8 gap-x-10 justify-between items-center py-5">
          <div className="col-span-6 h-16 px-8 rounded-sm bg-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-7 h-7 bg-blue-600 rounded-[3px] flex justify-center items-center">
                <IoGridOutline color="white" />
              </div>
              <div className="w-7 h-7 rounded-[3px] flex justify-center items-center ml-1">
                <CiBoxList />
              </div>
              <p className="text-sm text-blue-950 ml-2">Showing 1 - 6 of 12</p>
            </div>
            <select className="w-40 h-9 rounded-md text-sm">
              <option>Default</option>
              <option>Price Low - High</option>
              <option>Price High - Low</option>
              <option>New Arrivals</option>
            </select>
          </div>
          <div className="relative col-span-2">
            <span className="absolute top-5 right-4">
              <IoSearch color="black" size={22} />
            </span>
            <input
              className="w-full h-16 pl-5 pr-10 rounded-sm bg-gray-200 text-sm "
              type="text"
              placeholder="Search for courses.."
            />
          </div>
        </div>
        <div className="grid grid-cols-8 gap-x-10 justify-between items-start py-5">
          <div className="col-span-6 grid grid-cols-3 gap-5">
          {data?.courses.map((item, index) => (
            <CourseCard key={index} item={item} categories={data.categories} />
          ))}
          </div>
          <div className="col-span-2 pt-10 pb-5 bg-gray-200">
            <div className="w-full pl-7 border-b-2 border-white pb-10">
              <p className="text-lg font-bold mb-5">Categories</p>
              {categories.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 mb-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-gray-600">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="w-full pl-7 border-b-2 border-white py-10">
              <p className="text-lg font-bold mb-5">Skill Level</p>
              {skillLevel.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 mb-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-gray-600">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="w-full pl-7 border-b-2 border-white py-10">
              <p className="text-lg font-bold mb-5">Price Filter</p>
              {priceFilter.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 mb-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-gray-600">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center">
            <button className="bg-blue-500 text-white w-2/3 h-12 mt-5 rounded-sm">Filter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
