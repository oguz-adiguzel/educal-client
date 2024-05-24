"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "../Cards/CourseCard";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const CoursesSection = () => {
  const [data, setData] = useState();
  const [catFilter, setCatFilter] = useState();

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/courses"
      );
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full py-20 lg:py-32">
      <div className="w-full lg:container mx-auto px-3 lg:px-32">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold">Find The Right</h2>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Online Course For You
            </h2>
            <p className="text-gray-500 mt-2">
              You don't have to struggle alone, you've got our assistance and
              help.
            </p>
          </div>
          <div className="px-0 lg:px-5 mt-8 lg:mt-0">
            <ul className="grid grid-cols-4 gap-4 lg:flex lg:space-x-8 text-sm">
              <li
                onClick={() => setCatFilter(undefined)}
                className={`${
                  catFilter === undefined ? "text-blue-500" : "text-gray-600"
                } font-semibold cursor-pointer`}
              >
                See All
              </li>
              {data?.categories.map((item, index) => (
                <li
                  onClick={() => setCatFilter(item._id)}
                  key={index}
                  className={`${
                    catFilter === item._id ? "text-blue-500" : "text-gray-600"
                  } cursor-pointer hover:text-blue-500 duration-300 font-semibold`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-16 mt-16">
          {data ?  catFilter === undefined && (
            data?.courses.map((item, index) => (
              <CourseCard
                key={index}
                item={item}
                categories={data.categories}
              />
            ))
          ) : (
            <div className="col-span-3 grid grid-cols-3 gap-5 justify-between">
              <Skeleton baseColor="#c0c0c0" height={400} className="flex" />
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
            </div>
          )}
          {data ? (
            data?.courses
              .filter((item) => item.category === catFilter)
              .map((item, index) => (
                <CourseCard
                  key={index}
                  item={item}
                  categories={data.categories}
                />
              ))
          ) : (
            <div className="col-span-3 grid grid-cols-3 gap-5 justify-between">
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
              <Skeleton height={400} baseColor="#c0c0c0" className="flex" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
