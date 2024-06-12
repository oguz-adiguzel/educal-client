"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { toast } from "react-toastify";

const CategoryMng = () => {
  const [categories, setCategories] = useState();
  const [inputText, setInputText] = useState();

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/categories/getCategories"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addCategory = async () => {
    try {
      const response = await axios.post(
        "https://educal-api.onrender.com/categories",
        { name: inputText }
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
      getCategories();
    } catch (error) {
      console.log("error", error);
      toast.error("Hata ...!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `https://educal-api.onrender.com/categories/${id}`
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
      getCategories();
    } catch (error) {
      console.log("error", error);
      toast.error("Hata ...!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-lg font-semibold text-white">
          CATEGORY MANAGEMENT
        </h1>
        {/* <button className="bg-blue-500 text-white font-semibold text-sm px-3 py-2 rounded-sm">
          Kategori Ekle
        </button> */}
      </div>
      <div className="w-2/3 mt-20 mx-auto">
        <div className="w-full py-5 px-3 bg-[#2A3042] mt-8">
          <p className="text-white font-semibold">Course Categories</p>
          <div className="grid grid-cols-3 gap-5 py-10">
            {categories?.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-5 py-4 justify-between bg-[#222736] text-gray-400"
              >
                <div className="flex items-center space-x-2">
                  <MdOutlineCategory size={26} />
                  <p className="text-lg font-semibold">{item.name}</p>
                </div>
                <div
                  onClick={() => deleteCategory(item._id)}
                  className="cursor-pointer"
                >
                  <AiOutlineDelete size={22} color="white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-2/3 py-5 px-3 mt-10 mx-auto bg-[#2A3042]">
        <p className="text-white font-semibold">Add Category</p>
        <div className="flex items-center mt-5">
          <input
            onChange={(e) => setInputText(e.target.value)}
            className="w-1/3 h-10 bg-[#222736] rounded-l-md outline-none pl-5 text-white"
            type="text"
          />
          <button
            onClick={() => addCategory()}
            className="bg-blue-500 h-10 w-12 text-white text-sm rounded-r-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryMng;
