'use client'
import axios from "axios";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
import BlogCard from "../Cards/BlogCard";
import { CiImageOn } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

const BlogMng = () => {
  const [blogData, setBlogData] = useState();
  const [popup, setPopup] = useState(false);
  const [title, setTitle] = useState();
  // const [blogText, setBlogText] = useState();
  const [tag, setTag] = useState();
  const [photo, setPhoto] = useState();

  const [value, setValue] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get("https://educal-api.onrender.com/blog");
      setBlogData(res.data.blogs);
    } catch (error) {
      console.log("error", error);
    }
  };

  const createBlog = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", value);
    formData.append("tag", tag);
    formData.append("image", photo);

    try {
      const response = await axios.post(
        "https://educal-api.onrender.com/blog",
        formData
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
      getData();
      setPopup(!popup);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full relative">
      {popup && (
        <div className="w-full h-screen absolute top-0 left-0 bg-[#000000a6] flex justify-center items-start">
          <div className="w-2/3 bg-[#34406B] py-10 mt-20 relative">
            <div
              onClick={() => setPopup(!popup)}
              className="absolute right-5 top-5 cursor-pointer"
            >
              <FaTimes color="white" size={24} />
            </div>
            <div className="w-2/3 mx-auto">
              <p className="font-semibold text-gray-300">Title</p>
              <div className="relative">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full py-3 pl-5 bg-[#222736] text-white rounded-md text-xs mt-2"
                  type="text"
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="w-2/3 h-auto mx-auto mt-8">
              <p className="font-semibold text-gray-300">Blog Text</p>
              <div className="w-full bg-white mt-3">
                <ReactQuill theme="snow" value={value} onChange={setValue} />
              </div>
              <div className="relative">
              {/* <textarea
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-40 pl-5 bg-[#222736] text-white rounded-md text-xs mt-2 whitespace-pre"
              ></textarea> */}
            </div>
            </div>
            <div className="w-2/3 mx-auto mt-5">
              <p className="font-semibold text-gray-300">Tag</p>
              <div className="relative">
                <input
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full py-3 pl-5 bg-[#222736] text-white rounded-md text-xs mt-2"
                  type="text"
                  placeholder="Tag"
                />
              </div>
            </div>
            <div className="w-2/3 mx-auto mt-8">
              <p className="font-semibold">Photo</p>
              <div className="relative">
                <div className="absolute top-5 left-2">
                  <CiImageOn size={21} color="white" />
                </div>
                <input
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="w-full py-3 pl-10 bg-[#222736] text-gray-300 rounded-md text-xs mt-2"
                  type="file"
                  placeholder="Re-Password"
                />
              </div>
            </div>
            <div className="w-2/3 mx-auto mt-7">
              <button
                onClick={() => createBlog()}
                className="w-full text-white font-bold text-sm bg-blue-600 py-4 rounded-[3px] hover:shadow-lg duration-300"
              >
                Add Blog
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-lg font-semibold text-white">BLOG MANAGEMENT</h1>
        <button
          onClick={() => setPopup(!popup)}
          className="bg-blue-500 text-white font-semibold text-sm px-3 py-2 rounded-sm"
        >
          Add Blog
        </button>
      </div>
      <div className="w-3/4 mx-auto grid grid-cols-3 gap-5 mt-16">
        {blogData?.map((item) => (
          <BlogCard item={item} page={"admin"} />
        ))}
      </div>
    </div>
  );
};

export default BlogMng;
