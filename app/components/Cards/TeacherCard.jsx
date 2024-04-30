"use client";
import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";

const TeacherCard = ({ item }) => {
  const router = useRouter();
  return (
    <div className="mt-5 lg:mt-0 border flex flex-col items-center bg-gray-200 py-9 group hover:bg-white duration-500 rounded-md">
      <div
        onClick={() => router.push(`teacherDetail/${item.slug}`)}
        className="w-80 overflow-hidden cursor-pointer"
      >
        <div className="w-full h-60">
          <img
            className="w-full h-full group-hover:scale-110 duration-500 object-contain"
            src={item.photoUrl}
          />
        </div>
      </div>
      <p className="mt-6 cursor-pointer">
        <span className="text-lg font-bold">{item.name}</span>,
        <span className="text-gray-500">{item.category}</span>
      </p>
      <div className="flex items-center space-x-3 mt-5">
        <div className="w-9 h-9 border-2 rounded-sm border-gray-100 flex justify-center items-center cursor-pointer">
          <FaFacebookF />
        </div>
        <div className="w-9 h-9 border-2 rounded-sm border-gray-100 flex justify-center items-center cursor-pointer">
          <FaTwitter />
        </div>
        <div className="w-9 h-9 border-2 rounded-sm border-gray-100 flex justify-center items-center cursor-pointer">
          <FaLinkedinIn />
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
