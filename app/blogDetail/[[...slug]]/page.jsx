"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import DOMPurify from "dompurify";
import parse from 'html-react-parser';

const page = () => {
  const [blogData, setBlogData] = useState();
  const [cleanText, setCleanText] = useState();

  const params = useParams();

  const dateString = blogData?.createdAt;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString();

  const getBlogData = async () => {
    try {
      let response = await axios.get(
        `https://educal-api.onrender.com/blog/${params.slug[0]}`
      );
      setBlogData(response.data.blog);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getBlogData();
  }, []);

  useEffect(() => {
    cleanBlogText();
  }, [blogData]);

  const cleanBlogText = () => {
    const cleanHTML = DOMPurify.sanitize(blogData?.text);
    setCleanText(cleanHTML);
  };

  return (
    <div className="w-full">
      <title>Educal - Blog</title>
      <div className="w-full blog-detail-title flex items-center">
        <div className="container mx-auto flex flex-col items-start">
          <p className="bg-[#30A820] text-white font-semibold text-xs px-2 py-1 rounded-[4px]">
            Art & Design
          </p>
          <h1 className="text-white text-6xl font-bold mt-2">
            {blogData?.title}
          </h1>
          <p className="text-white mt-2">Home . Blog . {blogData?.title}</p>
          <div className="flex items-center space-x-12 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                <img
                  className="w-full h-full rounded-full"
                  src="/educal-pp.png"
                />
              </div>
              <p className="text-sm text-white">Educal - Admin</p>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <CiClock2 size={22} />
              <p className="text-sm">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 mx-auto py-10 px-10">
        <img className="w-2/3 mx-auto" src={blogData?.photoUrl} />
        <p className="mt-10 text-gray-500">
          {
           cleanText ? parse(cleanText) : 'Yükleniyor...'
          }
        </p>
      </div>
    </div>
  );
};

export default page;
