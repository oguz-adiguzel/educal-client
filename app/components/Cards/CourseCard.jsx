"use client";
import React, { useEffect, useState } from "react";
import { IoIosLaptop, IoMdTime } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FormattedNumber } from "react-intl";
import { useRouter } from "next/navigation";
import { GiConfirmed } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";

const CourseCard = ({ item, categories, teacher, teacherPhoto, page }) => {
  const router = useRouter();

  const getCategory = () => {
    let a = categories?.find((cat) => cat._id === item?.category);
    return a?.name;
  };

  const confirmCourse = async() => {

    try {
      const response = await axios.post(
        "https://educal-api.onrender.com/courses/confirm",
        {
          slug: item.slug
        }
      );
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
      setTimeout(() => {
        window.location.reload();
      }, 400);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className=" bg-white rounded-md shadow-lg">
      <div className="w-full">
        <div
          onClick={() => router.push(`/courseDetail/${item?.slug}`)}
          className="w-full relative group overflow-hidden cursor-pointer"
        >
          <p className="absolute text-xs px-2 py-1 text-white font-semibold bg-[#b128ff] top-5 left-5 rounded-sm z-50">
            {getCategory()}
          </p>
          {page !== "teacherDashboard" && (
            <div className="w-9 h-9 bg-[#00000086] absolute right-2 rounded-full top-3 flex justify-center items-center cursor-pointer z-50">
              <MdFavorite color="white" size={20} />
            </div>
          )}
          {page === "teacherDashboard" && item.confirmCourse === true && (
            <div className="w-9 h-9 bg-[#e9e9e9cc] absolute right-2 rounded-full top-3 flex justify-center items-center cursor-pointer z-50">
              <GiConfirmed color="green" size={22} />
            </div>
          )}

          {page === "teacherDashboard" && item.confirmCourse === false && (
            <div className="w-9 h-9 bg-[#e9e9e9c4] absolute right-2 rounded-full top-3 flex justify-center items-center cursor-pointer z-50">
              <IoMdTime color="red" size={24} />
            </div>
          )}

          <div className="w-full h-64">
            <img
              className="w-full h-full object-contain rounded-t-md group-hover:scale-[1.1] duration-300"
              src={item?.photoUrl}
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-4 px-4">
          <div className="flex items-center">
            <IoIosLaptop size={22} />
            <p className="text-sm ml-2">{item?.lesson} Lesson</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaStar color="orange" />
            <p className="text-sm">{item?.point} (2)</p>
          </div>
        </div>
        <p className="text-lg font-semibold px-5 cursor-pointer hover:text-blue-600 duration-300 mt-3 h-14">
          {item?.name}
        </p>
        <div className="flex items-center mt-3">
          <div className="w-9 h-9 border-2 border-blue-500 shadow-md rounded-full ml-7">
            <img
              className="w-full h-full rounded-full object-cover"
              src={teacherPhoto ? teacherPhoto : item?.user?.photoUrl}
            />
          </div>

          <p className="text-gray-500 text-sm ml-4">
            {teacher ? teacher : item?.user?.name}
          </p>
        </div>
        <div className="w-full mt-5 py-3 border-t flex items-center justify-between px-3">
          {item?.price === 0 && (
            <p className="text-[#b128ff] font-semibold text-lg">free</p>
          )}
          {item?.price > 0 && (
            <p className="text-blue-500 font-semibold text-lg">
              <FormattedNumber
                value={item.price}
                style={"currency"}
                currency="USD"
              />
            </p>
          )}
          <p className="text-gray-500 text-sm cursor-pointer hover:text-blue-500 duration-300">
            Know Details
          </p>
        </div>
        {page === 'confirm' && <button onClick={()=> confirmCourse()} className="w-full py-2 bg-green-500 text-white mt-2">Confirm</button>}
      </div>
    </div>
  );
};

export default CourseCard;
