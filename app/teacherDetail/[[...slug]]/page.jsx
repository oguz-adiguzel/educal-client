"use client";
import teacherData from "@/teacherData";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import coursesData from "@/coursesData";
import CourseCard from "@/app/components/Cards/CourseCard";

const page = () => {
  const params = useParams();
  const data = teacherData;
  const data2 = coursesData;
  const [teacher, setTeacher] = useState();
  const [course, setCourse] = useState();

  useEffect(() => {
    setTeacher(data.find((item) => item.slug === params.slug[0]));
  }, []);

  const getCourse = () => {
    let y = [];
    teacher?.courseId.forEach((item) => {
      let x = data2.filter((i) => i.id === item);
      y.push(...x);
    });
    setCourse(y);
  };
  useEffect(() => {
    getCourse();
  }, [teacher]);

  return (
    <div className="w-full">
      <title>Educal - Instructor</title>
      <div className="w-full teacher-detail flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-6xl font-bold mt-2">
            {teacher?.name}
          </h1>
          <p className="text-white mt-2">{teacher?.category}</p>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-10 px-20 py-10 relative">
        <img
          className="absolute top-64 -left-20 -z-10"
          src="/page-title-shape-6.png"
        />
        <div className="col-span-3 p-10 relative">
          <img src={teacher?.img} />
          <img
            className="absolute top-16 -left-1 -z-10"
            src="/hero-1-dot.png"
          />
        </div>
        <div className="col-span-7 pt-10 px-5 border-b-2 border-gray-300">
          <div className="w-full flex pb-5 border-b-2 border-gray-300 justify-between items-end">
            <div>
              <p className="text-4xl font-bold">{teacher?.name}</p>
              <p className="text-gray-500 text-sm mt-1">{teacher?.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Review:</p>
              <p className="font-bold">4.5</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Follow Us:</p>
              <div className="flex space-x-1 mt-1">
                <FaFacebookF color="gray" />
                <FaTwitter color="gray" />
                <FaLinkedinIn color="gray" />
              </div>
            </div>
            <button className="border border-gray-300 px-8 py-2">
              Follow +
            </button>
          </div>
          <p className="mt-5 font-bold">Short Bio</p>
          <p className="text-gray-500 mt-5">
            Only a quid me old mucker squiffy tomfoolery grub cheers ruddy cor
            blimey guvnor in my flat, up the duff Eaton car boot up the kyver
            pardon you A bit of how's your father David skive off sloshed, don't
            get shirty with me chip shop vagabond crikey bugger Queen's English
            chap. Matie boy nancy boy bite your arm off up the kyver old no
            biggie fantastic boot, David have it show off show off pick your
            nose and blow off lost the plot porkies bits and bobs only a quid
            bugger all mate, absolutely bladdered bamboozled it's your round
            don't get shirty with me down the pub well.
          </p>
        </div>
      </div>
      <div className="w-full relative">
        <img className="absolute left-0 top10 -z-10" src="/page-title-shape-1.png" />
      </div>
      <div className="container mx-auto grid grid-cols-10 px-20 py-10">
        <div className="col-span-3"></div>
        <div className="col-span-7 px-5">
          <p className="text-2xl font-bold">Teacher Course</p>
          <div className="w-full grid grid-cols-2 gap-x-20 gap-y-10 mt-5">
            {course?.map((item) => (
              <CourseCard item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
