'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "../Cards/CourseCard";

const CourseMng = () => {
  const [courseData, setCourseData] = useState()
  const [categories, setCategories] = useState()
  const [course, setCourse] = useState()

  console.log('courseData', courseData);
  console.log('course', course);

  const getData = async () => {
    try {
      const res = await axios.get("https://educal-api.onrender.com/courses");
      setCourseData(res.data.courses);
      setCategories(res.data.categories);
    } catch (error) {
      console.log("error", error);
    }
  };

  const unapprovedCourses = () => {
    const c = courseData?.filter((item)=> item.confirmCourse === false)
    setCourse(c)
  }


  useEffect(() => {
   getData()
  }, [])

  useEffect(()=>{
    unapprovedCourses()
  },[courseData])
  
  return (
    <>
     <div className="w-full flex justify-between items-center">
      <h1 className="text-lg font-semibold text-white">COURSE MANAGEMENT</h1>
    </div>
    <div className="w-full py-20 px-20 mt-10 grid grid-cols-4 gap-5">
      {
        course?.map((item, index)=>(
          <CourseCard 
          key={index}
          item={item}
          categories={categories} 
          page={'confirm'}/>
        ))
      }
      {
        course?.length === 0 && <p className="text-white text-center text-lg">Onaylanacak kurs bulunmamaktadır...</p>
      }
    </div>
    </>
   
  );
};

export default CourseMng;
