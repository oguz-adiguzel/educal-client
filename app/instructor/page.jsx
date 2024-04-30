'use client'
import React, { useEffect, useState } from "react";
import TeacherCard from "../components/Cards/TeacherCard";
import teacherData from "@/teacherData";
import axios from "axios"

const page = () => {
  const teacher = teacherData;
  const [teacherList, setTeacherList] = useState()
  useEffect(() => {
    getTeacher()
  }, [])

  const getTeacher = async() =>{
    try{
      const response = await axios.get('https://educal-api.onrender.com/users/getTeacherList')
      setTeacherList(response.data.teacher)
    }catch(error){
      console.log('error', error);
    }
  }
  return (
    <div className="w-full">
      <title>Educal - Instructor</title>
      <div className="w-full contact-title flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-6xl font-bold mt-2">Instructor</h1>
          <p className="text-white mt-2">Home . Instructor</p>
        </div>
      </div>
      <div className="container mx-auto py-20">
        <p className="text-center text-4xl font-bold">Our Most</p>
        <p className="text-center text-4xl font-bold">Popular Teachers</p>
        <p className="text-center text-gray-400 text-sm mt-2">
          You don't have to struggle alone, you've got our assistance and help.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 lg:gap-10 lg:px-32 pb-20">
        {teacherList?.map((item) => (
          <TeacherCard item={item}/>
        ))}
      </div>
    </div>
  );
};

export default page;
